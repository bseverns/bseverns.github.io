# Diagram Strategy

These diagrams make the portfolio legible as a connected practice rather than a list of repos. They stay lightweight, hand-editable, and intentionally selective: one diagram, one organizing idea.

## Placement

- Authored source files live in `docs/visual-system/diagrams/`.
- Future exported SVG/PNG files belong in `img/diagrams/exports/`.
- Keep diagrams source-first. Only export when a page has a clear slot and size.

## Diagram Set

- `fleet-map.md`
  Purpose: homepage-level map of the four practice pillars and the six core projects.
  Suggested placement: `index.html`
- `core-project-relationships.md`
  Purpose: homepage-level companion map showing how the core projects feed one another.
  Suggested placement: `index.html` or `/atlas/`
- `memory-engine-flow.md`
  Purpose: participant-facing system flow for Memory Engine.
  Suggested placement: `art.html` or a future Memory Engine detail page
- `mn42-stack.md`
  Purpose: stack view of hardware, firmware, bridge, and documentation for MOARkNOBS-42.
  Suggested placement: `art.html`, `/atlas/`, or a future MN42 detail page
- `seedbox-triangle.md`
  Purpose: bridge diagram showing how seedBox moves between kit, simulator, and pedagogy.
  Suggested placement: `courses.html` or `/atlas/`
- `class-hub-architecture.md`
  Purpose: role and service map for Class Hub.
  Suggested placement: `courses.html`, `/atlas/`, or source-only until the Class Hub copy is fuller
- `syllabus-constellation.md`
  Purpose: curriculum/archive map for Syllabus.
  Suggested placement: `courses.html`
- `live-rig-topology.md`
  Purpose: three-lane performance topology for live-rig.
  Suggested placement: `art.html` or a future live-rig detail page

## Editing Notes

- Keep labels short enough to survive an SVG export at portfolio scale.
- Prefer `flowchart LR` or `flowchart TD` over denser graph types.
- Use dashed lines for influence, support, or stewardship links.
- If a diagram starts needing more than one main idea, split it.
