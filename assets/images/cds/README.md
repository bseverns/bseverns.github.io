# Critical Digital Studies sampler assets

The sampler leans on hand-built SVG posters instead of binary blobs so reviews stay readable and history stays slim. Each filename mirrors the eventual production art, which means you get to swap in the real documentation without touching any templates.

## Why placeholders?
- Keeps pull requests diffable without dragging binaries through git history.
- Lets the linter scream if a required image goes missing.
- Documents intent: every poster spells out what it should eventually become.

## The hero slate
- `hero.svg` replaces the old JPG fallback with a typographic grid reminding future-you to ship the real shot.
- Dimensions match the rest of the sampler cards (`1200×675`). Keep that ratio so the cards don’t warp.
- Fonts are intentionally generic system faces, so nothing fancy is required to render the preview.

## Swapping them out
1. Export your real image at `1200×675`.
2. Overwrite the matching `.svg` file here with your asset (keep the name) or rebuild the SVG with actual vector art.
3. Commit, run `python tools/lint_sampler.py`, and roll on.

Yes, it's a little bare-bones, but that's the point—this repo is half studio notebook, half teaching guide. Leave yourself notes, swap the assets when the documentation lands, and keep the git history punk but tidy.
