(() => {
  const mermaidContainer = document.querySelector('.atlas-diagram .mermaid');
  if (!mermaidContainer) {
    return;
  }

  if (!window.mermaid) {
    return;
  }

  const source = mermaidContainer.textContent;
  const adjacency = buildAdjacency(source);

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false
    }
  });

  window.mermaid.run({ querySelector: '.mermaid' }).then(() => {
    const svg = mermaidContainer.querySelector('svg');
    if (!svg) {
      return;
    }

    const nodeMap = mapNodes(svg);

    nodeMap.forEach((node, nodeId) => {
      node.setAttribute('data-node-id', nodeId);
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'link');
      node.setAttribute('aria-label', `Open ${nodeId} node`);
      node.addEventListener('mouseenter', () => setActive(svg, nodeMap, adjacency, nodeId));
      node.addEventListener('mouseleave', () => clearActive(svg, nodeMap));
      node.addEventListener('focus', () => setActive(svg, nodeMap, adjacency, nodeId));
      node.addEventListener('blur', () => clearActive(svg, nodeMap));
      node.addEventListener('click', () => navigateToNode(nodeId));
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigateToNode(nodeId);
        }
      });
    });
  });

  function buildAdjacency(text) {
    const adjacencyMap = {};
    const lines = text.split('\n');

    const addLink = (from, to) => {
      if (!from || !to) {
        return;
      }
      if (!adjacencyMap[from]) {
        adjacencyMap[from] = new Set();
      }
      if (!adjacencyMap[to]) {
        adjacencyMap[to] = new Set();
      }
      adjacencyMap[from].add(to);
      adjacencyMap[to].add(from);
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        return;
      }
      if (line.startsWith('%%') || line.startsWith('graph') || line.startsWith('classDef') || line.startsWith('class ')) {
        return;
      }
      if (!line.includes('-->') && !line.includes('.->')) {
        return;
      }

      let normalized = line;
      normalized = normalized.replace(/-\.\s*\"[^\"]*\"\s*\.->/g, '-->');
      normalized = normalized.replace(/\.->/g, '-->');

      const segments = normalized.split('-->').map((segment) => segment.trim()).filter(Boolean);
      if (segments.length < 2) {
        return;
      }

      const ids = segments.map((segment) => extractNodeId(segment)).filter(Boolean);
      for (let i = 0; i < ids.length - 1; i += 1) {
        addLink(ids[i], ids[i + 1]);
      }
    });

    return adjacencyMap;
  }

  function extractNodeId(segment) {
    const match = segment.match(/^([A-Za-z0-9_]+)/);
    return match ? match[1] : null;
  }

  function mapNodes(svg) {
    const nodes = new Map();
    svg.querySelectorAll('g.node').forEach((node) => {
      const title = node.querySelector('title');
      const rawTitle = title ? title.textContent.trim() : '';
      const rawId = node.id ? node.id.replace(/^flowchart-/, '').replace(/-\d+$/, '') : '';
      const nodeId = rawId || rawTitle;
      if (nodeId) {
        nodes.set(nodeId, node);
      }
    });
    return nodes;
  }

  function setActive(svg, nodeMap, adjacencyMap, nodeId) {
    const neighbors = adjacencyMap[nodeId] ? Array.from(adjacencyMap[nodeId]) : [];
    const activeSet = new Set([nodeId, ...neighbors]);

    svg.classList.add('atlas-has-hover');
    nodeMap.forEach((node, id) => {
      if (activeSet.has(id)) {
        node.classList.add('atlas-node-active');
      } else {
        node.classList.remove('atlas-node-active');
      }
    });
  }

  function clearActive(svg, nodeMap) {
    svg.classList.remove('atlas-has-hover');
    nodeMap.forEach((node) => node.classList.remove('atlas-node-active'));
  }

  function navigateToNode(nodeId) {
    const slug = slugify(nodeId);
    const target = `/atlas/n/${encodeURIComponent(slug)}/`;
    window.location.href = target;
  }

  function slugify(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
})();
