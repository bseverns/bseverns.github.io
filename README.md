# bseverns.github.io

Welcome to the stitched-together portfolio of Ben Severns. This repo runs on vanilla Jekyll with collections for studio projects (`_projects/`) and teaching bits (`_teaching/`). Everything's plain text so you can fork, remix, and learn.

## Run it

*Prereq:* Ruby + bundler (or just let GitHub Pages build it).

```bash
bundle exec jekyll serve
```

Then head to <http://localhost:4000> and click around. Too lazy? commit and push; GitHub Pages does the rest.

## Add a project or course

1. Copy a file from `_projects/` or `_teaching/`.
2. Fill the front matter: `title`, `year` (for projects), `summary`, `hero`, `hero_alt`, `featured`.
3. Drop images into `assets/images/` (keep them ≤1600px wide, add alt text).
4. `git add` + commit. Keep it weird but accessible.

## Lint it

Tiny linter warns about missing fields, alt text, and busted links.

```bash
pip install pyyaml
python tools/lint.py
```

Warnings print, errors fail. Fix stuff before shipping.

## What about the old site?

The original loose HTML pages still live alongside this refactor. Nothing lost, just more structure.

## License

Content: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

---
Built for documentation and teaching. Critique welcome.
