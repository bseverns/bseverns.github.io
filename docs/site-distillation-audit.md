# Site Distillation Audit

Last updated: 2026-05-15

## Scope

This audit covers the public portfolio repository only. A separate private source directory exists outside the public repo and was used only to calibrate public-safe status language and next-proof notes. No private source files should be copied into this repo.

## Existing public structure

- `/` already frames the practice as a continuous line from photography through systems, teaching, and infrastructure.
- `/atlas/` is already the main relationship map and uses a site-native visual language built around the diagram, doorway cards, and Atlas-specific layouts.
- `/atlas/tools/`, `/atlas/scenes/`, `/atlas/learning/`, and `/atlas/systems/` exist, but they currently function more as labels than as strong reader doorways.
- `/_nodes/` already backs Atlas node pages through the `nodes` Jekyll collection and custom `atlas_node` layout.
- `/art.html`, `/courses.html`, `/press-kit.html`, and `/contact.html` are already established and should remain in place.
- `/research/privacy-ethics/` already contains a substantial public-safe ethics statement that can support a lighter boundary page rather than a full rewrite.
- `catalog/items/*.json` and `docs/site-reset/*.md` already contain strong summary language that can be reused for public-safe distillation.

## Visual and layout conventions to preserve

- Atlas pages use `_layouts/atlas_page.html` and `_layouts/atlas_node.html` with `css/atlas.css`.
- The current visual language relies on:
  - compact eyebrow labels
  - short thesis paragraphs
  - card grids for doorways and grouped links
  - restrained monochrome/surface styling with accent color carried by content blocks
  - direct, essay-like prose instead of dense metadata tables
- The homepage already preserves archive lineage and should not be displaced by a purely technical framing.

## What is already strong

- Homepage framing is coherent and already connects current systems work to the older archive.
- Several node pages already have good voice and public-safe summaries:
  - `MOARkNOBS-42`
  - `Human-Buffer`
  - `machine-docs`
  - `Syllabus`
  - `Class Hub`
  - `studio-notes`
- Public-safe ethics language already exists and does not need to be invented from scratch.
- Atlas diagram structure is already aligned with the fleet model: tools, scenes, learning, systems, and cross-project notes.

## Thin or missing areas

- Atlas pillar pages are too thin. They need featured projects, method links, status language, and reader paths.
- The shared Atlas node layout still exposes generic placeholder structure:
  - `Demo video - TODO`
  - `Photos - TODO`
  - `Build notes - TODO`
- Several priority node pages are still only one paragraph deep and need evidence-aware public structure:
  - `frZone`
  - `Horizon`
  - `live-rig`
  - `perceptual-drift`
  - `drone-chorus`
  - `Memory Engine`
  - `homeauto`
- Several system nodes still contain literal `TODO.` summaries and should remain out of scope unless needed for navigation health:
  - `docker`
  - `ART215`
  - `server`
  - `llfs`
  - `infraStack`
  - `ghPages`
  - `djangoLMS`
  - `governance`
  - `openvpn`
  - `printServer`
  - `studio1`
  - `turingpi2`
  - `piImaging`
- There is no Atlas method layer yet at `/atlas/methods/`.
- There is no lightweight public boundary page at `/privacy-ethics/`.
- `systems-atlas` and `lab-mind` are part of the desired public conceptual spine but do not yet have public-safe Atlas node pages.

## Dead links and route risks

- The core Atlas diagram appears to point only at repo-backed nodes that already exist as collection items.
- The larger risk is not missing routes but weak pages: some routes load successfully while still presenting placeholder content.
- Build-time verification is still needed for:
  - new method routes
  - new or revised node routes
  - footer links to privacy/ethics

## Public/private boundary findings

- The private source directory is outside the public repo, which is the correct placement.
- No private source directory is present inside the public repository tree.
- Sensitive-term scanning should exclude vendored libraries because strings like `password` and `token` appear there as library internals.
- Public Atlas language should stay at the level of:
  - source repos as implementation truth
  - redacted diagrams
  - public-safe screenshots
  - next proof objects
- Public Atlas language should not expose:
  - internal vault paths
  - student or participant details
  - venue-specific or home/studio topology
  - credentials, hostnames, or private network structure
- Intentional boundary-term matches such as `credentials`, `password`, or `token` should appear only in public boundary language explaining what is withheld, not as exposed operational detail.

## Recommended minimal edit set

1. Add this audit file and keep it public-safe.
2. Replace the shared Atlas node placeholder sections with an evidence/status-oriented structure that supports both strong pages and cautious stubs.
3. Add a small Atlas method layer:
   - `/atlas/methods/`
   - `/atlas/methods/evidence-before-polish/`
   - `/atlas/methods/documentation-as-interface/`
   - `/atlas/methods/assumption-ledger/`
   - `/atlas/methods/consent-forward-systems/`
4. Add a lightweight `/privacy-ethics/` boundary page that links to the fuller ethics statement and explains what remains private.
5. Strengthen all four Atlas pillar pages into real doorways with thesis copy, featured links, method links, status notes, and reader paths.
6. Rewrite the first-batch node pages around:
   - what it is
   - what it lets people do
   - what is public now
   - evidence status
   - unresolved edges
   - methods surfaced
   - source trail
   - next proof object
7. Add public-safe stubs for `systems-atlas` and `lab-mind`, and revise `homeauto` as a redacted method/system page.
8. Run a local build if dependencies permit, then run a public/private boundary grep and document the results.

## Distillation guidance used for this pass

- Prefer controlled statuses such as `prototype`, `study`, `working prototype`, `public-safe excerpt`, and `needs proof`.
- Treat source repos as the live implementation truth.
- Use private evidence notes only to determine public-safe claim strength and next proof objects.
- Preserve older artwork lineage as active context rather than replacing it with a recent-projects-only systems frame.
