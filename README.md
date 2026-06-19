# bseverns.github.io

Public site repo for Ben Severns.

The site now presents one continuous practice moving from photography and darkroom process through installation, moving image, glitch, sound, code, fabrication, teaching, privacy and consent work, machine care, and the long rebuild of a flooded house-studio. The archive stays public as active research, lineage, and accountability, not as a leftovers bin.

## What Lives Here

- A calm homepage that works as an orbital landing map, not a full system manual
- Studio / Current Work, Learning / Teaching, Systems / Distribution, Atlas / Maps, and Archive / Research Nodes as first-class public entry pools
- Studio, teaching, about, contact, press-kit, and how-to-read routes
- Atlas maps and node pages for the current project ecology
- Active archive and research routes in `/lineage/`, `/research/`, `/2d/`, `/3d/`, and `/spin/`
- A lightweight catalog spine in `/catalog/` for anchor works, collections, themes, and research continuity
- Reset notes, lineage sources, and archival framing docs in `/docs/site-reset/` and `/docs/legacy/`

## Site Shape

- Root pages: hand-authored `.html` and `.md` routes such as [index.html](index.html), [art.html](art.html), [press-kit.html](press-kit.html), and [about.md](about.md)
- Jekyll structure: [_layouts/](./_layouts), [_includes/](./_includes), [_data/](./_data), [_projects/](./_projects), and [_nodes/](./_nodes)
- Homepage pools: Studio / Current Work, Learning / Teaching, Systems / Distribution, Atlas / Maps, and Archive / Research Nodes
- Atlas: [atlas/](./atlas) for fleet mapping, scenes, learning, systems, methods, and cross-project context
- Archive / Research Nodes: [lineage/](./lineage), [research/](./research), [2d/](./2d), [3d/](./3d), and [spin/](./spin)
- Catalog spine: [catalog/catalog.json](catalog/catalog.json), [catalog/collections.json](catalog/collections.json), [catalog/themes.json](catalog/themes.json), and [catalog/items/](./catalog/items)
- Reset notes: [docs/site-reset/](./docs/site-reset)
- Public lineage notes source: [docs/legacy/](./docs/legacy)

## Catalog Spine

The catalog is intentionally small and boring in the right ways.

- `catalog/catalog.json` is the top-level index
- `catalog/collections.json` groups anchor works into broader historical bands
- `catalog/themes.json` tracks the controlled vocabulary used across records
- `catalog/items/*.json` holds the item-level records for anchor works and current systems

Those records support lineage, filtering, and future archival sanity. They also point toward public lineage notes where available, so the structure is not purely back-end anymore. The catalog is part of the research layer that lets older work remain queryable and useful to current studio, teaching, systems, and methods work.

## Archive / Research Nodes

- `/lineage/` carries bridge notes that connect archive roots to the current practice
- `/research/` carries public method and research notes behind the work
- `/2d/` and `/3d/` preserve earlier project pages as active source material, not passive history
- `/docs/legacy/*.md` acts as the source for public lineage notes under `/lineage/`
- The homepage and archive indexes surface anchor works directly so research roots are readable without forcing everything into one narrative page

## Asset Drop Guide

If media is arriving later, these are the main folders to use:

- Press: `/img/press/`
- Social: `/img/social/`
- Studio heroes: `/img/studio/`
- Lineage image sets: `/img/lineage/night-stalker/`, `/img/lineage/i-was-young-once/`, `/img/lineage/scar/`, `/img/lineage/deadman/`, `/img/lineage/fly/`, `/img/lineage/digital-bath/`, `/img/lineage/thesis/`
- Archive overview images: `/img/archive/`
- Video excerpts: `/assets/video/`
- Audio excerpts: `/assets/audio/`
- Transcript and note sidecars: `/assets/transcripts/`

For the exact expected filenames, use [docs/site-reset/asset-drop-points.md](docs/site-reset/asset-drop-points.md).

Current high-value missing files include:

- `/img/press/studio-portrait.jpg`
- `/img/social/og-home.jpg`
- `/img/studio/mn42_hero.jpg`
- `/img/studio/human-buffer_hero.jpg`
- `/img/studio/memory-engine_hero.jpg`
- `/img/studio/classhub_hero.jpg`
- `/img/studio/machine-care_hero.jpg`
- `/img/studio/house-studio_rebuild_hero.jpg`

## Local Build

This repo builds with Jekyll through the checked-in `Gemfile`. The Gemfile currently requires Ruby 3.0 or newer and uses the `github-pages` gem group.

After installing a compatible Ruby and gems:

```bash
bundle install
bundle exec jekyll build
bundle exec jekyll doctor
bundle exec jekyll serve --host 127.0.0.1 --port 4001
```

If you are using a direct `jekyll` install instead of Bundler:

```bash
jekyll build
jekyll doctor
jekyll serve --host 127.0.0.1 --port 4001
```

Generated output lands in `_site/`, which is ignored by git.
