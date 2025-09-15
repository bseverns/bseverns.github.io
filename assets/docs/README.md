# PDF stash

This folder exists solely to host the sampler PDF without fattening the repo.
Right now it ships a one-page "coming soon" file so builds don't choke.

## Swap-in ritual
1. Render your real sampler PDF.
2. Overwrite `Severns_CriticalDigitalStudies_Sampler.pdf`.
3. Run `python tools/lint_sampler.py` to make sure the linter is still happy.

Keeping this directory under version control lets future students audit change over time—no ghost docs.
