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

    normalizeSvgSizing(svg);

    const nodeMap = mapNodes(svg);
    annotateNodeContrast(nodeMap);

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

  function normalizeSvgSizing(svg) {
    const width = Number.parseFloat(svg.getAttribute('width'));
    const height = Number.parseFloat(svg.getAttribute('height'));

    if (!svg.hasAttribute('viewBox') && Number.isFinite(width) && Number.isFinite(height)) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
  }

  function annotateNodeContrast(nodeMap) {
    nodeMap.forEach((node) => {
      const fill = getNodeFill(node);
      if (fill && isDarkColor(fill)) {
        node.classList.add('atlas-node-dark');
      }
    });
  }

  function getNodeFill(node) {
    const shape = node.querySelector('.basic.label-container, rect, polygon, path, ellipse, circle');
    if (!shape) {
      return null;
    }

    const computedFill = window.getComputedStyle(shape).fill;
    if (computedFill && computedFill !== 'none') {
      return computedFill;
    }

    return shape.getAttribute('fill');
  }

  function isDarkColor(value) {
    const rgb = parseColor(value);
    if (!rgb) {
      return false;
    }

    const [r, g, b] = rgb.map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });

    const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    return luminance < 0.35;
  }

  function parseColor(value) {
    const color = String(value || '').trim();
    if (!color || color === 'none' || color === 'transparent') {
      return null;
    }

    if (color.startsWith('#')) {
      let hex = color.slice(1);
      if (hex.length === 3 || hex.length === 4) {
        hex = hex
          .slice(0, 3)
          .split('')
          .map((part) => part + part)
          .join('');
      } else if (hex.length >= 6) {
        hex = hex.slice(0, 6);
      }

      if (hex.length !== 6) {
        return null;
      }

      return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16)
      ];
    }

    const rgbMatch = color.match(/^rgba?\(([^)]+)\)$/i);
    if (!rgbMatch) {
      return null;
    }

    const channels = rgbMatch[1]
      .split(',')
      .slice(0, 3)
      .map((part) => Number.parseFloat(part.trim()));

    if (channels.length !== 3 || channels.some((channel) => Number.isNaN(channel))) {
      return null;
    }

    return channels;
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
