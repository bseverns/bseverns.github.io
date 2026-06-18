(function () {
  const mounts = document.querySelectorAll('[data-diagram-src]');
  if (!mounts.length) {
    return;
  }

  if (typeof fetch !== 'function' || !window.mermaid) {
    Array.prototype.forEach.call(mounts, function (mount) {
      const fallback = mount.getAttribute('data-diagram-fallback') || 'Diagram renderer unavailable.';
      renderPlaceholder(mount, fallback);
    });
    return;
  }

  const selector = '.diagram-render .mermaid';
  openDiagramDisclosures();

  window.mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      nodeSpacing: 48,
      rankSpacing: 58
    },
    themeVariables: {
      fontFamily: 'Instrument Sans, Inter, system-ui, sans-serif',
      fontSize: '16px',
      primaryTextColor: '#1f1a14',
      lineColor: '#7a6d5b'
    }
  });

  hydrateDiagrams()
    .then(function () {
      return window.mermaid.run({ querySelector: selector });
    })
    .then(function () {
      Array.prototype.forEach.call(mounts, function (mount) {
        normalizeRenderedSvg(mount);
      });
    })
    .catch(function () {
      // Leave the diagram placeholders in place if Mermaid initialization fails.
    });

  async function hydrateDiagrams() {
    await Promise.all(Array.prototype.map.call(mounts, async function (mount) {
      const src = mount.getAttribute('data-diagram-src');
      const fallback = mount.getAttribute('data-diagram-fallback') || 'Diagram source unavailable.';
      if (!src) {
        renderPlaceholder(mount, fallback);
        return;
      }

      try {
        const response = await fetch(src, { cache: 'no-store' });
        if (!response.ok) {
          renderPlaceholder(mount, fallback);
          return;
        }

        const text = await response.text();
        const code = extractMermaid(text);
        if (!code) {
          renderPlaceholder(mount, fallback);
          return;
        }

        mount.innerHTML = '';
        const block = document.createElement('div');
        block.className = 'mermaid';
        block.textContent = code;
        mount.appendChild(block);
        mount.dataset.diagramState = 'ready';
      } catch (error) {
        renderPlaceholder(mount, fallback);
      }
    }));
  }

  function extractMermaid(text) {
    const match = String(text).match(/```mermaid\s*([\s\S]*?)```/i);
    return match ? match[1].trim() : '';
  }

  function renderPlaceholder(mount, message) {
    mount.dataset.diagramState = 'missing';
    mount.innerHTML = '';
    const placeholder = document.createElement('div');
    placeholder.className = 'diagram-placeholder';
    placeholder.textContent = message;
    mount.appendChild(placeholder);
  }

  function openDiagramDisclosures() {
    Array.prototype.forEach.call(mounts, function (mount) {
      const disclosure = mount.closest('details.diagram-disclosure');
      if (disclosure) {
        disclosure.open = true;
      }
    });
  }

  function normalizeRenderedSvg(mount) {
    if (!mount) {
      return;
    }

    const svg = mount.querySelector('svg');
    if (!svg) {
      return;
    }

    const width = parseFloat(svg.getAttribute('width'));
    const height = parseFloat(svg.getAttribute('height'));

    if (!svg.getAttribute('viewBox') && Number.isFinite(width) && Number.isFinite(height)) {
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    }

    try {
      const box = svg.getBBox();
      if (box && Number.isFinite(box.width) && Number.isFinite(box.height) && box.width > 0 && box.height > 0) {
        const pad = 16;
        const viewWidth = box.width + pad * 2;
        const viewHeight = box.height + pad * 2;
        svg.setAttribute('viewBox', [
          box.x - pad,
          box.y - pad,
          viewWidth,
          viewHeight
        ].join(' '));
        if (viewWidth / viewHeight < 1.6) {
          svg.classList.add('diagram-svg-tall');
        }
      }
    } catch (error) {
      // Some browsers refuse getBBox on SVGs that are not fully painted yet.
    }

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
    svg.classList.add('diagram-svg');
  }
})();
