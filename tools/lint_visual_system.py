#!/usr/bin/env python3
"""Lightweight checks for fleet data, diagram sources, and atlas node links."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DIAGRAM_DIR = ROOT / "docs" / "visual-system" / "diagrams"
NODE_DIR = ROOT / "_nodes"

REQUIRED_DIAGRAMS = {
    "fleet-map.md",
    "core-project-relationships.md",
    "memory-engine-flow.md",
    "mn42-stack.md",
    "seedbox-triangle.md",
    "class-hub-architecture.md",
    "syllabus-constellation.md",
    "live-rig-topology.md",
}

PAGE_REFERENCES = {
    "index.html": [
        "/docs/visual-system/diagrams/fleet-map.md",
        "/docs/visual-system/diagrams/core-project-relationships.md",
    ],
    "art.html": [
        "/docs/visual-system/diagrams/memory-engine-flow.md",
        "/docs/visual-system/diagrams/mn42-stack.md",
        "/docs/visual-system/diagrams/live-rig-topology.md",
    ],
    "courses.html": [
        "/docs/visual-system/diagrams/seedbox-triangle.md",
        "/docs/visual-system/diagrams/class-hub-architecture.md",
        "/docs/visual-system/diagrams/syllabus-constellation.md",
    ],
}


def main() -> int:
    failures: list[str] = []

    diagram_paths = {path.name: path for path in DIAGRAM_DIR.glob("*.md")}
    for name in sorted(REQUIRED_DIAGRAMS):
        path = diagram_paths.get(name)
        if not path or not path.is_file():
            failures.append(f"missing diagram source: docs/visual-system/diagrams/{name}")
            continue
        text = path.read_text()
        if "```mermaid" not in text:
            failures.append(f"diagram source lacks Mermaid block: {path.relative_to(ROOT)}")

    for page_name, refs in PAGE_REFERENCES.items():
        page_path = ROOT / page_name
        text = page_path.read_text()
        for ref in refs:
            if ref not in text:
                failures.append(f"{page_name} is missing diagram reference: {ref}")

    fleet_text = (ROOT / "_data" / "fleet.yml").read_text()
    urls = re.findall(r'url:\s*"([^"]+)"', fleet_text)
    for url in urls:
        if not atlas_url_exists(url):
            failures.append(f"fleet entry points to missing atlas permalink: {url}")

    for node_path in sorted(NODE_DIR.glob("*.md")):
        text = node_path.read_text()
        for related in re.findall(r'-\s*"(/atlas/n/[^"]+/)"', text):
            if not atlas_url_exists(related):
                failures.append(
                    f"{node_path.relative_to(ROOT)} references missing related atlas permalink: {related}"
                )

    if failures:
        print("visual-system lint failed:\n")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("visual-system lint passed")
    return 0


def atlas_url_exists(url: str) -> bool:
    for node_path in NODE_DIR.glob("*.md"):
        text = node_path.read_text()
        match = re.search(r'permalink:\s*("?)([^"\n]+)\1', text)
        if match and match.group(2).strip() == url:
            return True
    return False


if __name__ == "__main__":
    sys.exit(main())
