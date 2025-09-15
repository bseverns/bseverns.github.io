#!/usr/bin/env python3
"""Tiny linter for portfolio front matter and links."""
import os, sys, re, yaml

ROOT = os.path.dirname(os.path.dirname(__file__))

warnings = []
errors = []

def parse_front_matter(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    if text.startswith('---'):
        parts = text.split('---', 2)
        fm = yaml.safe_load(parts[1]) or {}
        body = parts[2]
        return fm, body
    return {}, text

def check_item(path, data, is_project):
    missing = []
    for field in ['title', 'summary', 'featured']:
        if field not in data:
            missing.append(field)
    if is_project and 'year' not in data:
        missing.append('year')
    if missing:
        errors.append(f"{path}: missing {', '.join(missing)}")
    if 'hero' in data:
        if not data.get('hero_alt'):
            warnings.append(f"{path}: hero_alt missing")
    elif data.get('gallery'):
        if not any(img.get('alt') for img in data['gallery']):
            warnings.append(f"{path}: gallery images missing alt text")
    else:
        errors.append(f"{path}: need hero or gallery with alt text")
    if not data.get('summary'):
        warnings.append(f"{path}: summary empty")
    if not isinstance(data.get('featured'), bool):
        warnings.append(f"{path}: featured should be true/false")

def check_links(path, body):
    link_re = re.compile(r'\[(?:[^\]]+)\]\(([^)]+)\)')
    for url in link_re.findall(body):
        if url.startswith('http'):
            continue
        full = os.path.join(ROOT, url.lstrip('/'))
        if not os.path.exists(full):
            warnings.append(f"{path}: link not found -> {url}")

for folder, is_proj in [('_projects', True), ('_teaching', False)]:
    d = os.path.join(ROOT, folder)
    if not os.path.isdir(d):
        continue
    for name in os.listdir(d):
        if not name.endswith('.md'):
            continue
        p = os.path.join(d, name)
        data, body = parse_front_matter(p)
        check_item(p, data, is_proj)
        check_links(p, body)

# Check about page docs
about = os.path.join(ROOT, 'about.md')
if os.path.exists(about):
    text = open(about, encoding='utf-8').read()
    for pdf in re.findall(r'/assets/docs/([^"\)]+)', text):
        if not os.path.exists(os.path.join(ROOT, 'assets', 'docs', pdf)):
            warnings.append(f"about.md: missing document assets/docs/{pdf}")

if errors:
    print("Errors:")
    for e in errors:
        print(" -", e)
    sys.exit(1)

if warnings:
    print("Warnings:")
    for w in warnings:
        print(" -", w)
else:
    print("All good")
