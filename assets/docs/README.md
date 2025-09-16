# Sampler PDF stash

The PDF in this directory is the print-friendly mirror of the Critical Digital Studies sampler. It is
built from `_data/cds.yml` so the file stays honest when the page changes. Keeping the binary checked in
lets future students audit the receipts—no phantom pedagogy.

## Regenerate the PDF (a tiny ritual)
1. Install the one-off dependencies (they're light):
   ```bash
   pip install reportlab cairosvg pillow pyyaml
   ```
2. From the repo root, run the generator:
   ```bash
   python tools/build_sampler_pdf.py
   ```
3. Sanity check the hidden page while you're here:
   ```bash
   python tools/lint_sampler.py
   ```

The generator pulls each card, drops in its hero image, and spits out a 7-page PDF with Outcomes and
Teach-with-this blocks intact. If anything explodes, fix the data instead of the PDF by hand. Future you
will thank present you with snacks.
