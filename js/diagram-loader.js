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

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false
    }
  });

  hydrateDiagrams()
    .then(function () {
      return window.mermaid.run({ querySelector: selector });
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
})();
