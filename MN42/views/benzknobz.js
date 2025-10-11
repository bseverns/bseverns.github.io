import { createRuntime } from '../runtime.js';

const localManifest = {
  ui_version: '2024.08.01',
  schema_version: '1.3.0',
  slot_count: 42,
  max_table_lengths: {
    ledColors: 42,
    efSlots: 6
  }
};

const ARG_METHODS = [
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
const ARG_METHOD_DEFAULT = ARG_METHODS[0];

const SLOT_TYPE_OPTIONS = [
  'OFF',
  'CC',
  'Note',
  'PitchBend',
  'ProgramChange',
  'Aftertouch',
  'ModWheel',
  'NRPN',
  'RPN',
  'SysEx'
];

const CONTROL_LABELS = {
  'slot.type': 'MIDI Type',
  'slot.midiChannel': 'MIDI Channel',
  'slot.data1': 'Data (CC/Note)',
  'slot.efIndex': 'Envelope Follow',
  'slot.active': 'Active',
  'slot.pot': 'Pot mapped',
  'slot.takeover': 'Take control',
  'ef.slot': 'Follower slot',
  'filter.type': 'Filter Type',
  'filter.freq': 'Filter Frequency',
  'filter.q': 'Filter Resonance',
  'arg.method': 'ARG Method',
  'arg.enable': 'ARG Enable',
  'arg.a': 'ARG A',
  'arg.b': 'ARG B',
  'led.color': 'LED Color'
};

const SLOT_CONTROLS = [
  { id: 'slot.type', type: 'select', range: { options: SLOT_TYPE_OPTIONS }, target: 'slots.{index}.type' },
  {
    id: 'slot.midiChannel',
    type: 'number',
    range: { min: 1, max: 16, step: 1 },
    target: 'slots.{index}.midiChannel'
  },
  { id: 'slot.data1', type: 'number', range: { min: 0, max: 127, step: 1 }, target: 'slots.{index}.data1' },
  {
    id: 'slot.efIndex',
    type: 'number',
    range: { min: 0, max: localManifest.max_table_lengths.efSlots - 1, step: 1 },
    target: 'slots.{index}.efIndex'
  },
  { id: 'slot.active', type: 'toggle', range: {}, target: 'slots.{index}.active' },
  { id: 'slot.pot', type: 'toggle', range: {}, target: 'slots.{index}.pot' }
];

const TAKEOVER_CONTROL = { id: 'slot.takeover', type: 'toggle', range: {}, target: 'slots.{index}.takeover' };

const FILTER_CONTROLS = [
  { id: 'filter.type', type: 'select', range: { options: ['LINEAR', 'OPPOSITE_LINEAR', 'EXPONENTIAL', 'RANDOM', 'LOWPASS', 'HIGHPASS', 'BANDPASS'] }, target: 'filter.type' },
  { id: 'filter.freq', type: 'number', range: { min: 20, max: 5000, step: 1 }, target: 'filter.freq' },
  { id: 'filter.q', type: 'number', range: { min: 0.5, max: 4, step: 0.01 }, target: 'filter.q' }
];

const ARG_CONTROLS = [
  { id: 'arg.method', type: 'select', range: { options: ARG_METHODS }, target: 'arg.method' },
  {
    id: 'arg.enable',
    type: 'select',
    range: { options: [{ value: true, label: 'ON' }, { value: false, label: 'OFF' }] },
    target: 'arg.enable'
  },
  { id: 'arg.a', type: 'number', range: { min: 0, max: 5, step: 0.01 }, target: 'arg.a' },
  { id: 'arg.b', type: 'number', range: { min: 0, max: 5, step: 0.01 }, target: 'arg.b' }
];

const EF_CONTROL = {
  id: 'ef.slot',
  type: 'number',
  range: { min: 0, max: localManifest.slot_count - 1, step: 1 },
  target: 'efSlots.{index}.slot'
};

const runtime = createRuntime({
  schemaUrl: './config_schema.json',
  localManifest
});

const CONTROL_POST_COMMIT = {
  'slot.takeover': (value, context) => {
    if (typeof context.index === 'number') {
      runtime.setPotGuard([context.index], !value);
    }
  }
};

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
  const simulatorToggle = document.getElementById('simulator-toggle');
  const ledGrid = document.getElementById('led-grid');
  const formContainer = document.getElementById('form');
  const filterTypeEl = document.getElementById('filter-type');
  const filterFreqEl = document.getElementById('filter-freq');
  const filterQEl = document.getElementById('filter-q');
  const argMethodEl = document.getElementById('arg-method');
  const argEnableEl = document.getElementById('arg-enable');
  const argAEl = document.getElementById('arg-a');
  const argBEl = document.getElementById('arg-b');
  const efAssignmentGrid = document.querySelector('#ef-assignment-card .ef-grid');
  const slotDetailIndex = document.getElementById('slot-detail-index');
  const slotDetailStatus = document.getElementById('slot-detail-status');
  const slotDetailType = document.getElementById('slot-detail-type');
  const slotDetailChannel = document.getElementById('slot-detail-channel');
  const slotDetailData = document.getElementById('slot-detail-data');
  const slotDetailEnvelope = document.getElementById('slot-detail-envelope');
  const slotDetailArg = document.getElementById('slot-detail-arg');
  const slotDetailValue = document.getElementById('slot-detail-value');
  const slotTakeoverPanel = document.getElementById('slot-takeover-control');
  const slotTakeoverToggle = document.getElementById('slot-takeover-toggle');
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

  const controlBindings = new Map();
  let conflictHighlights = [];

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
      setStatus('err', 'Connect failed', err.message || String(err));
    }
  });

  applyBtn?.addEventListener('click', async () => {
    try {
      setStatus('warn', 'Applying…', 'Waiting for firmware ACK');
      await runtime.apply();
      setStatus('ok', 'Synced', 'Device acknowledged the staged edits.');
    } catch (err) {
      if (err?.message === 'Device reported checksum mismatch') return;
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

  bindStaticControl(filterTypeEl, FILTER_CONTROLS[0]);
  bindStaticControl(filterFreqEl, FILTER_CONTROLS[1]);
  bindStaticControl(filterQEl, FILTER_CONTROLS[2]);
  bindStaticControl(argMethodEl, ARG_CONTROLS[0]);
  bindStaticControl(argEnableEl, ARG_CONTROLS[1]);
  bindStaticControl(argAEl, ARG_CONTROLS[2]);
  bindStaticControl(argBEl, ARG_CONTROLS[3]);

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
    if (dirty) {
      conflictHighlights = [];
    }
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
    conflictHighlights = [];
    highlightConflicts([]);
    diffPanel?.setAttribute('hidden', '');
    diffOutput.textContent = '';
    setStatus('ok', 'Device synced', `Checksum ${checksum.slice(0, 8)}…`);
  });
  runtime.on('apply-mismatch', ({ expected, received, conflicts }) => {
    conflictHighlights = Array.isArray(conflicts) ? conflicts : [];
    const proof = typeof received === 'string' ? received.slice(0, 8) : '????';
    setStatus('err', 'Checksum mismatch', `Firmware proof ${proof} disagreed. Diff reopened with highlights.`);
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
    setStatus('err', 'Runtime error', err.message || String(err));
  });
  runtime.on('rollback', () => {
    updateDiff(false);
    markDirty(false);
    conflictHighlights = [];
    highlightConflicts([]);
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
    const conflictDiff = runtime.getConflictDiff();
    const showConflict = !isDirty && conflictDiff.length > 0;
    const changes = isDirty ? runtime.diff() : showConflict ? conflictDiff : [];
    if (!changes.length) {
      diffPanel.setAttribute('hidden', '');
      diffPanel.removeAttribute('data-state');
      diffOutput.textContent = '';
      if (!isDirty) highlightConflicts([]);
      return;
    }
    diffPanel.removeAttribute('hidden');
    if (showConflict) diffPanel.dataset.state = 'conflict';
    else diffPanel.removeAttribute('data-state');
    diffOutput.textContent = changes
      .map(({ path, before, after }) => `${showConflict ? '!' : '•'} ${path}: ${JSON.stringify(before)} → ${JSON.stringify(after)}`)
      .join('\n');
    const highlightPaths = showConflict
      ? (conflictHighlights.length ? conflictHighlights : conflictDiff.map((entry) => entry.path))
      : [];
    highlightConflicts(highlightPaths);
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
    if (slotDetailData) slotDetailData.textContent = slot?.data1 ?? '—';
    if (slotDetailEnvelope) slotDetailEnvelope.textContent = slot?.efIndex !== undefined ? `EF ${slot.efIndex + 1}` : '—';
    if (slotDetailArg) slotDetailArg.textContent = slotState.staged?.arg?.method ?? '—';
    const value = Array.isArray(telemetry.slots) ? telemetry.slots[slotState.selected] : null;
    if (slotDetailValue) slotDetailValue.textContent = value ?? '—';
    updateTakeoverToggle(slot, slotState.selected);
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

    const staged = slotState.staged;
    const context = { index: slotState.selected };
    SLOT_CONTROLS.forEach((control) => {
      const field = renderControl(control, context, staged);
      if (field) form.appendChild(field);
    });

    formContainer.appendChild(form);
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

  function populateFilter(staged) {
    populateBoundControls(staged, FILTER_CONTROLS);
  }

  function populateArg(staged) {
    populateBoundControls(staged, ARG_CONTROLS);
  }

  function renderLedGrid(staged) {
    if (!ledGrid) return;
    ledGrid.innerHTML = '';
    const leds = staged?.ledColors ?? [];
    const fragment = document.createDocumentFragment();
    leds.forEach((entry, index) => {
      const control = { id: 'led.color', type: 'color', range: {}, target: 'ledColors.{index}.color' };
      const wrap = document.createElement('label');
      wrap.className = 'led-chip';
      const labelSpan = document.createElement('span');
      labelSpan.className = 'control-label';
      labelSpan.textContent = `LED ${String(index + 1).padStart(2, '0')}`;
      const input = document.createElement('input');
      input.type = 'color';
      input.value = entry?.color ?? '#000000';
      setControlMetadata(wrap, input, control, { index });
      input.addEventListener(
        'input',
        runtime.createThrottle((event) => {
          stageControl(control, event.target.value, { index });
        })
      );
      wrap.append(labelSpan, input);
      fragment.appendChild(wrap);
    });
    ledGrid.appendChild(fragment);
  }

  function updateTakeoverToggle(slot, index) {
    if (!slotTakeoverPanel || !slotTakeoverToggle) return;
    const label = slotTakeoverPanel.querySelector('label.toggle');
    if (!label) return;
    const control = TAKEOVER_CONTROL;
    const context = { index };
    if (!slot || index === undefined) {
      slotTakeoverPanel.setAttribute('hidden', '');
      controlBindings.delete(bindingKey(control, context));
      return;
    }
    slotTakeoverPanel.removeAttribute('hidden');
    applyControlLabel(label, control);
    setControlMetadata(label, slotTakeoverToggle, control, context);
    for (const [key, binding] of controlBindings.entries()) {
      if (binding.control.id === control.id) {
        controlBindings.delete(key);
      }
    }
    registerBinding(control, slotTakeoverToggle, context);
    slotTakeoverToggle.checked = !!slot.takeover;
    slotTakeoverToggle.onchange = () => {
      stageControl(control, slotTakeoverToggle.checked, context);
    };
  }

  function bindStaticControl(element, control, context = {}) {
    if (!element || !control) return;
    const wrapper = element.closest('label');
    if (!wrapper) return;
    applyControlLabel(wrapper, control);
    if (control.type === 'select') {
      populateSelectOptions(element, control);
    }
    if (control.type === 'number') {
      if (control.range?.min !== undefined) element.min = String(control.range.min);
      if (control.range?.max !== undefined) element.max = String(control.range.max);
      if (control.range?.step !== undefined) element.step = String(control.range.step);
      attachCoarseFine(element, control.range?.step ?? 1);
    }
    setControlMetadata(wrapper, element, control, context);
    element.addEventListener('change', (event) => {
      const raw = control.type === 'toggle' ? event.target.checked : event.target.value;
      stageControl(control, raw, context);
    });
    registerBinding(control, element, context);
    const state = runtime.getState?.().staged;
    if (state) {
      const value = getValueAtPath(state, resolveTarget(control, context));
      setControlInputValue(element, control, value, context);
    } else if (control.type === 'select') {
      const opts = control.range?.options;
      if (Array.isArray(opts) && opts.length) {
        const first = opts[0];
        element.value = String(typeof first === 'object' ? first.value : first);
      }
    } else if (control.type === 'number' && control.range?.min !== undefined) {
      element.value = String(control.range.min);
    }
  }

  function registerBinding(control, element, context = {}) {
    const key = bindingKey(control, context);
    if (!key) return;
    controlBindings.set(key, { control, element, context });
  }

  function bindingKey(control, context = {}) {
    if (!control?.id) return null;
    if (typeof context.index === 'number') {
      return `${control.id}:${context.index}`;
    }
    return control.id;
  }

  function getBinding(control, context = {}) {
    const key = bindingKey(control, context);
    if (!key) return null;
    return controlBindings.get(key) || null;
  }

  function populateBoundControls(state, controls, context = {}) {
    if (!state) return;
    controls.forEach((control) => {
      const binding = getBinding(control, context);
      if (!binding) return;
      const value = getValueAtPath(state, resolveTarget(control, context));
      setControlInputValue(binding.element, control, value, context);
    });
  }

  function renderControl(control, context, state) {
    if (!control) return null;
    const wrapper = document.createElement('label');
    if (control.type === 'toggle') {
      wrapper.className = 'toggle control-field';
    } else {
      wrapper.className = 'control-field';
    }
    const labelSpan = document.createElement('span');
    labelSpan.className = 'control-label';
    const input = createControlInput(control, context, state);
    if (!input) return null;
    if (control.type === 'toggle') {
      wrapper.append(input, labelSpan);
    } else {
      wrapper.append(labelSpan, input);
    }
    applyControlLabel(wrapper, control);
    setControlMetadata(wrapper, input, control, context);
    return wrapper;
  }

  function createControlInput(control, context, state) {
    let input;
    const value = state ? getValueAtPath(state, resolveTarget(control, context)) : undefined;
    if (control.type === 'select') {
      input = document.createElement('select');
      populateSelectOptions(input, control);
      setControlInputValue(input, control, value, context);
      input.addEventListener('change', (event) => stageControl(control, event.target.value, context));
    } else if (control.type === 'number') {
      input = document.createElement('input');
      input.type = 'number';
      if (control.range?.min !== undefined) input.min = String(control.range.min);
      if (control.range?.max !== undefined) input.max = String(control.range.max);
      if (control.range?.step !== undefined) input.step = String(control.range.step);
      setControlInputValue(input, control, value, context);
      input.addEventListener('change', (event) => stageControl(control, event.target.value, context));
      attachCoarseFine(input, control.range?.step ?? 1);
    } else if (control.type === 'toggle') {
      input = document.createElement('input');
      input.type = 'checkbox';
      setControlInputValue(input, control, value, context);
      input.addEventListener('change', (event) => stageControl(control, event.target.checked, context));
    } else if (control.type === 'color') {
      input = document.createElement('input');
      input.type = 'color';
      setControlInputValue(input, control, value, context);
      input.addEventListener('change', (event) => stageControl(control, event.target.value, context));
    } else {
      input = document.createElement('input');
      input.type = 'text';
      setControlInputValue(input, control, value, context);
      input.addEventListener('change', (event) => stageControl(control, event.target.value, context));
    }
    return input;
  }

  function stageControl(control, rawValue, context = {}) {
    const value = coerceControlValue(control, rawValue);
    runtime.stage((draft) => {
      const path = resolveTarget(control, context);
      setValueAtPath(draft, path, value);
      return draft;
    });
    const hook = CONTROL_POST_COMMIT[control.id];
    if (typeof hook === 'function') {
      hook(value, context);
    }
  }

  function coerceControlValue(control, rawValue) {
    if (!control) return rawValue;
    if (control.type === 'number') {
      let value = typeof rawValue === 'number' ? rawValue : Number(rawValue);
      if (Number.isNaN(value)) value = control.range?.min ?? 0;
      return clampControlValue(control, value);
    }
    if (control.type === 'toggle') {
      if (typeof rawValue === 'string') return rawValue === 'true';
      return Boolean(rawValue);
    }
    if (control.type === 'select') {
      return decodeControlValue(control, rawValue);
    }
    return rawValue;
  }

  function decodeControlValue(control, rawValue) {
    const options = control.range?.options;
    if (!Array.isArray(options)) return rawValue;
    for (const option of options) {
      if (typeof option === 'string' && option === rawValue) {
        return option;
      }
      if (option && typeof option === 'object') {
        if (String(option.value) === String(rawValue)) return option.value;
      }
    }
    return rawValue;
  }

  function encodeControlValue(control, value) {
    if (control.type === 'select') {
      const options = control.range?.options;
      if (Array.isArray(options)) {
        for (const option of options) {
          if (typeof option === 'string' && option === value) return option;
          if (option && typeof option === 'object' && option.value === value) {
            return String(option.value);
          }
        }
      }
      if (typeof value === 'boolean') return String(value);
      return value != null ? String(value) : '';
    }
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (value == null) return '';
    return value;
  }

  function clampControlValue(control, value) {
    if (!control?.range) return value;
    let next = value;
    if (typeof control.range.min === 'number') next = Math.max(control.range.min, next);
    if (typeof control.range.max === 'number') next = Math.min(control.range.max, next);
    return next;
  }

  function controlLabel(id) {
    return CONTROL_LABELS[id] || id;
  }

  function applyControlLabel(wrapper, control) {
    if (!wrapper || !control) return;
    let span = wrapper.querySelector('.control-label');
    if (!span) {
      span = document.createElement('span');
      span.className = 'control-label';
      if (wrapper.classList.contains('toggle')) wrapper.appendChild(span);
      else wrapper.prepend(span);
    }
    span.textContent = controlLabel(control.id);
  }

  function setControlMetadata(wrapper, input, control, context = {}) {
    if (!wrapper || !control) return;
    const template = control.target;
    const actualPath = resolveTarget(control, context);
    wrapper.setAttribute('data-control-id', control.id);
    wrapper.setAttribute('data-control-template', template);
    wrapper.setAttribute('data-control-path', actualPath);
    if (typeof context.index === 'number') wrapper.setAttribute('data-control-index', String(context.index));
    else wrapper.removeAttribute('data-control-index');
    if (!input) return;
    const id = contextualControlId(control, context);
    input.id = id;
    input.setAttribute('data-control-id', control.id);
    input.setAttribute('data-control-template', template);
    input.setAttribute('data-control-path', actualPath);
    if (typeof context.index === 'number') input.setAttribute('data-control-index', String(context.index));
    else input.removeAttribute('data-control-index');
  }

  function contextualControlId(control, context = {}) {
    const suffix = typeof context.index === 'number' ? `-${context.index}` : '';
    return `control-${control.id.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}${suffix}`;
  }

  function resolveTarget(control, context = {}) {
    if (!control?.target) return '';
    if (control.target.includes('{index}')) {
      const index = context.index;
      if (typeof index === 'number') {
        return control.target.replaceAll('{index}', String(index));
      }
    }
    return control.target;
  }

  function parsePath(path) {
    if (!path) return [];
    return path.split('.').map((segment) => {
      if (/^-?\d+$/.test(segment)) return Number(segment);
      return segment;
    });
  }

  function setValueAtPath(target, path, value) {
    const segments = parsePath(path);
    if (!segments.length) return;
    let node = target;
    for (let i = 0; i < segments.length - 1; i += 1) {
      const part = segments[i];
      const next = segments[i + 1];
      if (typeof part === 'number') {
        if (!Array.isArray(node)) return;
        if (node[part] === undefined) {
          node[part] = typeof next === 'number' ? [] : {};
        }
        node = node[part];
      } else {
        if (typeof next === 'number') {
          if (!Array.isArray(node[part])) node[part] = [];
        } else if (!node[part] || typeof node[part] !== 'object') {
          node[part] = {};
        }
        node = node[part];
      }
    }
    const last = segments[segments.length - 1];
    if (typeof last === 'number') {
      if (!Array.isArray(node)) return;
      node[last] = value;
    } else {
      node[last] = value;
    }
  }

  function getValueAtPath(source, path) {
    if (!source) return undefined;
    const segments = parsePath(path);
    let node = source;
    for (const part of segments) {
      if (node == null) return undefined;
      node = node[part];
    }
    return node;
  }

  function populateSelectOptions(select, control) {
    if (!select || control.type !== 'select') return;
    const options = control.range?.options;
    if (!Array.isArray(options)) return;
    select.innerHTML = '';
    options.forEach((entry) => {
      const option = document.createElement('option');
      if (typeof entry === 'string') {
        option.value = entry;
        option.textContent = entry;
      } else if (entry && typeof entry === 'object') {
        option.value = String(entry.value);
        option.textContent = entry.label ?? String(entry.value);
      }
      select.appendChild(option);
    });
  }

  function setControlInputValue(element, control, value, context = {}, options = {}) {
    const { allowStageFallback = true } = options;
    if (!element || !control) return;
    if (control.type === 'select') {
      const encoded = encodeControlValue(control, value);
      const options = Array.from(element.options).map((opt) => opt.value);
      if (encoded && options.includes(String(encoded))) {
        element.value = String(encoded);
      } else if (options.length) {
        element.value = options[0];
        const first = control.range?.options?.[0];
        const fallback = typeof first === 'object' ? first?.value : first;
        if (fallback !== undefined && allowStageFallback) stageControl(control, fallback, context);
      } else {
        element.value = '';
      }
    } else if (control.type === 'toggle') {
      element.checked = Boolean(value);
    } else if (control.type === 'number') {
      const numeric = clampControlValue(control, typeof value === 'number' ? value : Number(value));
      element.value = Number.isFinite(numeric) ? String(numeric) : String(control.range?.min ?? 0);
    } else if (control.type === 'color') {
      element.value = typeof value === 'string' ? value : '#000000';
    } else {
      element.value = value ?? '';
    }
  }

  function highlightConflicts(paths) {
    const flagged = document.querySelectorAll('[data-control-conflict]');
    flagged.forEach((node) => node.removeAttribute('data-control-conflict'));
    if (!paths || !paths.length) return;
    paths.forEach((path) => {
      const normalized = normalizeConflictPath(path);
      if (!normalized) return;
      const { template, index } = normalized;
      const selector = `[data-control-template="${template}"]${index !== undefined ? `[data-control-index="${index}"]` : ''}`;
      document.querySelectorAll(selector).forEach((node) => node.setAttribute('data-control-conflict', ''));
    });
  }

  function normalizeConflictPath(path) {
    if (!path) return null;
    const segments = path.split('.');
    if (segments.length < 2) {
      return { template: path, index: undefined };
    }
    const root = segments[0];
    if (root === 'slots' || root === 'ledColors' || root === 'efSlots') {
      const idx = Number(segments[1]);
      if (Number.isNaN(idx)) return null;
      segments[1] = '{index}';
      return { template: segments.join('.'), index: idx };
    }
    return { template: path, index: undefined };
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
      const context = { index };
      stageControl(TAKEOVER_CONTROL, !(slot?.takeover), context);
    };
    el.append(label, state, value, toggle);
    el.onclick = () => selectSlot(index);
    el.setAttribute('role', 'button');
    el.classList.toggle('selected', index === slotState.selected);
  }

  function renderEfRow(el, index, item) {
    el.className = 'ef-row';
    el.innerHTML = '';
    const title = document.createElement('span');
    title.className = 'ef-label';
    title.textContent = `EF ${String(index + 1).padStart(2, '0')}`;
    const field = renderControl(EF_CONTROL, { index }, slotState.staged);
    if (field) {
      const labelSpan = field.querySelector('.control-label');
      if (labelSpan) labelSpan.textContent = CONTROL_LABELS[EF_CONTROL.id];
      const input = field.querySelector('input');
      if (input) {
        input.min = String(EF_CONTROL.range.min);
        input.max = String(EF_CONTROL.range.max);
        if (typeof item?.slot === 'number') {
          input.value = String(item.slot);
        }
      }
      el.append(title, field);
    } else {
      el.appendChild(title);
    }
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
