# Critical Digital Studies sampler assets

These slots boot with plain-text `.svg` stand-ins so the repo ships light and review-friendly.
Drop in your own visuals—stick to the same filenames so the card markup doesn't blink.

## Why placeholders?
- Keeps pull requests diffable without dragging binaries through git history.
- Lets the linter scream if a required image goes missing.

## Swapping them out
1. Export your real image at `1200×675`.
2. Overwrite the matching `.svg` file here with your asset (keep the name).
3. Commit, run `python tools/lint_sampler.py`, and roll on.

Yes, it's a little bare-bones, but that's the point—we're shipping scaffolding, not secrets.
