import { createRuntime } from '../runtime.js';
import { presets } from './presets.js';

const EF_FILTER_NAMES = [
  'LINEAR',
  'OPPOSITE_LINEAR',
  'EXPONENTIAL',
  'RANDOM',
  'LOWPASS',
  'HIGHPASS',
  'BANDPASS'
];

const ARG_METHOD_NAMES = [
  'PLUS',
  'MIN',
  'PECK',
  'SHAV',
  'SQAR',
  'BABS',
  'TABS',
  'MULT',
  'DIVI',
  'AVG',
  'XABS',
  'MAXX',
  'MINN',
  'XORR'
];

const localManifest = {
  ui_version: '2024.08.01',
  schema_version: '1.5.0',
  slot_count: 42,
  max_table_lengths: {
    ledColors: 42,
    efSlots: 6
  }
};

const runtime = createRuntime({
  schemaUrl: './config_schema.json',
  localManifest
});

const sharedResizeObserver =
  typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => {
        for (const entry of entries) {
          entry.target.__resizeCallback?.(entry);
        }
      })
    : null;

window.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const statusLabel = document.getElementById('status-label');
  const statusMessage = statusEl?.querySelector('.status-message');
  const connectBtn = document.getElementById('connect');
  const applyBtn = document.getElementById('apply');
  const rollbackBtn = document.getElementById('rollback');
  const slotContainer = document.getElementById('slots');
  const envContainer = document.getElementById('envelopes');
  const diffPanel = document.getElementById('diff-panel');
  const diffOutput = document.getElementById('diff-output');
  const dirtyBadge = document.getElementById('dirty-badge');
  const connectionPill = document.getElementById('connection-pill');
  const headerStatus = document.getElementById('header-status');
  const exportPresetBtn = document.getElementById('export-preset');
  const importPresetBtn = document.getElementById('import-preset');
  const presetPicker = document.getElementById('preset-picker');
  const simulatorToggle = document.getElementById('simulator-toggle');
  const ledGrid = document.getElementById('led-grid');
  const formContainer = document.getElementById('form');
  const filterTypeEl = document.getElementById('filter-type');
  const filterFreqEl = document.getElementById('filter-freq');
  const filterQEl = document.getElementById('filter-q');
  const argEnableEl = document.getElementById('arg-enable');
  const argMethodEl = document.getElementById('arg-method');
  const argAEl = document.getElementById('arg-a');
  const argBEl = document.getElementById('arg-b');
  const efAssignmentGrid = document.querySelector('#ef-assignment-card .ef-grid');
  const slotDetailIndex = document.getElementById('slot-detail-index');
  const slotDetailStatus = document.getElementById('slot-detail-status');
  const slotDetailType = document.getElementById('slot-detail-type');
  const slotDetailChannel = document.getElementById('slot-detail-channel');
  const slotDetailData = document.getElementById('slot-detail-data');
  const slotDetailEfIndex = document.getElementById('slot-detail-ef-index');
  const slotDetailEfFilter = document.getElementById('slot-detail-ef-filter');
  const slotDetailEfTuning = document.getElementById('slot-detail-ef-tuning');
  const slotDetailEfDynamics = document.getElementById('slot-detail-ef-dynamics');
  const slotDetailEfBaseline = document.getElementById('slot-detail-ef-baseline');
  const slotDetailArg = document.getElementById('slot-detail-arg');
  const slotDetailArgSources = document.getElementById('slot-detail-arg-sources');
  const slotDetailValue = document.getElementById('slot-detail-value');
  const deviceMonitor = document.getElementById('device-monitor');
  const logEl = document.getElementById('log');
  const migrationDialog = document.getElementById('migration-dialog');
  const migrationPreview = document.getElementById('migration-preview');
  const migrationApply = document.getElementById('migration-apply');
  const migrationCancel = document.getElementById('migration-cancel');
  const migrationExport = document.getElementById('migration-export');

  const slotState = {
    slots: [],
    efSlots: [],
    staged: null,
    selected: 0,
    telemetry: null
  };

  const slotVirtualizer = new VirtualGrid(slotContainer, {
    columns: 6,
    rowHeight: 72,
    render: renderSlotButton
  });

  const efVirtualizer = new VirtualList(efAssignmentGrid, {
    itemHeight: 48,
    render: renderEfRow
  });

  const envMeters = initializeMeters(envContainer, localManifest.max_table_lengths.efSlots, 'EF');
  slotVirtualizer.setData([]);

  connectBtn?.addEventListener('click', async () => {
    try {
      if (connectionPill) {
        connectionPill.dataset.stage = 'handshake';
        connectionPill.textContent = 'Handshaking…';
      }
      await runtime.connect();
    } catch (err) {
      if (connectionPill) {
        connectionPill.dataset.stage = 'disconnected';
        connectionPill.textContent = 'Disconnected';
      }
      setStatus('err', 'Connect failed', err.message || String(err));
    }
  });

  applyBtn?.addEventListener('click', async () => {
    try {
      setStatus('warn', 'Applying…', 'Waiting for firmware ACK');
      await runtime.apply();
      setStatus('ok', 'Synced', 'Device acknowledged the staged edits.');
    } catch (err) {
      setStatus('err', 'Apply failed', err.message || String(err));
    }
  });

  rollbackBtn?.addEventListener('click', async () => {
    await runtime.rollback();
    setStatus('warn', 'Rolled back', 'Local edits were discarded.');
  });

  simulatorToggle?.addEventListener('click', () => {
    const toggled = simulatorToggle.classList.toggle('active');
    runtime.useSimulator(toggled);
    simulatorToggle.textContent = toggled ? 'Stop simulator' : 'Start simulator';
    setStatus(toggled ? 'ok' : 'warn', toggled ? 'Simulator armed' : 'Simulator idle', toggled ? 'Replay frames without hardware.' : 'Connect to the physical deck.');
  });

  slotContainer?.addEventListener('keydown', (event) => {
    if (!slotState.slots.length) return;
    const { key } = event;
    const columns = slotVirtualizer.columns;
    let next = slotState.selected;
    if (key === 'ArrowRight') next += 1;
    else if (key === 'ArrowLeft') next -= 1;
    else if (key === 'ArrowUp') next -= columns;
    else if (key === 'ArrowDown') next += columns;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = slotState.slots.length - 1;
    else return;
    event.preventDefault();
    selectSlot(Math.max(0, Math.min(slotState.slots.length - 1, next)));
  });

  filterTypeEl?.addEventListener('change', () => stageFilter('type', filterTypeEl.value));
  filterFreqEl?.addEventListener('change', () => {
    const parsed = Number.parseFloat(filterFreqEl.value);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(5000, Math.max(20, parsed));
    filterFreqEl.value = String(clamped);
    stageFilter('freq', clamped);
  });
  filterQEl?.addEventListener('change', () => {
    const parsed = Number.parseFloat(filterQEl.value);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(4, Math.max(0.5, parsed));
    filterQEl.value = String(clamped);
    stageFilter('q', clamped);
  });
  argEnableEl?.addEventListener('change', () => stageArg('enable', argEnableEl.value === 'true'));
  argMethodEl?.addEventListener('change', () => stageArg('method', argMethodEl.value || 'PLUS'));
  argAEl?.addEventListener('change', () => stageArg('a', Number(argAEl.value)));
  argBEl?.addEventListener('change', () => stageArg('b', Number(argBEl.value)));

  exportPresetBtn?.addEventListener('click', () => {
    const { staged } = runtime.getState();
    const blob = new Blob([JSON.stringify(staged, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `moarknobz-preset-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  });

  importPresetBtn?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const json = JSON.parse(text);
        runtime.stage(() => json);
      } catch (err) {
        setStatus('err', 'Import failed', err.message || String(err));
      }
    };
    input.click();
  });

  if (presetPicker) {
    const placeholder = presetPicker.querySelector('option[value=""]');
    if (!placeholder) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Select a preset…';
      presetPicker.prepend(option);
    }

    const presetMap = new Map();
    presets.forEach((preset) => {
      if (presetMap.has(preset.id)) return;
      presetMap.set(preset.id, preset);
      const option = document.createElement('option');
      option.value = preset.id;
      option.textContent = preset.label;
      if (typeof preset.load !== 'function') {
        option.disabled = true;
      }
      presetPicker.appendChild(option);
    });
    presetPicker.selectedIndex = 0;

    presetPicker.addEventListener('change', async () => {
      const presetId = presetPicker.value;
      const descriptor = presetMap.get(presetId);
      if (!descriptor || typeof descriptor.load !== 'function') {
        presetPicker.selectedIndex = 0;
        return;
      }
      try {
        const config = await descriptor.load();
        if (!config || typeof config !== 'object') {
          throw new Error('Preset payload was empty');
        }
        runtime.stage(() => config);
        setStatus('warn', 'Preset staged', `${descriptor.label} staged. Hit Apply to push it to the deck.`);
      } catch (err) {
        setStatus('err', 'Preset load failed', err.message || String(err));
      } finally {
        presetPicker.selectedIndex = 0;
      }
    });
  }

  migrationApply?.addEventListener('click', () => migrationDialog?.close('apply'));
  migrationCancel?.addEventListener('click', () => migrationDialog?.close('cancel'));
  migrationExport?.addEventListener('click', () => exportPresetBtn?.click());
  migrationDialog?.addEventListener('close', () => {
    if (!migrationDialog?.returnValue || migrationDialog.returnValue === 'apply') {
      setStatus('warn', 'Migration ready', 'Review staged adapter before applying.');
    } else {
      setStatus('warn', 'Schema mismatch', 'Update firmware or UI so schemas agree.');
    }
  });

  runtime.on('status', ({ level, message }) => {
    const map = { error: 'err', warn: 'warn', info: 'ok', ok: 'ok' };
    const state = map[level] || 'warn';
    setStatus(state, level?.toUpperCase?.() || 'NOTE', message);
  });
  runtime.on('telemetry', (frame) => {
    slotState.telemetry = frame;
    paintTelemetry(frame);
  });
  runtime.on('config', ({ staged, config, dirty }) => {
    slotState.slots = staged?.slots ?? [];
    slotState.efSlots = staged?.efSlots ?? [];
    slotState.staged = staged;
    if (slotState.selected >= slotState.slots.length) {
      slotState.selected = Math.max(0, slotState.slots.length - 1);
    }
    updateHeader(config);
    slotVirtualizer.setData(slotState.slots);
    slotVirtualizer.highlight(slotState.selected);
    efVirtualizer.setData(slotState.efSlots);
    updateDiff(dirty);
    markDirty(dirty);
    populateDetail();
    populateFilter(staged);
    populateArg(staged);
    renderLedGrid(staged);
    updateTakeoverGuards(slotState.slots);
  });
  runtime.on('manifest', (manifest) => {
    updateHeaderManifest(manifest);
    renderDeviceMonitor(manifest);
  });
  runtime.on('log', (line) => {
    if (!logEl) return;
    logEl.textContent += `${line}\n`;
  });
  runtime.on('validation-error', (errors) => {
    diffPanel?.removeAttribute('hidden');
    diffOutput.textContent = `Schema violations:\n${errors.map((e) => `• ${e.instancePath || '/'} ${e.message}`).join('\n')}`;
  });
  runtime.on('applied', ({ checksum }) => {
    diffPanel?.setAttribute('hidden', '');
    diffOutput.textContent = '';
    setStatus('ok', 'Device synced', `Checksum ${checksum.slice(0, 8)}…`);
  });
  runtime.on('migration-required', ({ from, to, canAdapt }) => {
    if (!migrationDialog || !migrationPreview) return;
    migrationPreview.textContent = `Firmware schema ${from} vs UI ${to}. ${canAdapt ? 'An adapter is available; stage edits then apply.' : 'Export your preset and update firmware/UI to continue.'}`;
    migrationDialog.showModal();
  });
  runtime.on('connected', ({ manifest }) => {
    if (connectionPill) {
      connectionPill.dataset.stage = 'live';
      connectionPill.textContent = `Connected • ${manifest?.fw_version || 'fw?'}`;
    }
    if (applyBtn) applyBtn.disabled = true;
    if (rollbackBtn) rollbackBtn.disabled = true;
    if (exportPresetBtn) exportPresetBtn.disabled = false;
    if (importPresetBtn) importPresetBtn.disabled = false;
    setStatus('ok', 'Connected', 'Schema synced. Stage edits before applying.');
  });
  runtime.on('disconnected', () => {
    if (connectionPill) {
      connectionPill.dataset.stage = 'disconnected';
      connectionPill.textContent = 'Disconnected';
    }
    if (applyBtn) applyBtn.disabled = true;
    if (rollbackBtn) rollbackBtn.disabled = true;
    if (exportPresetBtn) exportPresetBtn.disabled = true;
    if (importPresetBtn) importPresetBtn.disabled = true;
    setStatus('warn', 'Disconnected', 'Reconnect to continue editing.');
  });
  runtime.on('error', (err) => {
    if (connectionPill) {
      connectionPill.dataset.stage = 'disconnected';
      connectionPill.textContent = 'Disconnected';
    }
    setStatus('err', 'Runtime error', err.message || String(err));
  });
  runtime.on('rollback', () => {
    updateDiff(false);
    markDirty(false);
    setStatus('warn', 'Rollback', 'Local edits were discarded.');
  });

  function setStatus(state, label, message) {
    if (!statusEl || !statusLabel || !statusMessage) return;
    statusEl.dataset.state = state;
    statusLabel.textContent = label;
    statusMessage.textContent = message;
  }

  function markDirty(isDirty) {
    if (dirtyBadge) dirtyBadge.toggleAttribute('hidden', !isDirty);
    if (applyBtn) applyBtn.disabled = !isDirty;
    if (rollbackBtn) rollbackBtn.disabled = !isDirty;
  }

  function updateDiff(isDirty) {
    if (!diffPanel || !diffOutput) return;
    const changes = runtime.diff();
    if (!isDirty || !changes.length) {
      diffPanel.setAttribute('hidden', '');
      diffOutput.textContent = '';
      return;
    }
    diffPanel.removeAttribute('hidden');
    diffOutput.textContent = changes.map(({ path, before, after }) => `${path}: ${JSON.stringify(before)} → ${JSON.stringify(after)}`).join('\n');
  }

  function updateHeader(config) {
    if (!headerStatus) return;
    const manifest = runtime.getState().manifest;
    const ram = manifest?.free?.ram ? `${Math.round(manifest.free.ram / 1024)}k RAM` : 'ram?';
    const flash = manifest?.free?.flash ? `${Math.round(manifest.free.flash / 1024)}k flash` : 'flash?';
    headerStatus.textContent = [manifest?.fw_version || 'fw?', manifest?.schema_version || 'schema?', `${ram} • ${flash}`].join(' • ');
  }

  function updateHeaderManifest(manifest) {
    if (!connectionPill) return;
    connectionPill.dataset.stage = 'live';
    connectionPill.textContent = `Connected • ${manifest.fw_version || 'fw?'}`;
    updateHeader(runtime.getState().live);
  }

  function selectSlot(index) {
    const maxIndex = Math.max(0, slotState.slots.length - 1);
    slotState.selected = Math.min(Math.max(0, index), maxIndex);
    slotVirtualizer.highlight(slotState.selected);
    slotVirtualizer.scrollToIndex(slotState.selected);
    populateDetail();
  }

  function populateDetail() {
    const slot = slotState.slots[slotState.selected];
    const telemetry = slotState.telemetry || {};
    if (slotDetailIndex) slotDetailIndex.textContent = slotState.selected !== undefined ? `Slot ${String(slotState.selected + 1).padStart(2, '0')}` : '—';
    if (slotDetailStatus) slotDetailStatus.textContent = slot?.active ? 'Active' : 'Muted';
    if (slotDetailType) slotDetailType.textContent = slot?.type ?? '—';
    if (slotDetailChannel) slotDetailChannel.textContent = slot?.midiChannel ?? '—';
    if (slotDetailData) {
      if (slot?.type === 'SysEx') {
        slotDetailData.textContent = slot?.sysexTemplate && slot.sysexTemplate.length ? slot.sysexTemplate : '—';
      } else {
        slotDetailData.textContent = slot?.data1 ?? '—';
      }
    }
    const ef = normalizeEf(slot);
    if (slotDetailEfIndex) slotDetailEfIndex.textContent = formatEfIndex(ef.index);
    if (slotDetailEfFilter) slotDetailEfFilter.textContent = formatEfFilter(ef);
    if (slotDetailEfTuning) slotDetailEfTuning.textContent = formatEfTuning(ef);
    if (slotDetailEfDynamics) slotDetailEfDynamics.textContent = formatEfDynamics(ef);
    if (slotDetailEfBaseline) slotDetailEfBaseline.textContent = formatEfBaseline(ef);
    const arg = normalizeArg(slot);
    if (slotDetailArg) slotDetailArg.textContent = formatArgMode(arg);
    if (slotDetailArgSources) slotDetailArgSources.textContent = formatArgSources(arg);
    const value = Array.isArray(telemetry.slots) ? telemetry.slots[slotState.selected] : null;
    if (slotDetailValue) slotDetailValue.textContent = value ?? '—';
    renderSlotEditor();
  }

  function renderSlotEditor() {
    if (!formContainer) return;
    formContainer.innerHTML = '';
    const slot = slotState.slots[slotState.selected];
    if (!slot) {
      formContainer.textContent = 'Select a slot to edit.';
      return;
    }
    const form = document.createElement('form');
    form.className = 'slot-editor';
    form.addEventListener('submit', (event) => event.preventDefault());

    const basics = makeFieldset('Slot Basics');
    basics.appendChild(
      makeSelect(
        'MIDI Type',
        ['OFF', 'CC', 'Note', 'PitchBend', 'ProgramChange', 'Aftertouch', 'ModWheel', 'NRPN', 'RPN', 'SysEx'],
        slot.type,
        (value) => stageSlotField(slotState.selected, 'type', value),
      ),
    );
    basics.appendChild(
      makeNumber('MIDI Channel', slot.midiChannel ?? 1, 1, 16, 1, (value) => stageSlotField(slotState.selected, 'midiChannel', value)),
    );
    basics.appendChild(
      makeNumber('Data (CC/Note)', slot.data1 ?? 0, 0, 127, 1, (value) => stageSlotField(slotState.selected, 'data1', value)),
    );
    basics.appendChild(
      makeNumber('Arp Root Note', slot.arpNote ?? 0, 0, 127, 1, (value) => stageSlotField(slotState.selected, 'arpNote', value)),
    );
    basics.appendChild(
      makeText('Label', slot.label ?? '', 'Verse / build / drop cues', (value) => stageSlotField(slotState.selected, 'label', value)),
    );
    basics.appendChild(makeToggle('Active', !!slot.active, (value) => stageSlotField(slotState.selected, 'active', value)));
    basics.appendChild(makeToggle('Pot mapped', !!slot.pot, (value) => stageSlotField(slotState.selected, 'pot', value)));
    const takeover = makeToggle('Take Control', !!slot.takeover, (value) => {
      stageSlotField(slotState.selected, 'takeover', value);
      runtime.setPotGuard([slotState.selected], !value);
    });
    basics.appendChild(takeover);
    if (slot.type === 'SysEx') {
      basics.appendChild(
        makeText(
          'SysEx Template',
          slot.sysexTemplate ?? '',
          'F0 7F 01 04 XX F7',
          (value) => {
            const normalised = normaliseSysexTemplate(value);
            stageSlotField(slotState.selected, 'sysexTemplate', normalised);
          },
        ),
      );
      const hint = document.createElement('p');
      hint.className = 'slot-hint';
      hint.textContent = 'Hex bytes + XX/MSB/LSB placeholders. We swap the placeholders with live values.';
      basics.appendChild(hint);
    }
    form.appendChild(basics);

    const manifest = runtime.getState().manifest ?? localManifest;
    const ef = normalizeEf(slot);
    const efSlots = manifest?.max_table_lengths?.efSlots ?? localManifest?.max_table_lengths?.efSlots ?? 0;
    const efFieldset = makeFieldset('Envelope Follower', 'These values live with the slot and retune the hardware follower on apply.');
    efFieldset.appendChild(
      makeNumber('Follower Index', ef.index ?? -1, -1, Math.max(-1, efSlots - 1), 1, (value) => {
        stageSlotField(slotState.selected, 'efIndex', value);
        stageSlotEnvelopeField(slotState.selected, 'index', value);
      }),
    );
    const currentFilter = ef.filter_name || (Number.isFinite(Number(ef.filter_index)) ? EF_FILTER_NAMES[Number(ef.filter_index)] : 'LINEAR');
    efFieldset.appendChild(
      makeSelect('Filter Shape', EF_FILTER_NAMES, currentFilter, (value) => {
        const idx = Math.max(0, EF_FILTER_NAMES.indexOf(value));
        stageSlotEnvelopeField(slotState.selected, 'filter_name', value);
        stageSlotEnvelopeField(slotState.selected, 'filter_index', idx);
      }),
    );
    efFieldset.appendChild(
      makeNumber('Frequency (Hz)', ef.frequency ?? 1000, 0, 20000, 1, (value) => stageSlotEnvelopeField(slotState.selected, 'frequency', value)),
    );
    efFieldset.appendChild(
      makeNumber('Resonance (Q)', ef.q ?? 0.707, 0, 10, 0.01, (value) => stageSlotEnvelopeField(slotState.selected, 'q', value)),
    );
    efFieldset.appendChild(
      makeNumber('Oversample', ef.oversample ?? 4, 1, 32, 1, (value) => stageSlotEnvelopeField(slotState.selected, 'oversample', value)),
    );
    efFieldset.appendChild(
      makeNumber('Smoothing', ef.smoothing ?? 0.2, 0, 1, 0.01, (value) => stageSlotEnvelopeField(slotState.selected, 'smoothing', value)),
    );
    efFieldset.appendChild(
      makeNumber('Baseline Offset', ef.baseline ?? 0, -10, 10, 0.1, (value) => stageSlotEnvelopeField(slotState.selected, 'baseline', value)),
    );
    efFieldset.appendChild(
      makeNumber('Gain', ef.gain ?? 1, 0, 8, 0.1, (value) => stageSlotEnvelopeField(slotState.selected, 'gain', value)),
    );
    form.appendChild(efFieldset);

    const arg = normalizeArg(slot);
    const argFieldset = makeFieldset('ARG Combiner', 'Crossfade or mash followers before the slot screams MIDI.');
    argFieldset.appendChild(makeToggle('Enabled', !!arg.enabled, (value) => stageSlotArgField(slotState.selected, 'enabled', value)));
    argFieldset.appendChild(
      makeSelect('Method', ARG_METHOD_NAMES, resolveArgMethodName(arg) ?? ARG_METHOD_NAMES[0], (value) => {
        const idx = Math.max(0, ARG_METHOD_NAMES.indexOf(value));
        stageSlotArgField(slotState.selected, 'method', idx);
        stageSlotArgField(slotState.selected, 'method_name', value);
      }),
    );
    argFieldset.appendChild(
      makeNumber('Source A', arg.sourceA ?? 0, 0, Math.max(0, efSlots - 1), 1, (value) => stageSlotArgField(slotState.selected, 'sourceA', value)),
    );
    argFieldset.appendChild(
      makeNumber('Source B', arg.sourceB ?? 1, 0, Math.max(0, efSlots - 1), 1, (value) => stageSlotArgField(slotState.selected, 'sourceB', value)),
    );
    form.appendChild(argFieldset);

    formContainer.appendChild(form);
  }

  function makeSelect(labelText, options, current, onChange) {
    const wrap = document.createElement('label');
    wrap.textContent = labelText;
    const select = document.createElement('select');
    options.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      if (opt === current) option.selected = true;
      select.appendChild(option);
    });
    select.onchange = () => onChange(select.value);
    wrap.appendChild(select);
    return wrap;
  }

  function makeNumber(labelText, current, min, max, step, onCommit) {
    const wrap = document.createElement('label');
    wrap.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'number';
    if (min !== undefined && min !== null) input.min = String(min);
    if (max !== undefined && max !== null) input.max = String(max);
    if (step !== undefined && step !== null) input.step = String(step);
    input.value = current;
    input.onchange = () => onCommit(Number(input.value));
    const coarseStep = step ?? 1;
    attachCoarseFine(input, coarseStep);
    wrap.appendChild(input);
    return wrap;
  }

  function makeText(labelText, current, placeholder, onCommit) {
    const wrap = document.createElement('label');
    wrap.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = current ?? '';
    if (placeholder) input.placeholder = placeholder;
    input.addEventListener('change', () => onCommit(input.value));
    wrap.appendChild(input);
    return wrap;
  }

  function makeToggle(labelText, current, onCommit) {
    const wrap = document.createElement('label');
    wrap.className = 'toggle';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = current;
    input.onchange = () => onCommit(input.checked);
    const span = document.createElement('span');
    span.textContent = labelText;
    wrap.append(input, span);
    return wrap;
  }

  function makeFieldset(title, hint) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'slot-fieldset';
    const legend = document.createElement('legend');
    legend.textContent = title;
    fieldset.appendChild(legend);
    if (hint) {
      const blurb = document.createElement('p');
      blurb.className = 'slot-hint';
      blurb.textContent = hint;
      fieldset.appendChild(blurb);
    }
    return fieldset;
  }

  function attachCoarseFine(input, baseStep) {
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      event.preventDefault();
      const delta = (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? baseStep * 10 : baseStep);
      const next = Math.min(Number(input.max), Math.max(Number(input.min), Number(input.value) + delta));
      input.value = String(next);
      input.dispatchEvent(new Event('change'));
    });
  }

  function stageSlotField(index, key, value) {
    runtime.stage((draft) => {
      draft.slots = draft.slots || [];
      if (!draft.slots[index]) draft.slots[index] = {};
      draft.slots[index][key] = value;
      if (key === 'efIndex') {
        draft.slots[index].ef = draft.slots[index].ef || {};
        draft.slots[index].ef.index = value;
      }
      return draft;
    });
  }

  function stageSlotEnvelopeField(index, key, value) {
    runtime.stage((draft) => {
      draft.slots = draft.slots || [];
      if (!draft.slots[index]) draft.slots[index] = {};
      draft.slots[index].ef = draft.slots[index].ef || {};
      draft.slots[index].ef[key] = value;
      if (key === 'index') {
        draft.slots[index].efIndex = value;
      }
      return draft;
    });
  }

  function stageSlotArgField(index, key, value) {
    runtime.stage((draft) => {
      draft.slots = draft.slots || [];
      if (!draft.slots[index]) draft.slots[index] = {};
      draft.slots[index].arg = draft.slots[index].arg || {};
      draft.slots[index].arg[key] = value;
      return draft;
    });
  }

  function formatNumberField(value, fractionDigits = 2) {
    if (value === null || value === undefined) return '—';
    const num = Number(value);
    if (!Number.isFinite(num)) return '—';
    if (fractionDigits <= 0) return String(Math.round(num));
    return Number(num.toFixed(fractionDigits)).toString();
  }

  function formatEfIndex(index) {
    if (index === null || index === undefined) return '—';
    const num = Number(index);
    if (!Number.isFinite(num)) return '—';
    if (num < 0) return 'Unassigned';
    return `EF ${String(num + 1).padStart(2, '0')}`;
  }

  function formatEfFilter(ef) {
    if (!ef) return '—';
    const index = Number(ef.filter_index);
    const name = ef.filter_name || (Number.isFinite(index) ? EF_FILTER_NAMES[index] : null);
    if (!name) return '—';
    const idx = Number.isFinite(index) ? `#${index}` : null;
    return idx ? `${name} (${idx})` : name;
  }

  function formatEfTuning(ef) {
    if (!ef) return '—';
    const freq = formatNumberField(ef.frequency, 1);
    const q = formatNumberField(ef.q, 2);
    if (freq === '—' && q === '—') return '—';
    const freqLabel = freq === '—' ? '—' : `${freq} Hz`;
    return `${freqLabel} • Q ${q}`;
  }

  function formatEfDynamics(ef) {
    if (!ef) return '—';
    const oversample = Number.isFinite(Number(ef.oversample)) ? Number(ef.oversample) : null;
    const smoothing = formatNumberField(ef.smoothing, 2);
    const oversampleLabel = oversample !== null ? `×${oversample}` : '—';
    if (oversampleLabel === '—' && smoothing === '—') return '—';
    return `Oversample ${oversampleLabel} • Smoothing ${smoothing}`;
  }

  function formatEfBaseline(ef) {
    if (!ef) return '—';
    const baseline = formatNumberField(ef.baseline, 2);
    const gain = formatNumberField(ef.gain, 2);
    if (baseline === '—' && gain === '—') return '—';
    return `Baseline ${baseline} • Gain ${gain}`;
  }

  function resolveArgMethodName(arg) {
    if (!arg || typeof arg !== 'object') return null;
    if (arg.method_name && typeof arg.method_name === 'string') return arg.method_name;
    const index = Number(arg.method);
    if (Number.isFinite(index)) {
      return ARG_METHOD_NAMES[index] || null;
    }
    return null;
  }

  function formatArgMode(arg) {
    if (!arg || typeof arg !== 'object') return '—';
    const methodName = resolveArgMethodName(arg);
    const methodNum = Number(arg.method);
    const methodIndex = Number.isFinite(methodNum) ? `#${methodNum}` : null;
    const enabled = arg.enabled === undefined ? false : Boolean(arg.enabled);
    const pieces = [];
    if (methodName) pieces.push(methodName);
    if (methodIndex && (!methodName || !methodName.includes(methodIndex))) pieces.push(methodIndex);
    pieces.push(enabled ? 'ON' : 'OFF');
    return pieces.join(' · ');
  }

  function formatEfRoute(index) {
    if (index === null || index === undefined) return '—';
    const num = Number(index);
    if (!Number.isFinite(num) || num < 0) return '—';
    return `EF ${String(num + 1).padStart(2, '0')}`;
  }

  function formatArgSources(arg) {
    if (!arg || typeof arg !== 'object') return '—';
    const sourceA = formatEfRoute(arg.sourceA);
    const sourceB = formatEfRoute(arg.sourceB);
    if (sourceA === '—' && sourceB === '—') return '—';
    return `A → ${sourceA} • B → ${sourceB}`;
  }

  function normalizeEf(slot) {
    const base = slot?.ef ? { ...slot.ef } : {};
    const defaults = {
      frequency: 1000,
      q: 0.707,
      oversample: 4,
      smoothing: 0.2,
      baseline: 0,
      gain: 1
    };
    const index = Number.isFinite(slot?.efIndex)
      ? Number(slot.efIndex)
      : Number.isFinite(base.index)
      ? Number(base.index)
      : -1;
    if (!Number.isFinite(base.index)) base.index = index;
    if (Number.isFinite(Number(base.filter_index))) {
      base.filter_index = Number(base.filter_index);
    }
    if (!Number.isFinite(base.filter_index) && typeof base.filter_name === 'string') {
      const idx = EF_FILTER_NAMES.indexOf(base.filter_name);
      if (idx >= 0) base.filter_index = idx;
    }
    if (!base.filter_name && Number.isFinite(base.filter_index)) {
      base.filter_name = EF_FILTER_NAMES[base.filter_index] || null;
    }
    base.frequency = Number.isFinite(Number(base.frequency)) ? Number(base.frequency) : defaults.frequency;
    base.q = Number.isFinite(Number(base.q)) ? Number(base.q) : defaults.q;
    base.oversample = Number.isFinite(Number(base.oversample)) ? Math.max(1, Math.round(Number(base.oversample))) : defaults.oversample;
    const smoothing = Number(base.smoothing);
    base.smoothing = Number.isFinite(smoothing) ? Math.max(0, Math.min(1, smoothing)) : defaults.smoothing;
    base.baseline = Number.isFinite(Number(base.baseline)) ? Number(base.baseline) : defaults.baseline;
    base.gain = Number.isFinite(Number(base.gain)) ? Number(base.gain) : defaults.gain;
    base.index = index;
    return base;
  }

  function normalizeArg(slot) {
    const base = slot?.arg ? { ...slot.arg } : {};
    if (base.enabled === undefined) base.enabled = false;
    const methodIndex = (() => {
      if (base.method_name && typeof base.method_name === 'string') {
        const idx = ARG_METHOD_NAMES.indexOf(base.method_name);
        if (idx >= 0) return idx;
      }
      const idx = Number(base.method);
      return Number.isFinite(idx) ? idx : 0;
    })();
    base.method = methodIndex;
    base.method_name = ARG_METHOD_NAMES[methodIndex] || base.method_name || 'PLUS';
    const manifest = runtime.getState().manifest ?? localManifest;
    const efLimit = Math.max(0, (manifest?.max_table_lengths?.efSlots ?? localManifest?.max_table_lengths?.efSlots ?? 6) - 1);
    const sanitizeSource = (value, fallback) => {
      const num = Number(value);
      if (!Number.isFinite(num)) return fallback;
      return Math.max(0, Math.min(efLimit, num));
    };
    base.sourceA = sanitizeSource(base.sourceA, 0);
    base.sourceB = sanitizeSource(base.sourceB, Math.min(1, efLimit));
    return base;
  }

  function normaliseSysexTemplate(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed.length) return '';
    return trimmed
      .split(/\s+/)
      .map((token) => {
        if (!token.length) return null;
        if (/^(xx|msb|lsb)$/i.test(token)) return token.toUpperCase();
        return token.toUpperCase();
      })
      .filter(Boolean)
      .join(' ');
  }

  function populateFilter(staged) {
    if (!staged) return;
    if (filterTypeEl) filterTypeEl.value = staged.filter?.type ?? 'LINEAR';
    if (filterFreqEl) filterFreqEl.value = staged.filter?.freq ?? 20;
    if (filterQEl) filterQEl.value = staged.filter?.q ?? 1;
  }

  function populateArg(staged) {
    if (!staged) return;
    if (argEnableEl) argEnableEl.value = String(staged.arg?.enable ?? true);
    if (argMethodEl) argMethodEl.value = staged.arg?.method ?? 'PLUS';
    if (argAEl) argAEl.value = staged.arg?.a ?? 0;
    if (argBEl) argBEl.value = staged.arg?.b ?? 0;
  }

  function stageFilter(key, value) {
    runtime.stage((draft) => {
      draft.filter = draft.filter || {};
      draft.filter[key] = value;
      return draft;
    });
  }

  function stageArg(key, value) {
    runtime.stage((draft) => {
      draft.arg = draft.arg || {};
      draft.arg[key] = value;
      return draft;
    });
  }

  function renderLedGrid(staged) {
    if (!ledGrid) return;
    ledGrid.innerHTML = '';
    const leds = staged?.ledColors ?? [];
    const fragment = document.createDocumentFragment();
    leds.forEach((entry, index) => {
      const wrap = document.createElement('label');
      wrap.className = 'led-chip';
      wrap.textContent = `LED ${index + 1}`;
      const input = document.createElement('input');
      input.type = 'color';
      input.value = entry?.color ?? '#000000';
      input.addEventListener('input', runtime.createThrottle((event) => {
        runtime.stage((draft) => {
          draft.ledColors = draft.ledColors || [];
          if (!draft.ledColors[index]) draft.ledColors[index] = { color: '#000000' };
          draft.ledColors[index].color = event.target.value;
          return draft;
        });
      }));
      wrap.appendChild(input);
      fragment.appendChild(wrap);
    });
    ledGrid.appendChild(fragment);
  }

  function updateTakeoverGuards(slots) {
    if (!Array.isArray(slots)) return;
    const guardOn = [];
    const guardOff = [];
    slots.forEach((slot, idx) => {
      if (slot?.takeover) guardOff.push(idx);
      else guardOn.push(idx);
    });
    if (guardOn.length) runtime.setPotGuard(guardOn, true);
    if (guardOff.length) runtime.setPotGuard(guardOff, false);
  }

  function renderDeviceMonitor(manifest) {
    if (!deviceMonitor) return;
    deviceMonitor.innerHTML = '';
    const entries = {
      Firmware: manifest?.fw_version || '—',
      'Git hash': manifest?.fw_git || '—',
      'Build time': manifest?.build_ts || '—',
      'Schema version': manifest?.schema_version || '—',
      'Free RAM': manifest?.free?.ram ? `${Math.round(manifest.free.ram / 1024)} KiB` : '—',
      'Free Flash': manifest?.free?.flash ? `${Math.round(manifest.free.flash / 1024)} KiB` : '—'
    };
    Object.entries(entries).forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'monitor-row';
      const term = document.createElement('span');
      term.className = 'monitor-label';
      term.textContent = label;
      const val = document.createElement('span');
      val.className = 'monitor-value';
      val.textContent = value;
      row.append(term, val);
      deviceMonitor.appendChild(row);
    });
  }

  function renderSlotButton(el, index, slot) {
    el.className = 'slot-button';
    el.tabIndex = -1;
    el.innerHTML = '';
    el.dataset.index = String(index);
    const label = document.createElement('span');
    label.className = 'slot-label';
    label.textContent = `S${String(index + 1).padStart(2, '0')}`;
    const state = document.createElement('span');
    state.className = 'slot-state';
    state.textContent = slot?.type ?? '—';
    const value = document.createElement('span');
    value.className = 'slot-value';
    value.textContent = slotState.telemetry?.slots?.[index] ?? '0';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'takeover';
    toggle.textContent = slot?.takeover ? 'Takeover' : 'Guarded';
    toggle.onclick = () => {
      const next = !slot?.takeover;
      runtime.stage((draft) => {
        draft.slots[index].takeover = next;
        return draft;
      });
      runtime.setPotGuard([index], !next);
    };
    el.append(label, state, value, toggle);
    el.onclick = () => selectSlot(index);
    el.setAttribute('role', 'button');
    el.classList.toggle('selected', index === slotState.selected);
  }

  function renderEfRow(el, index, item) {
    el.className = 'ef-row';
    el.innerHTML = '';
    const label = document.createElement('span');
    label.textContent = `EF ${index + 1}`;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = slotState.slots.length - 1;
    input.value = item?.slot ?? 0;
    input.addEventListener('change', () => {
      runtime.stage((draft) => {
        draft.efSlots = draft.efSlots || [];
        if (!draft.efSlots[index]) draft.efSlots[index] = { slot: 0 };
        draft.efSlots[index].slot = Number(input.value);
        return draft;
      });
    });
    el.append(label, input);
  }

  function paintTelemetry(frame) {
    if (!Array.isArray(frame.slots)) return;
    slotVirtualizer.updateTelemetry(frame.slots);
    frame.envelopes?.forEach((value, idx) => {
      const entry = envMeters[idx];
      if (!entry) return;
      entry.progress.value = value;
      entry.value.textContent = String(value);
    });
    if (frame.free) {
      renderDeviceMonitor({ ...runtime.getState().manifest, free: frame.free });
    }
    slotDetailValue.textContent = frame.slots[slotState.selected] ?? '—';
  }

  function initializeMeters(container, count, labelPrefix) {
    if (!container) return [];
    container.innerHTML = '';
    const meters = [];
    for (let i = 0; i < count; i += 1) {
      const wrap = document.createElement('div');
      wrap.className = 'meter';
      const label = document.createElement('span');
      label.textContent = `${labelPrefix} ${String(i + 1).padStart(2, '0')}`;
      const progress = document.createElement('progress');
      progress.max = 127;
      progress.value = 0;
      const value = document.createElement('span');
      value.className = 'meter-value';
      value.textContent = '0';
      wrap.append(label, progress, value);
      container.appendChild(wrap);
      meters.push({ wrap, progress, value });
    }
    return meters;
  }

  class VirtualGrid {
    constructor(container, { columns, rowHeight, render }) {
      this.container = container;
      this.columns = columns;
      this.rowHeight = rowHeight;
      this.renderItem = render;
      this.data = [];
      this.pool = [];
      this.viewport = document.createElement('div');
      this.viewport.className = 'virtual-grid';
      if (this.container) {
        this.container.style.position = 'relative';
        this.container.style.overflowY = 'auto';
        this.container.appendChild(this.viewport);
        this.container.__resizeCallback = () => this.compute();
        sharedResizeObserver?.observe(this.container);
      }
      this.viewport.style.position = 'relative';
      this.viewport.style.width = '100%';
      this.container?.addEventListener('scroll', () => this.render());
    }

    setData(data) {
      this.data = data || [];
      this.compute();
    }

    compute() {
      if (!this.container) return;
      const visibleRows = Math.ceil(this.container.clientHeight / this.rowHeight) + 2;
      const needed = visibleRows * this.columns;
      while (this.pool.length < needed) {
        const el = document.createElement('div');
        el.className = 'virtual-item';
        el.style.position = 'absolute';
        this.viewport.appendChild(el);
        this.pool.push(el);
      }
      this.render();
    }

    render() {
      if (!this.container) return;
      const scrollTop = this.container.scrollTop;
      const firstRow = Math.max(0, Math.floor(scrollTop / this.rowHeight) - 1);
      const startIndex = firstRow * this.columns;
      this.viewport.style.height = `${Math.ceil(this.data.length / this.columns) * this.rowHeight}px`;
      this.pool.forEach((el, idx) => {
        const dataIndex = startIndex + idx;
        if (dataIndex >= this.data.length) {
          el.style.display = 'none';
          return;
        }
        el.style.display = '';
        const row = Math.floor(dataIndex / this.columns);
        const column = dataIndex % this.columns;
        el.style.width = `${100 / this.columns}%`;
        el.style.transform = `translate(${column * 100}%, ${row * this.rowHeight}px)`;
        el.style.height = `${this.rowHeight}px`;
        el.dataset.index = String(dataIndex);
        this.renderItem(el, dataIndex, this.data[dataIndex]);
      });
    }

    scrollToIndex(index) {
      if (!this.container) return;
      const row = Math.floor(index / this.columns);
      const target = row * this.rowHeight;
      this.container.scrollTo({ top: target, behavior: 'smooth' });
    }

    highlight(index) {
      this.pool.forEach((el) => {
        el.classList.toggle('selected', Number(el.dataset.index) === index);
      });
    }

    updateTelemetry(values) {
      this.pool.forEach((el) => {
        if (el.dataset.index === undefined) return;
        const idx = Number(el.dataset.index);
        const value = values[idx] ?? 0;
        el.dataset.value = value;
        const meter = el.querySelector('.slot-value');
        if (meter) meter.textContent = value;
      });
    }
  }

  class VirtualList {
    constructor(container, { itemHeight, render }) {
      this.container = container;
      this.itemHeight = itemHeight;
      this.renderItem = render;
      this.data = [];
      this.pool = [];
      this.viewport = document.createElement('div');
      this.viewport.className = 'virtual-list';
      if (this.container) {
        this.container.style.position = 'relative';
        this.container.style.overflowY = 'auto';
        this.container.appendChild(this.viewport);
        this.container.__resizeCallback = () => this.compute();
        sharedResizeObserver?.observe(this.container);
      }
      this.viewport.style.position = 'relative';
      this.viewport.style.width = '100%';
      this.container?.addEventListener('scroll', () => this.render());
    }

    setData(data) {
      this.data = data || [];
      this.compute();
    }

    compute() {
      if (!this.container) return;
      const visible = Math.ceil(this.container.clientHeight / this.itemHeight) + 2;
      while (this.pool.length < visible) {
        const el = document.createElement('div');
        el.className = 'virtual-row';
        el.style.position = 'absolute';
        this.viewport.appendChild(el);
        this.pool.push(el);
      }
      this.render();
    }

    render() {
      if (!this.container) return;
      const scrollTop = this.container.scrollTop;
      const first = Math.max(0, Math.floor(scrollTop / this.itemHeight) - 1);
      this.viewport.style.height = `${this.data.length * this.itemHeight}px`;
      this.pool.forEach((el, idx) => {
        const dataIndex = first + idx;
        if (dataIndex >= this.data.length) {
          el.style.display = 'none';
          return;
        }
        el.style.display = '';
        el.style.width = '100%';
        el.style.transform = `translateY(${dataIndex * this.itemHeight}px)`;
        this.renderItem(el, dataIndex, this.data[dataIndex]);
      });
    }
  }
});
