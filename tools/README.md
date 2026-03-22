# Tools

Lints and helper scripts live here. They're tiny by design and meant to teach more than impress.

## Local venv

For Python-based checks, use a repo-local virtual environment:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
```

## `lint_sampler.py`
Checks the hidden critical digital studies sampler page for:
- required front-matter flags (`noindex`, `sitemap: false`, and `updated`)
- at least four project cards with alt text and Methods & Ethics bullets
- no accidental links in `_data/navigation.yml`
- existence of placeholder images and the PDF sampler

Run it after editing the page or swapping assets:

```bash
python tools/lint_sampler.py
```

If it fails, the script will whine loudly and exit non-zero so CI can catch it.

## `lint.py` & `lint_hidden_page.py`
Legacy lint helpers for other parts of the site. Keep them around if they still serve you; riff on them if not.

## `lint_visual_system.py`
Checks the newer visual-system scaffolding for:
- required diagram source files
- Mermaid blocks in each source
- homepage / studio / teaching references to those sources
- fleet satellite links pointing at real atlas permalinks
- related-project links in atlas nodes pointing at real atlas permalinks

Run it after editing the fleet curation, diagrams, or atlas node relationships:

```bash
.venv/bin/python tools/lint_visual_system.py
```
