# bseverns.github.io

Public site repo for Ben Severns.

The site now presents one continuous practice moving from photography and darkroom process through installation, moving image, glitch, sound, code, fabrication, teaching, privacy and consent work, machine care, and the long rebuild of a flooded house-studio. The archive stays public as lineage and accountability, not as a leftovers bin.

## What Lives Here

- Homepage, studio, teaching, about, contact, and press-kit routes
- Atlas maps and node pages for the current project ecology
- Preserved legacy archive routes in `/2d/`, `/3d/`, and `/spin/`
- A lightweight catalog spine in `/catalog/` for anchor works, collections, and themes
- Reset notes and archival framing docs in `/docs/site-reset/` and `/docs/legacy/`

## Site Shape

- Root pages: hand-authored `.html` and `.md` routes such as [index.html](index.html), [art.html](art.html), [press-kit.html](press-kit.html), and [about.md](about.md)
- Jekyll structure: [_layouts/](./_layouts), [_includes/](./_includes), [_data/](./_data), [_projects/](./_projects), and [_nodes/](./_nodes)
- Atlas: [atlas/](./atlas) for fleet mapping, scenes, learning, and systems context
- Legacy archives: [2d/](./2d), [3d/](./3d), and [spin/](./spin)
- Catalog spine: [catalog/catalog.json](catalog/catalog.json), [catalog/collections.json](catalog/collections.json), [catalog/themes.json](catalog/themes.json), and [catalog/items/](./catalog/items)
- Reset notes: [docs/site-reset/](./docs/site-reset)
- Public lineage notes source: [docs/legacy/](./docs/legacy)

## Catalog Spine

The catalog is intentionally small and boring in the right ways.

- `catalog/catalog.json` is the top-level index
- `catalog/collections.json` groups anchor works into broader historical bands
- `catalog/themes.json` tracks the controlled vocabulary used across records
- `catalog/items/*.json` holds the item-level records for anchor works and current systems

Those records are there to support lineage, filtering, and future archival sanity. They also now point toward public lineage notes where available, so the structure is not purely back-end anymore.

## Legacy and Lineage

- `/2d/` and `/3d/` preserve the older project pages as historical artifacts
- `/docs/legacy/*.md` now acts as the source for public lineage notes under `/lineage/`
- The homepage and archive indexes surface anchor works directly so older roots are readable without forcing everything into one narrative page

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

This repo builds with Jekyll and currently does not ship a `Gemfile`.

If `jekyll` is installed on your machine:

```bash
jekyll build
jekyll doctor
jekyll serve --host 127.0.0.1 --port 4001
```

If you are using the local user-gem install that already exists on this machine:

```bash
/Users/bseverns/.gem/ruby/2.6.0/bin/jekyll build
/Users/bseverns/.gem/ruby/2.6.0/bin/jekyll doctor
/Users/bseverns/.gem/ruby/2.6.0/bin/jekyll serve --host 127.0.0.1 --port 4001
```

Generated output lands in `_site/`, which is ignored by git.
