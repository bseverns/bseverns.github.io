# bseverns.github.io

A scrappy showcase of Ben Severns's art, teaching artifacts, and other noise.

## What's all this?
* `index.html` – the landing page, linking out to studio and academic portfolios.
* `art.html` – thumbnails of studio work; hover and click for more info.
* `courses.html` – syllabi and teaching material, under active construction.
* `about.html` – bio and CV.
* `contact.html` – drop a line.

## Hacking locally
No build pipeline here. Spin up a bare-bones server with `python3 -m http.server` and open a browser to `http://localhost:8000`.

## HTTPS or bust
Every external asset now rides over HTTPS. Drop in a new CDN or font? Make sure it speaks HTTPS or the browser will scream about mixed content.

## Why so many images?
Key images now carry `alt` text to make the site friendlier to screen readers. Keep that vibe if you add more work.

PRs, issues, or weird ideas welcome. Keep it noisy and accessible.

## Speed hacks
The art gallery page now loads like it's had three espressos. Images lazy-load so your browser isn't choking on megabytes it hasn't even looked at yet, and the preloader ducks out after half a second instead of staring back at you forever.
