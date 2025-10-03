(function () {
  const OG_IMAGE = '/img/social/og-banner.jpg';
  const FALLBACK_IMAGE = '/img/front/context.jpg';

  function setCurrentYear() {
    const node = document.querySelector('[data-current-year]');
    if (node) {
      node.textContent = String(new Date().getFullYear());
    }
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

  async function requestHead(src) {
    if (typeof fetch !== 'function') {
      return false;
    }

    try {
      const response = await fetch(src, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
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
    const ok = await requestHead(src);

    if (ok) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = friendlyAlt;
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
      mount.appendChild(img);
    } else {
      const fallbackOk = await requestHead(FALLBACK_IMAGE);

      if (fallbackOk) {
        const fallbackImg = document.createElement('img');
        fallbackImg.src = FALLBACK_IMAGE;
        fallbackImg.alt = friendlyAlt + ' (fallback documentation image)';
        fallbackImg.decoding = 'async';
        fallbackImg.loading = 'lazy';
        if (className) {
          fallbackImg.className = className;
        }
        if (typeof width === 'number') {
          fallbackImg.width = width;
        }
        if (typeof height === 'number') {
          fallbackImg.height = height;
        }
        mount.appendChild(fallbackImg);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'ph';
        placeholder.setAttribute('role', 'img');
        placeholder.setAttribute('aria-label', friendlyAlt + ' (placeholder)');
        placeholder.textContent = 'Image placeholder';
        mount.appendChild(placeholder);
      }
    }

    mount.dataset.rendered = 'true';
  }

  async function renderStatusBadge(el, path) {
    if (!el || !path) {
      return;
    }

    const status = el.querySelector('.asset-status');
    const existingPath = el.querySelector('.asset-path');
    const ok = await requestHead(path);

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
    } else if (status) {
      status.textContent = '🕘 Not yet added';
      status.dataset.state = 'missing';
    }
  }

  function mountHeroImage() {
    const hero = document.querySelector('.hero-visual[data-hero="true"]');
    if (!hero) {
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

  function hydrateAssetStatuses() {
    const items = document.querySelectorAll('[data-asset-status]');
    items.forEach(function (item) {
      const path = item.getAttribute('data-path');
      renderStatusBadge(item, path);
    });
  }

  function init() {
    setCurrentYear();
    bindSkipLinkFocus();
    mountHeroImage();
    mountOtherImages();
    hydrateAssetStatuses();
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
