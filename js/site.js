(function () {
  const OG_IMAGE = '/img/social/og-banner.jpg';
  const FALLBACK_IMAGE = '/img/front/context.jpg';

  function setCurrentYear() {
    const year = String(new Date().getFullYear());
    const nodes = document.querySelectorAll('[data-current-year], #yr');
    nodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  function bindSkipLinkFocus() {
    const skipLink = document.querySelector('.skip-link');
    const main = document.getElementById('main');
    if (!skipLink || !main) {
      return;
    }

    skipLink.addEventListener('click', function (event) {
      event.preventDefault();
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      if (typeof main.scrollIntoView === 'function') {
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  async function requestResource(path) {
    if (typeof fetch !== 'function') {
      return false;
    }

    try {
      const headResponse = await fetch(path, { method: 'HEAD' });
      if (headResponse.ok) {
        return true;
      }

      if (headResponse.status && headResponse.status !== 405 && headResponse.status !== 403) {
        return false;
      }
    } catch (error) {
      // Intentionally fall back to a GET check below.
    }

    try {
      const getResponse = await fetch(path, { method: 'GET', cache: 'no-store' });
      if (getResponse.ok) {
        if (getResponse.body && typeof getResponse.body.cancel === 'function') {
          getResponse.body.cancel();
        }
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  }

  function createImageElement(options) {
    const { alt, className, width, height } = options || {};
    const img = document.createElement('img');
    img.alt = alt || 'Image';
    img.decoding = 'async';
    img.loading = 'lazy';
    if (className) {
      img.className = className;
    }
    if (typeof width === 'number') {
      img.width = width;
    }
    if (typeof height === 'number') {
      img.height = height;
    }
    return img;
  }

  function loadImageElement(img, src) {
    return new Promise(function (resolve) {
      if (!img) {
        resolve(false);
        return;
      }

      const handleLoad = function () {
        cleanup();
        resolve(true);
      };

      const handleError = function () {
        cleanup();
        resolve(false);
      };

      function cleanup() {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      }

      img.addEventListener('load', handleLoad, { once: true });
      img.addEventListener('error', handleError, { once: true });
      if (src) {
        img.src = src;
      }
    });
  }

  async function conditionallyRenderImage(options) {
    const { mount, src, alt, className, width, height } = options || {};
    if (!mount || !src) {
      return;
    }

    if (mount.dataset.rendered === 'true') {
      return;
    }
    mount.innerHTML = '';
    const friendlyAlt = alt || 'Image';

    const candidate = createImageElement({ alt: friendlyAlt, className, width, height });
    const imageLoaded = await loadImageElement(candidate, src);

    if (imageLoaded) {
      mount.appendChild(candidate);
      mount.dataset.rendered = 'true';
      return;
    }

    const fallback = createImageElement({
      alt: friendlyAlt + ' (fallback documentation image)',
      className,
      width,
      height
    });

    const fallbackLoaded = await loadImageElement(fallback, FALLBACK_IMAGE);

    if (fallbackLoaded) {
      mount.appendChild(fallback);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'ph';
      placeholder.setAttribute('role', 'img');
      placeholder.setAttribute('aria-label', friendlyAlt + ' (placeholder)');
      placeholder.textContent = 'Image placeholder';
      mount.appendChild(placeholder);
    }

    mount.dataset.rendered = 'true';
  }

  async function renderStatusBadge(el, path) {
    if (!el || !path) {
      return false;
    }

    const status = el.querySelector('.asset-status');
    const existingPath = el.querySelector('.asset-path');
    const ok = await requestResource(path);

    if (ok) {
      if (existingPath) {
        const link = document.createElement('a');
        link.href = path;
        link.textContent = existingPath.textContent || path;
        link.className = 'asset-path';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        existingPath.replaceWith(link);
      }
      if (status) {
        status.textContent = '✅ Present';
        status.dataset.state = 'present';
      }
      el.dataset.state = 'present';
      return true;
    }

    if (status) {
      status.textContent = '🕘 Not yet added';
      status.dataset.state = 'missing';
    }
    el.dataset.state = 'missing';
    return false;
  }

  function mountHeroImage() {
    const hero = document.querySelector('.hero-visual[data-hero="true"]');
    if (!hero) {
      return;
    }
    const heroSection = hero.closest('.hero');
    if (heroSection && heroSection.getAttribute('data-banner') === 'canvas') {
      return;
    }
    const src = hero.getAttribute('data-src') || OG_IMAGE;
    const alt = hero.getAttribute('data-alt') || 'Hero image';
    conditionallyRenderImage({ mount: hero, src, alt, width: hero.clientWidth || undefined, height: hero.clientHeight || undefined });
  }

  function mountOtherImages() {
    const mounts = document.querySelectorAll('[data-src]:not([data-hero="true"])');
    mounts.forEach(function (mount) {
      const src = mount.getAttribute('data-src');
      const alt = mount.getAttribute('data-alt') || 'Project image';
      conditionallyRenderImage({ mount, src, alt });
    });
  }

  async function hydrateAssetStatuses() {
    const list = document.querySelector('[data-asset-list]');
    const placeholder = document.querySelector('[data-asset-placeholder]');
    const items = list ? list.querySelectorAll('[data-asset-status]') : document.querySelectorAll('[data-asset-status]');
    if (!items.length) {
      return;
    }

    if (list) {
      list.hidden = true;
    }
    if (placeholder) {
      placeholder.hidden = false;
    }

    const checks = await Promise.all(Array.prototype.map.call(items, function (item) {
      const path = item.getAttribute('data-path');
      return renderStatusBadge(item, path);
    }));

    const presentCount = checks.filter(Boolean).length;

    if (list) {
      list.hidden = presentCount === 0;
    }
    if (placeholder) {
      placeholder.hidden = presentCount !== 0;
    }
  }

  function activateHeroBanner() {
    const hero = document.querySelector('.hero');
    if (!hero) {
      return;
    }

    const mode = hero.getAttribute('data-banner') || 'css';
    if (mode !== 'canvas') {
      return;
    }

    const mount = hero.querySelector('.hero-visual');
    if (!mount || mount.querySelector('canvas')) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'flow';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.borderRadius = 'inherit';
    mount.appendChild(canvas);
    flowField(canvas);
  }

  function flowField(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    const rootStyles = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
    const brandColor = rootStyles ? (rootStyles.getPropertyValue('--brand') || '#2563eb').trim() : '#2563eb';
    const accentColor = rootStyles ? (rootStyles.getPropertyValue('--accent') || '#1e66f5').trim() : '#1e66f5';
    const surfaceColor = rootStyles ? (rootStyles.getPropertyValue('--surface-muted') || rootStyles.getPropertyValue('--surface') || '#0f172a').trim() : '#0f172a';
    const focusColor = rootStyles ? (rootStyles.getPropertyValue('--accent-contrast') || '#f8fafc').trim() : '#f8fafc';
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const layerCount = 16;
    const segments = 360;
    const step = (Math.PI * 2) / segments;
    const palette = [focusColor, brandColor, accentColor, '#f472b6'];
    let width = 0;
    let height = 0;
    let baseScale = 0;
    let frame = 0;
    let clock = 0;
    let lastTimestamp = 0;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    function resize() {
      width = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 0) || 0;
      height = canvas.clientHeight || (canvas.parentElement ? canvas.parentElement.clientHeight : 0) || 0;
      canvas.width = Math.max(1, Math.floor(width * DPR));
      canvas.height = Math.max(1, Math.floor(height * DPR));
      width = width || canvas.width / DPR;
      height = height || canvas.height / DPR;
      baseScale = Math.min(width, height) * 0.42;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      paintBackground();
    }

    function paintBackground() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = surfaceColor || '#0f172a';
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, brandColor || '#2563eb');
      gradient.addColorStop(0.5, accentColor || '#1e66f5');
      gradient.addColorStop(1, '#f472b6');
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    function superformulaRadius(phi, m, n1, n2, n3) {
      const a = 1;
      const b = 1;
      let t1 = Math.cos((m * phi) / 4) / a;
      let t2 = Math.sin((m * phi) / 4) / b;
      t1 = Math.pow(Math.abs(t1), n2);
      t2 = Math.pow(Math.abs(t2), n3);
      const sum = Math.pow(t1 + t2, 1 / n1);
      if (!isFinite(sum) || sum === 0) {
        return 0;
      }
      return 1 / sum;
    }

    // Adapted from the Visualize_Superformula Processing sketch in the dataVis repo:
    // https://github.com/bseverns/dataVis/blob/main/Visualize_Superformula/Visualize_Superformula.pde
    function renderFrame(elapsed, staticMode) {
      if (!width || !height) {
        return;
      }

      if (!staticMode) {
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = 'rgba(5, 8, 20, 0.9)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);
      const baseRotation = Math.sin(elapsed * 0.18) * 0.25;
      let scale = baseScale;

      for (let layer = 0; layer < layerCount; layer += 1) {
        const layerRatio = layer / Math.max(1, layerCount - 1);
        const mm = 2 + layer * 0.35 + Math.sin(elapsed * 0.58 + layer * 0.4) * 0.9;
        const nn1 = 18 + layer * 0.28 + Math.sin(elapsed * 0.42 + layer * 0.25) * 2.2;
        const nn2 = 1.2 + Math.cos(elapsed * 0.36 - layer * 0.18) * 0.6;
        const nn3 = 1.2 + Math.sin(elapsed * 0.33 + layer * 0.22) * 0.6;
        const rotation = baseRotation + layerRatio * 0.85;
        const color = palette[layer % palette.length];

        ctx.save();
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i <= segments; i += 1) {
          const phi = step * i;
          const r = superformulaRadius(phi, mm, nn1, nn2, nn3);
          const x = r * Math.cos(phi) * scale;
          const y = r * Math.sin(phi) * scale;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.globalAlpha = 0.85 - layerRatio * 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1 + (1 - layerRatio) * 1.8;
        ctx.stroke();
        ctx.restore();

        scale *= 0.9;
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function draw(timestamp) {
      const seconds = (timestamp || 0) / 1000;
      if (!lastTimestamp) {
        lastTimestamp = seconds;
      }
      const delta = Math.min(0.05, Math.max(0, seconds - lastTimestamp));
      lastTimestamp = seconds;
      clock += delta;
      renderFrame(clock, false);
      frame = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(frame);
      clock = 0;
      lastTimestamp = 0;
      if (!width || !height) {
        resize();
      }
      if (motionQuery.matches) {
        paintBackground();
        renderFrame(0, true);
        return;
      }
      paintBackground();
      renderFrame(0, false);
      frame = requestAnimationFrame(draw);
    }

    resize();
    start();

    const handleResize = function () {
      resize();
      start();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', start);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(start);
    }
  }

  function attachPlayable() {
    const button = document.getElementById('ping');
    if (!button) {
      return;
    }

    button.addEventListener('click', function () {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) {
        button.disabled = true;
        button.textContent = 'sound unavailable';
        return;
      }

      const context = new AudioContextConstructor();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const waveforms = ['sine', 'triangle', 'square', 'sawtooth'];
      const scale = [196, 220, 247, 262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784];
      const waveform = waveforms[Math.floor(Math.random() * waveforms.length)];
      const baseFrequency = scale[Math.floor(Math.random() * scale.length)];
      const fineDetune = (Math.random() - 0.5) * 80; // +/- 40 cents keeps it musical but lively.
      const attack = 0.01 + Math.random() * 0.05;
      const decay = 0.22 + Math.random() * 0.35;
      const sustainLevel = 0.12 + Math.random() * 0.08;

      oscillator.type = waveform;
      oscillator.frequency.value = baseFrequency;
      oscillator.detune.value = fineDetune;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();

      gain.gain.exponentialRampToValueAtTime(sustainLevel, context.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + attack + decay);

      const cleanupDelay = Math.max(attack + decay + 0.08, 0.2) * 1000;
      setTimeout(function () {
        oscillator.stop();
        context.close();
      }, cleanupDelay);
    });
  }

  function init() {
    setCurrentYear();
    bindSkipLinkFocus();
    activateHeroBanner();
    mountHeroImage();
    mountOtherImages();
    hydrateAssetStatuses();
    attachPlayable();
  }

  window.conditionallyRenderImage = conditionallyRenderImage;
  window.renderStatusBadge = renderStatusBadge;
  window.mountHeroImage = mountHeroImage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
