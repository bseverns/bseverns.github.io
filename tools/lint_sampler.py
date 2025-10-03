#!/usr/bin/env python3
"""Bare-bones linter to keep the sampler page ghosted and tidy.

Checks front matter flags, card structure, nav leaks, and placeholder assets.
If anything's off, we bail loud so the page never ships half-baked.
"""

import os
import re
import sys

import yaml

# Repo root relative to this script; we stay portable when run from anywhere.
ROOT = os.path.dirname(os.path.abspath(__file__)) + "/.."

# Target page we obsess over.
page = os.path.join(ROOT, "critical-digital-studies-sampler", "index.md")

# Collect sins here and screech at the end.
issues = []

# Step 1: make sure the page exists before we start nitpicking.
if not os.path.exists(page):
    print("Missing page:", page)
    sys.exit(1)

txt = open(page, "r", encoding="utf-8").read()
m = re.search(r"^---(.*?)---", txt, re.S | re.M)
if not m:
    issues.append("No YAML front matter.")
else:
    fm = m.group(1)

    # Helper to sniff out keys and their values inside the front matter.
    def has(k, v=None):
        if v is None:
            return re.search(rf"^{k}\s*:\s*", fm, re.M)
        return re.search(rf"^{k}\s*:\s*{re.escape(v)}\s*$", fm, re.M)

    # The page must shout "noindex" and bail from the sitemap.
    if not has("noindex", "true"):
        issues.append("Front matter must include: noindex: true")
    if not has("sitemap", "false"):
        issues.append("Front matter must include: sitemap: false")

    # Version stamp makes it obvious when the page was last touched.
    if not has("updated"):
        issues.append("Front matter missing: updated (YYYY-MM-DD)")

# Check that the page actually loops over the include.
if "{% include cds-card.html" not in txt:
    issues.append("Sampler page should include cds-card.html for rendering cards.")
if "site.data.cds.cards" not in txt:
    issues.append("Sampler page should reference site.data.cds.cards.")

# Load card data from YAML so we can lint the actual source of truth.
data_path = os.path.join(ROOT, "_data", "cds.yml")
if not os.path.exists(data_path):
    issues.append("Missing _data/cds.yml for sampler data.")
else:
    data = yaml.safe_load(open(data_path, "r", encoding="utf-8").read()) or {}
    cards = data.get("cards", [])
    if len(cards) < 4:
        issues.append(f"Expected ≥4 cards in data, found {len(cards)}.")
    for i, card in enumerate(cards, 1):
        if not card.get("title"):
            issues.append(f"Card {i}: missing title in data.")
        if not card.get("img_src"):
            issues.append(f"Card {i}: missing img_src in data.")
        if not card.get("img_alt"):
            issues.append(f"Card {i}: missing img_alt in data.")
        methods = card.get("methods") or []
        if len(methods) == 0:
            issues.append(f"Card {i}: methods list is empty.")
        outcomes = card.get("outcomes") or []
        if len(outcomes) == 0:
            issues.append(f"Card {i}: outcomes list is empty.")
        teach = card.get("teach") or {}
        for key in ("goal", "lab60", "assess"):
            if not teach.get(key):
                issues.append(f"Card {i}: teach.{key} missing.")
        links = card.get("links") or []
        for link in links:
            if link.get("disabled"):
                continue
            if not link.get("url") or link.get("url", "").strip() == "#":
                issues.append(f"Card {i}: link '{link.get('label', 'unknown')}' missing URL.")


# Ensure it's not in nav (if navigation data exists).
nav = os.path.join(ROOT, "_data", "navigation.yml")
if os.path.exists(nav):
    if "critical-digital-studies-sampler" in open(nav, "r", encoding="utf-8").read():
        issues.append("Hidden page is referenced in _data/navigation.yml; remove the link.")

# Check placeholder assets exist.
assets = [
    "assets/images/cds/faceTimes-consent.svg",
    "assets/images/cds/mn42-panel.svg",
    "assets/images/cds/glitch-geometry-still.svg",
    "assets/images/cds/ds200412-still.svg",
]
for a in assets:
    if not os.path.exists(os.path.join(ROOT, a)):
        issues.append(f"Missing asset: {a}")

pdf_candidates = [
    "assets/docs/Severns_CriticalDigitalStudies.pdf",
    "assets/docs/Severns_CriticalDigitalStudies_Sampler.pdf",
]
if not any(os.path.exists(os.path.join(ROOT, p)) for p in pdf_candidates):
    issues.append("Missing asset: assets/docs/Severns_CriticalDigitalStudies.pdf")

if issues:
    print("Sampler checks: FAIL\n- " + "\n- ".join(issues))
    sys.exit(1)

print("Sampler checks: PASS")
