#!/usr/bin/env python3
"""Bare-bones linter to keep the sampler page ghosted and tidy.

Checks front matter flags, card structure, nav leaks, and placeholder assets.
If anything's off, we bail loud so the page never ships half-baked.
"""

import os, re, sys

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

# Check minimum 4 cards and required subparts.
cards = re.findall(r"<article class=\"card\">(.*?)</article>", txt, re.S)
if len(cards) < 4:
    issues.append(f"Expected ≥4 cards, found {len(cards)}.")

# Each card needs an image, alt text, title, ethics list – no exceptions.
for i, c in enumerate(cards, 1):
    if "<img " not in c:
        issues.append(f"Card {i}: missing <img>.")
    if "alt=" not in c:
        issues.append(f"Card {i}: image missing alt text.")
    if "<h3>" not in c:
        issues.append(f"Card {i}: missing <h3> title.")
    if "<h4>Methods & Ethics</h4>" not in c:
        issues.append(f"Card {i}: missing Methods & Ethics section.")
    if "<ul>" not in c:
        issues.append(f"Card {i}: missing bullet list.")

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
    "assets/docs/Severns_CriticalDigitalStudies_Sampler.pdf"
]
for a in assets:
    if not os.path.exists(os.path.join(ROOT, a)):
        issues.append(f"Missing asset: {a}")

if issues:
    print("Sampler checks: FAIL\n- " + "\n- ".join(issues))
    sys.exit(1)

print("Sampler checks: PASS")
