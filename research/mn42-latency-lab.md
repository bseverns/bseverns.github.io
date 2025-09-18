---
title: "MN42 — Latency Characterization Lab"
layout: default
permalink: /research/mn42-latency-lab/
tags: ["methods","mn42","measurement","latency"]
---

# MN42 — Latency Characterization Lab

Latency is a feeling long before it is a number; I measure so users/students can reason about mappings, not mythologize them.

## Method (replicable)
- **Loopback rig:** Teensy 4.1 MN42 board → USB MIDI trigger → MOTU M4 audio interface running 48 kHz, wired direct out→in with 1 ft TRS patch cables. The full wiring + DAW routing flow is spelled out in the [oblique RTL notebook](https://github.com/bseverns/MOARkNOBS-42/blob/main/docs/bench/latency/oblique_rtl.md).
- **Buffer sizes & sample rates:** Baseline captures printed at 48 kHz with 256-sample I/O buffers; tuned captures drop to 64-sample buffers after driver cleanup. DAW mix buffers are fixed at 512 samples so we can compare total buffer multiples.
- **Trial counts & stats:** Minimum five runs per configuration; the analyzer reports per-take latency, mean/median/p95, and the implied buffer multiples. More runs are always welcome when we take the rig on tour.
- **Scripts + assets:** Measurements crunch through [`tools/rtl_latency_report.py`](https://github.com/bseverns/MOARkNOBS-42/blob/main/tools/rtl_latency_report.py). Raw WAV captures and JSON summaries will live beside the method notes in [`docs/bench/latency/`](https://github.com/bseverns/MOARkNOBS-42/tree/main/docs/bench/latency/) so the plots here can build straight from versioned data.

## Results (snapshot)
![Round-trip latency plots — baseline vs tuned](/assets/images/mn42-latency-baseline.png "Round-trip latency plots — baseline vs tuned")
*Alt:* Round-trip latency plots showing baseline and tuned configurations.

**Draft in progress:** the analyzer is already spitting out per-run CSV/JSON, but the production plot + annotated table need a pass before I lock them in. If you need numbers today, clone the repo and run the command in the method doc—it will print the same stats that will show up here.

### Interpretation
- **Coming soon:** expect callouts on how the tuned buffer should drop round-trip from the mid-teens (ms) into single digits, plus a glance at return amplitude so we can talk about gain staging. Until then, the method notebook includes interpretive notes for reviewers who want to peek behind the curtain once the board in manufactured and in hand.

## Notes for class
- **Prompts:** Map a control to a synth parameter, record the felt latency, then verify the number via the script so we can argue about perception vs. measurement over email.
- **Pitfalls:** Don’t forget to reset USB hubs and note driver versions in your log—mystery jitter usually comes from those two.
- **Follow-ups:** After the RTL run, swap to the ADC noise script in `docs/bench/noise/` to see how firmware tweaks shift both responsiveness and floor noise.
- **Student machines:** Use Reaper or Audacity with loopback routing, drop the WAVs into the repo folder, and run the `rtl_latency_report.py` command exactly as published. Yes, you can do it on Windows—just make sure Python 3.10+ is installed and the repo path is short enough to dodge shell quoting hell.
