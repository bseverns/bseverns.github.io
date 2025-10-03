#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const HOMEPAGE_URL = 'https://bseverns.github.io/';
const CORE_PAGES = new Set([
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'art.html'),
  path.join(ROOT, 'courses.html'),
  path.join(ROOT, 'press-kit.html'),
  path.join(ROOT, 'contact.html'),
  path.join(ROOT, '404.html')
]);
const SKIP_DIRS = new Set(['.git', 'node_modules', '_site', '_build']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }
    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureCanonical(html) {
  if (/rel=["']canonical["']/i.test(html)) {
    return { html, changed: false };
  }
  const headClose = html.match(/<\/head>/i);
  if (!headClose) {
    return { html, changed: false };
  }
  const index = headClose.index;
  const insertion = `  <link rel="canonical" href="${HOMEPAGE_URL}">\n`;
  const nextHtml = html.slice(0, index) + insertion + html.slice(index);
  return { html: nextHtml, changed: true };
}

function ensureBannerScript(html) {
  if (/archive-banner\.js/i.test(html)) {
    return { html, changed: false };
  }
  const bodyClose = html.match(/<\/body>/i);
  if (!bodyClose) {
    return { html, changed: false };
  }
  const index = bodyClose.index;
  const insertion = `  <script src="/js/archive-banner.js" defer></script>\n`;
  const nextHtml = html.slice(0, index) + insertion + html.slice(index);
  return { html: nextHtml, changed: true };
}

function processFile(filePath) {
  if (CORE_PAGES.has(filePath)) {
    return;
  }
  const original = fs.readFileSync(filePath, 'utf8');
  let html = original;
  let touched = false;

  const canonicalResult = ensureCanonical(html);
  if (canonicalResult.changed) {
    html = canonicalResult.html;
    touched = true;
  }

  const scriptResult = ensureBannerScript(html);
  if (scriptResult.changed) {
    html = scriptResult.html;
    touched = true;
  }

  if (touched) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Patched ${path.relative(ROOT, filePath)}`);
  }
}

function main() {
  const targets = walk(ROOT);
  targets.forEach(processFile);
}

main();
