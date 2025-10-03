---
title: "Creative Coding 101"
level: "Undergrad"
delivery: "Lab"
hero: /assets/images/cds/spectacle-mediafast.jpg
hero_alt: "Students annotating the Spectacle / Media Fast assignment board with neon tape during a critique huddle"
summary: "First steps into generative sketching backed by documentation rituals and critique drills."
why: "Start from zero to sketch systems with code."
outcomes:
  - "Write tiny sketches in Processing/p5.js"
  - "Swap sketches and iterate"
  - "Document code for others"
starter_arc:
  - "Hello world pixels"
  - "Input → output chain"
  - "Peer critique"
assessment: "Process notebook + final sketch"
access: "Open-source tools; alt-text on visuals"
artifacts: ["Syllabus snippet", "Starter code"]
updated: "2025-08-20"
featured: true
---

## Course vibe
This lab is a zero-to-one ramp for students who want to sketch with pixels, sound, and motion while keeping one foot in critical media literacy. We wire intent to technique: every mini-lesson swings between code walkthroughs, documentation rituals, and peer critiques that keep experimentation accountable.

## Studio arc (12-week sample)
| Week | Focus | Repo artifacts we raid |
| --- | --- | --- |
| 1–2 | Pixel arrays + input/output chain | [`MEDIA2-codeEXPLAINERS`](https://github.com/bseverns/Syllabus/tree/main/MCADMedia2/MEDIA2-codeEXPLAINERS) — `animate2`, `animation`, and `snake` sketches scaffold conditionals, loops, and DOM hooks before students remix them live. |
| 3–4 | Glitch as systems literacy | [`glitchProcessing`](https://github.com/bseverns/glitchProcessing) — `ChannelShiftGlitch` for channel swapping, `noise_glitch` for `get()`/`copy()` collage drills, and `video_glitch` / `webcam_glitch` for motion pipelines. |
| 5–6 | Audio-reactive geometry | [`GlitchListener`](https://github.com/bseverns/GlitchListener) — lab notebooks map feature extraction to visuals; pairs with the Processing Minim tutorials inside the repo. |
| 7–8 | Networked sketch swaps | [`Syllabus`](https://github.com/bseverns/Syllabus/tree/main/MCADMedia2) briefs for peer handoffs; learners document “what changed, why, and what to test next” following the shared policies. |
| 9–10 | Story-driven systems | Pull briefs from [`MCADMedia1`](https://github.com/bseverns/Syllabus/tree/main/MCADMedia1) to push narrative into the sketchbook. |
| 11–12 | Capstone jam | Students either harden a favorite sketch or port it to performance (OBS, projection, or embedded display). Documentation becomes the artifact. |

## How we run the room
- **Daily warm-up:** 10-minute “code karaoke” where one student live-narrates a repo sketch (often `MEDIA2-codeEXPLAINERS/animation` or `flexibleParents`) while the cohort annotates intent, inputs, and outputs.
- **Live coding blocks:** Instructor demos from `glitchProcessing`, toggling parameters while the projector shows the README snippets that explain the glitch logic. Students fork immediately and push remixes to a shared GitHub Classroom.
- **Crit stacks:** Peers rotate through roles (reader, tester, documentarian) and leave issues/PR comments instead of compliments. Everyone cites line numbers or commits.
- **Documentation sweeps:** Every Friday is a README clinic. Learners update their repo landing pages to read like a studio notebook: intent, setup, what broke, and how to remix.

## Sample assignments
1. **Pixel Habit Loop** — Clone `animate2` and `snake`, record every experiment in a `process.md` with screenshots, and publish the GitHub Classroom link for critique.
2. **Glitch Triptych** — Use `ChannelShiftGlitch`, `noise_glitch`, and `Transform_SlitScan` from `glitchProcessing` to produce three outputs that share one dataset. Annotate how each algorithm transforms the source image and include failure notes.
3. **Video Pipeline Autopsy** — Start from `MEDIA2-codeEXPLAINERS/video` and remix it into a webcam-based performance. Document the event chain (input → buffer → transform → output) and add toggles for peers to test.
4. **Peer Remix Relay** — Swap sketches at midterm. Each student forks a peer’s repo, adds a new feature (input mode, modulation, or documentation upgrade), and submits a PR with annotated commits.

## Assessment signals
- Process notebook (weekly commits, README updates, screenshots, and annotated bugs)
- Peer feedback logs (issues/PRs showing how they supported each other’s builds)
- Final performance/demo (5-minute show-and-tell with code walkthrough and failure postmortem)
- Self-critique (connect their work to accessibility, consent, or authorship standards borrowed from `Syllabus/shared/policies`)

## Accessibility + infrastructure
- All repo README files must land with alt text, keyboard shortcuts listed in plain text, and a `SETUP.md` for classmates using screen readers or alternative input devices.
- The class GitHub organization keeps Issues templates for `Bug`, `Idea`, and `Documentation` so students learn to log things transparently.
- Labs run on open-source tooling: Processing, p5.js web editor, VS Code + Live Server, or Glitch. Loaner laptops come preloaded with the Processing sketchbook that mirrors the teaching repos.

## Remix prompts
- Port `noise_glitch` or `ChannelShiftGlitch` to p5.js and log the differences in APIs, build pipeline, and performance.
- Swap the audio feature extractor in `GlitchListener` for a hand-rolled FFT and compare results in a zine (two pages minimum, printed or PDF).
- Collab with Media Studies: use the `Skyway Dérive / Media Fast` prompts from the Syllabus repo as the conceptual brief, then respond with a generative sketch instead of a written essay.

## Links to raid
- `MEDIA2-codeEXPLAINERS` (p5.js demos): <https://github.com/bseverns/Syllabus/tree/main/MCADMedia2/MEDIA2-codeEXPLAINERS>
- Glitch Processing Study Hall: <https://github.com/bseverns/glitchProcessing>
- SonicSketches starter pack: <https://github.com/bseverns/SonicSketches>
- Syllabus shared policies: <https://github.com/bseverns/Syllabus/tree/main/shared/policies>
- GitHub Classroom template (internal): ask for access — we rotate invites each semester.
