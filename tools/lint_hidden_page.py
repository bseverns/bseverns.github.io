#!/usr/bin/env python3
import os, sys, re, json

ROOT = os.path.dirname(os.path.abspath(__file__)) + "/.."
page = os.path.join(ROOT, "critical-digital-studies-sampler", "index.md")
issues = []

if not os.path.exists(page):
    issues.append("Page missing: critical-digital-studies-sampler/index.md")

# Check front matter flags
fm = ""
with open(page, "r", encoding="utf-8") as f:
    txt = f.read()
m = re.search(r"^---(.*?)---", txt, re.S | re.M)
if m:
    fm = m.group(1)
else:
    issues.append("No YAML front matter detected.")

def has(k, v=None):
    if not fm: return False
    if v is None:
        return re.search(rf"^{k}\s*:\s*", fm, re.M) is not None
    return re.search(rf"^{k}\s*:\s*{re.escape(str(v))}\s*$", fm, re.M) is not None

if not has("noindex", "true"):
    issues.append("Front matter should include: noindex: true")
if not has("sitemap", "false"):
    issues.append("Front matter should include: sitemap: false")

# Check that nav doesn't link it (if navigation data exists)
nav_yml = os.path.join(ROOT, "_data", "navigation.yml")
if os.path.exists(nav_yml):
    with open(nav_yml, "r", encoding="utf-8") as f:
        nav = f.read()
    if "critical-digital-studies-sampler" in nav:
        issues.append("Navigation contains a link to the hidden page; remove it from _data/navigation.yml")

# Check assets existence
# Core image assets should always be around so the gallery doesn’t ghost out.
assets = [
    "assets/images/cds/faceTimes-consent.png",
    "assets/images/cds/mn42-panel.jpg",
    "assets/images/cds/glitch-geometry-still.jpg",
    "assets/images/cds/ds200412-still.jpg",
]
for a in assets:
    if not os.path.exists(os.path.join(ROOT, a)):
        issues.append(f"Missing asset placeholder: {a}")

# The PDF bounced between two filenames as the sampler evolved. Accept either so
# the lint stays flexible while still catching a missing download link.
pdf_candidates = [
    "assets/docs/Severns_CriticalDigitalStudies.pdf",
    "assets/docs/Severns_CriticalDigitalStudies_Sampler.pdf",
]
if not any(os.path.exists(os.path.join(ROOT, p)) for p in pdf_candidates):
    issues.append(
        "Missing asset placeholder: assets/docs/Severns_CriticalDigitalStudies.pdf"
    )

if issues:
    print("\nHidden page checks: FAIL\n- " + "\n- ".join(issues))
    sys.exit(1)
else:
    print("Hidden page checks: PASS")
