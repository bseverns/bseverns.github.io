(function () {
  function injectStyles() {
    if (document.getElementById('archive-banner-style')) {
      return;
    }
    const style = document.createElement('style');
    style.id = 'archive-banner-style';
    style.textContent = '.archive-banner{position:relative;z-index:999;background:#111827;color:#f9fafb;padding:0.6rem 1rem;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:0.95rem;letter-spacing:0.02em;} .archive-banner a{color:#facc15;text-decoration:underline;font-weight:600;} .archive-banner a:focus-visible{outline:3px solid #f97316;outline-offset:2px;}';
    document.head.appendChild(style);
  }

  function insertBanner() {
    if (document.querySelector('.archive-banner')) {
      return;
    }
    injectStyles();
    const banner = document.createElement('div');
    banner.className = 'archive-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Archive notice');

    const message = document.createElement('span');
    message.textContent = 'Archived. ';

    const link = document.createElement('a');
    link.href = '/';
    link.textContent = 'New work → home';
    link.setAttribute('aria-label', 'New work, return to the homepage');

    banner.appendChild(message);
    banner.appendChild(link);

    const body = document.body;
    if (body.firstChild) {
      body.insertBefore(banner, body.firstChild);
    } else {
      body.appendChild(banner);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertBanner);
  } else {
    insertBanner();
  }
})();
