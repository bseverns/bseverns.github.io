(function () {
  const cards = document.querySelectorAll('[data-proof-repo]');
  if (!cards.length || typeof fetch !== 'function') {
    return;
  }

  const formatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  function setStatus(node, text, state) {
    if (!node) {
      return;
    }
    node.textContent = text;
    if (state) {
      node.dataset.state = state;
    }
  }

  function readCache(repo) {
    try {
      const cached = window.sessionStorage.getItem('proof-status:' + repo);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      return null;
    }
  }

  function writeCache(repo, value) {
    try {
      window.sessionStorage.setItem('proof-status:' + repo, JSON.stringify(value));
    } catch (error) {
      // Ignore storage failures; the status chip is progressive enhancement.
    }
  }

  function formatRepoStatus(data) {
    const timestamp = data && (data.pushed_at || data.updated_at);
    if (!timestamp) {
      return 'Source trail present';
    }
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return 'Source trail present';
    }
    return 'Source updated ' + formatter.format(date);
  }

  async function fetchRepo(repo) {
    const cached = readCache(repo);
    const now = Date.now();
    if (cached && cached.timestamp && now - cached.timestamp < 15 * 60 * 1000) {
      return cached.data;
    }

    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timeout = controller ? window.setTimeout(function () {
      controller.abort();
    }, 4500) : null;

    try {
      const response = await fetch('https://api.github.com/repos/' + repo, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller ? controller.signal : undefined
      });
      if (!response.ok) {
        throw new Error('GitHub status unavailable');
      }
      const data = await response.json();
      writeCache(repo, { timestamp: now, data });
      return data;
    } finally {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    }
  }

  cards.forEach(function (card) {
    const repo = card.getAttribute('data-proof-repo');
    const status = card.querySelector('[data-proof-status]');
    if (!repo || !status) {
      return;
    }

    fetchRepo(repo)
      .then(function (data) {
        setStatus(status, formatRepoStatus(data), 'live');
      })
      .catch(function () {
        setStatus(status, 'Source trail linked', 'quiet');
      });
  });
})();
