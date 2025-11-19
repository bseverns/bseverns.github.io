(function () {
  /*
   * Hey future weirdo (compliment): this file is the tiny brainstem for the site.
   * It wires up progressive image loading, asset health badges, the audio easter egg,
   * and the animated hero canvas. Every function documents both the "what" *and* the "why"
   * so the file reads like a field guide / studio notebook mashup.
   */
  const OG_IMAGE = '/img/social/og-banner.jpg';
  const FALLBACK_IMAGE = '/img/front/context.jpg';
  // The hero sketch treats this multiplier as gospel when calculating oscillations.
  // Keep it in one place so that "double the motion" or "dial it down" is a one-line change.
  const HERO_MOTION_MULTIPLIER = 2;

  /**
   * Swap any `[data-current-year]` node content for the current year.
   * Keeps the footer accurate without shipping heavy frameworks.
   */
  function setCurrentYear() {
    const year = String(new Date().getFullYear());
    const nodes = document.querySelectorAll('[data-current-year], #yr');
    nodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  /**
   * Give the skip link a focusable target so keyboard users can jump into `<main>` immediately.
   */
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

  /**
   * Probe a resource URL with a `HEAD` request, falling back to `GET` when servers reject `HEAD`.
   * Returns a boolean so UI code can render ✅ or 🕘 badges.
   */
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

  /**
   * Build a lazily-decoding `<img>` with optional sizing hints and friendly defaults.
   */
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

  /**
   * Attach one-shot load/error handlers and resolve after the image succeeds or fails.
   */
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

  /**
   * Replace a mount node's contents with a real `<img>` if the source loads, or a fallback otherwise.
   */
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

  /**
   * Decorate press-kit asset entries with their availability status.
   */
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

  /**
   * Force a static hero `<img>` when the canvas animation is disabled or unsupported.
   */
  function mountHeroImage(force) {
    const hero = document.querySelector('.hero-visual[data-hero="true"]');
    if (!hero) {
      return;
    }
    const heroSection = hero.closest('.hero');
    if (heroSection && heroSection.getAttribute('data-banner') === 'canvas' && !force) {
      return;
    }
    const src = hero.getAttribute('data-src') || OG_IMAGE;
    const alt = hero.getAttribute('data-alt') || 'Hero image';
    conditionallyRenderImage({ mount: hero, src, alt, width: hero.clientWidth || undefined, height: hero.clientHeight || undefined });
  }

  /**
   * Hydrate every non-hero `[data-src]` element with its image (or fallback) once the DOM is ready.
   */
  function mountOtherImages() {
    const mounts = document.querySelectorAll('[data-src]:not([data-hero="true"])');
    mounts.forEach(function (mount) {
      const src = mount.getAttribute('data-src');
      const alt = mount.getAttribute('data-alt') || 'Project image';
      conditionallyRenderImage({ mount, src, alt });
    });
  }

  /**
   * Check every `[data-asset-status]` entry and toggle the UI scaffolding based on availability.
   */
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

  // Cache the current hero sketch so we don't initialize multiple instances.
  let heroSketchController = null;

  /**
   * Spin up the hero canvas when `data-banner="canvas"` is present and p5 is loaded.
   * If anything is missing we gracefully fall back to the static image.
   */
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
    if (!mount) {
      return;
    }

    if (heroSketchController || mount.dataset.sketchMounted === 'true') {
      return;
    }

    if (typeof window.p5 !== 'function') {
      mountHeroImage(true);
      return;
    }

    const controller = createFlowFieldHero({ mount });
    if (controller) {
      heroSketchController = controller;
      mount.dataset.sketchMounted = 'true';
    } else {
      mountHeroImage(true);
    }
  }

  /**
   * Build the hero flow-field sketch and return a controller for external toggles (motion prefs, etc.).
   */
  function createFlowFieldHero(options) {
    const mount = options && options.mount;
    if (!mount || typeof window.p5 !== 'function') {
      return null;
    }

    const rootStyles = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
    const brandColor = rootStyles ? (rootStyles.getPropertyValue('--brand') || '#2563eb').trim() : '#2563eb';
    const accentColor = rootStyles ? (rootStyles.getPropertyValue('--accent') || '#1e66f5').trim() : '#1e66f5';
    const surfaceColor = rootStyles ? (rootStyles.getPropertyValue('--surface-muted') || rootStyles.getPropertyValue('--surface') || '#0f172a').trim() : '#0f172a';
    const focusColor = rootStyles ? (rootStyles.getPropertyValue('--accent-contrast') || '#f8fafc').trim() : '#f8fafc';
    const palette = [focusColor || '#f8fafc', brandColor || '#2563eb', accentColor || '#1e66f5', '#f472b6'];
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const controller = { instance: null };

    mount.innerHTML = '';

    const sketch = function (p) {
      const layerCount = 18;
      const segments = 320;
      const step = (Math.PI * 2) / segments;
      const scanLineSettings = {
        spawnInterval: 0.85,
        minThickness: 0.004,
        maxThickness: 0.02,
        minOpacity: 0.06,
        maxOpacity: 0.16,
        minTTL: 2.5,
        maxTTL: 5,
        minBumpStrength: 0.01,
        maxBumpStrength: 0.06,
        bumpFrequency: 1.8,
        scrollSpeed: 0.02,
      };
      let animate = !motionQuery.matches;
      let width = 0;
      let height = 0;
      let time = 0;
      const scanLines = [];
      let scanLineAccumulator = 0;

      function spawnScanLine() {
        const lifespan = p.random(scanLineSettings.minTTL, scanLineSettings.maxTTL);
        scanLines.push({
          yNorm: Math.random(),
          thickness: p.random(scanLineSettings.minThickness, scanLineSettings.maxThickness),
          bumpStrength: p.random(scanLineSettings.minBumpStrength, scanLineSettings.maxBumpStrength),
          opacity: p.random(scanLineSettings.minOpacity, scanLineSettings.maxOpacity),
          ttl: lifespan,
          lifespan,
          phase: p.random(Math.PI * 2),
        });
      }

      function updateScanLines(deltaSeconds) {
        if (!animate) {
          return;
        }
        scanLineAccumulator += deltaSeconds;
        while (scanLineAccumulator >= scanLineSettings.spawnInterval) {
          spawnScanLine();
          scanLineAccumulator -= scanLineSettings.spawnInterval;
        }
        for (let index = scanLines.length - 1; index >= 0; index -= 1) {
          const line = scanLines[index];
          line.yNorm += deltaSeconds * scanLineSettings.scrollSpeed;
          line.ttl -= deltaSeconds;
          if (line.ttl <= 0 || line.yNorm > 1.2) {
            scanLines.splice(index, 1);
          }
        }
      }

      function drawScanLines() {
        if (!scanLines.length) {
          return;
        }
        const strokeColor = p.color(focusColor || '#f8fafc');
        p.push();
        p.noFill();
        p.blendMode(p.SCREEN);
        for (let i = 0; i < scanLines.length; i += 1) {
          const line = scanLines[i];
          const wobble = Math.sin((time + line.phase) * scanLineSettings.bumpFrequency) * line.bumpStrength;
          const y = (line.yNorm + wobble) * height;
          const fade = Math.max(0, Math.min(1, line.ttl / Math.max(0.0001, line.lifespan)));
          strokeColor.setAlpha(Math.max(0, Math.min(1, line.opacity * fade)) * 255);
          p.stroke(strokeColor);
          p.strokeWeight(Math.max(1, line.thickness * height));
          p.line(0, y, width, y);
        }
        p.pop();
      }

      /**
       * Evaluate the superformula with guard rails so NaN/Infinity never leak into the vertex positions.
       */
      function superformulaRadius(phi, m, n1, n2, n3) {
        const a = 1;
        const b = 1;
        let t1 = Math.cos((m * phi) / 4) / a;
        let t2 = Math.sin((m * phi) / 4) / b;
        t1 = Math.pow(Math.abs(t1), n2);
        t2 = Math.pow(Math.abs(t2), n3);
        const sum = Math.pow(t1 + t2, 1 / Math.max(0.0001, n1));
        if (!isFinite(sum) || sum === 0) {
          return 0;
        }
        return 1 / sum;
      }

      /**
       * Wash the canvas with a translucent rectangle to create a motion trail between frames.
       */
      function fadeBackground(alpha) {
        const backgroundColor = p.color(surfaceColor || '#0f172a');
        backgroundColor.setAlpha(alpha);
        p.push();
        p.noStroke();
        p.fill(backgroundColor);
        p.rect(0, 0, width, height);
        p.pop();
      }

      /**
       * Paint a gradient overlay so the sketch inherits the site's brand colors.
       */
      function tintGradient(opacity) {
        const ctx = p.drawingContext;
        if (!ctx) {
          return;
        }
        ctx.save();
        ctx.globalAlpha = opacity;
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, brandColor || '#2563eb');
        gradient.addColorStop(0.5, accentColor || '#1e66f5');
        gradient.addColorStop(1, '#f472b6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      /**
       * Iterate across layered superformula outlines and rotate them for motion.
       * HERO_MOTION_MULTIPLIER flows through both rotation and shape modulation so the motion doubles cleanly.
       */
      function drawLayers(currentTime) {
        const baseScale = Math.min(width, height) * 0.42;
        const baseRotation = Math.sin(currentTime * 0.18) * 0.25 * HERO_MOTION_MULTIPLIER;
        let scale = baseScale;
        p.push();
        p.translate(width / 2, height / 2);
        p.noFill();
        p.strokeJoin(p.ROUND);
        p.strokeCap(p.ROUND);

        for (let layer = 0; layer < layerCount; layer += 1) {
          const layerRatio = layer / Math.max(1, layerCount - 1);
          const mm = 2 + layer * 0.35 + Math.sin(currentTime * 0.58 + layer * 0.4) * 0.9 * HERO_MOTION_MULTIPLIER;
          const nn1 = 18 + layer * 0.28 + Math.sin(currentTime * 0.42 + layer * 0.25) * 2.2 * HERO_MOTION_MULTIPLIER;
          const nn2 = 1.2 + Math.cos(currentTime * 0.36 - layer * 0.18) * 0.6 * HERO_MOTION_MULTIPLIER;
          const nn3 = 1.2 + Math.sin(currentTime * 0.33 + layer * 0.22) * 0.6 * HERO_MOTION_MULTIPLIER;
          const rotation = baseRotation + layerRatio * 0.85;
          const strokeColor = p.color(palette[layer % palette.length] || '#ffffff');
          const opacity = 0.85 - layerRatio * 0.6;
          strokeColor.setAlpha(Math.max(0, Math.min(1, opacity)) * 255);
          p.push();
          p.rotate(rotation);
          p.stroke(strokeColor);
          p.strokeWeight(1.1 + (1 - layerRatio) * 1.8);
          p.beginShape();
          for (let i = 0; i <= segments; i += 1) {
            const phi = step * i;
            const r = superformulaRadius(phi, mm, nn1, nn2, nn3);
            const x = r * Math.cos(phi) * scale;
            const y = r * Math.sin(phi) * scale;
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
          p.pop();
          scale *= 0.9;
        }

        p.pop();
      }

      /**
       * Resize the canvas when the layout changes so pixels stay sharp across breakpoints.
       */
      function resizeCanvasToMount() {
        const nextWidth = Math.max(1, mount.clientWidth || (mount.parentElement ? mount.parentElement.clientWidth : 0) || p.width || 1);
        const nextHeight = Math.max(1, mount.clientHeight || (mount.parentElement ? mount.parentElement.clientHeight : 0) || p.height || 1);
        if (nextWidth !== width || nextHeight !== height) {
          width = nextWidth;
          height = nextHeight;
          p.resizeCanvas(width, height, false);
        }
      }

      /**
       * Draw one fully opaque frame—a reset button for window resizes and reduced-motion mode.
       */
      function renderStaticFrame() {
        fadeBackground(255);
        tintGradient(0.55);
        drawLayers(time);
        drawScanLines();
      }

      // p5 lifecycle hook: run once when the sketch boots.
      p.setup = function () {
        width = Math.max(1, mount.clientWidth || 0);
        height = Math.max(1, mount.clientHeight || 0);
        controller.canvas = p.createCanvas(width || 1, height || 1);
        p.pixelDensity(Math.max(1, window.devicePixelRatio || 1));
        p.frameRate(60);
        fadeBackground(255);
        tintGradient(0.55);
        drawLayers(time);
        if (!animate) {
          p.noLoop();
        }
      };

      // p5 lifecycle hook: runs each frame unless `noLoop()` is active.
      p.draw = function () {
        if (!animate) {
          return;
        }
        resizeCanvasToMount();
        const deltaSeconds = Math.min(0.05, Math.max(0.016, (p.deltaTime || 16) / 1000));
        time += deltaSeconds;
        updateScanLines(deltaSeconds);
        fadeBackground(34);
        tintGradient(0.38);
        drawLayers(time);
        drawScanLines();
      };

      p.windowResized = function () {
        resizeCanvasToMount();
        renderStaticFrame();
      };

      // External toggle for reduced-motion listeners.
      controller.updateMotionPreference = function (shouldAnimate) {
        animate = shouldAnimate;
        if (animate) {
          time = 0;
          scanLines.length = 0;
          scanLineAccumulator = 0;
          fadeBackground(255);
          tintGradient(0.55);
          drawLayers(time);
          drawScanLines();
          p.loop();
        } else {
          scanLines.length = 0;
          scanLineAccumulator = 0;
          renderStaticFrame();
          p.noLoop();
        }
      };

      controller.renderStaticFrame = renderStaticFrame;
    };

    controller.instance = new window.p5(sketch, mount);

    // Respect `prefers-reduced-motion` toggles in real time.
    const handleMotionChange = function (event) {
      if (typeof controller.updateMotionPreference === 'function') {
        controller.updateMotionPreference(!event.matches);
      }
    };

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(handleMotionChange);
    }

    return controller;
  }

  /**
   * Wire up the "ping" button so it spits out a short randomized synth note.
   */
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

  /**
   * Kick off the whole script once the DOM is ready.
   */
  function init() {
    setCurrentYear();
    bindSkipLinkFocus();
    activateHeroBanner();
    mountHeroImage();
    mountOtherImages();
    hydrateAssetStatuses();
    attachPlayable();
  }

  // Expose helpers for older pages/tests that poke at these utilities manually.
  window.conditionallyRenderImage = conditionallyRenderImage;
  window.renderStatusBadge = renderStatusBadge;
  window.mountHeroImage = mountHeroImage;

  // Old-school DOM ready check so we fire once regardless of script location.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
