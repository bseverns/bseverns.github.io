# bseverns.github.io

A scrappy showcase of Ben Severns's art, teaching artifacts, and other noise.

## What's all this?
* `index.html` – the landing page, linking out to studio and academic portfolios.
* `art.html` – thumbnails of studio work; hover and click for more info.
* `courses.html` – syllabi and teaching material, under active construction.
* `research.html` – a bare-bones lab notebook pointing to deeper academic rabbit holes.
* `about.html` – bio and CV.
* `contact.html` – drop a line.

## Hacking locally
No build pipeline here. Spin up a bare-bones server with `python3 -m http.server` and open a browser to `http://localhost:8000` if you're feeling spicy.

##Some notes:
### Speed hacks
The art gallery page now loads like it's had three espressos. Images lazy-load so your browser isn't choking on megabytes it hasn't even looked at yet, and the preloader ducks out after half a second instead of staring back at you forever.

### UI tweaks
The nav toggle now squats unapologetically in the upper-right corner on every page, so you don't have to play hide-and-seek to find your way around.
