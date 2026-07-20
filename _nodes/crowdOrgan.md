---
layout: atlas_node
title: "Crowd Organ"
permalink: /atlas/n/crowdorgan/
pillar: Scenes
status: "repo-backed / needs room proof"
summary: "A polyphonic instrument that translates crowd position, size, motion, and gesture into OSC-controlled voices."
repo: "https://github.com/bseverns/crowd-organ"
what_it_is: "Crowd Organ treats people moving through a room as polyphonic control data. An openFrameworks host extracts voices and motion from Kinect and webcam input, sends normalized events over OSC, and leaves synthesis to the included SuperCollider patch or another listener."
lets_people_do: "It lets performers or participants shape voices through position, size, motion, and gesture while keeping sensing, routing, calibration, and synthesis as inspectable layers."
public_now:
  - title: "Project repo"
    url: "https://github.com/bseverns/crowd-organ"
    external: true
    note: "Implementation truth for the sensing, OSC, dashboard, and synthesis stack."
  - title: "Public-safe description only"
    note: "No participant imagery or raw room capture is published here."
evidence_status: "Status: repo-backed / needs room proof. The repository demonstrates implementation structure, but not a completed public installation."
next_proof: "A staged or consented 10- to 30-second room capture showing motion changing the sound without identifying participants."
boundary_note: "Camera feeds, participant images, and raw room captures stay out of the public site until a staged or explicitly consented excerpt exists."
unresolved:
  - "Validate the full host with the actual Kinect and camera rig."
  - "Capture one public-safe example of crowd-to-sound behavior."
proof_objects:
  - title: "openFrameworks host"
    status: "repo-backed"
    note: "Kinect and two-webcam sensing, voice extraction, gesture detection, and OSC routing."
  - title: "Processing dashboard"
    status: "repo-backed"
    note: "Active voices, motion grids, calibration state, and gesture telemetry."
  - title: "SuperCollider mapping"
    status: "repo-backed"
    note: "Per-voice synthesis plus gesture-controlled registration, envelopes, and effects."
  - title: "Validation tooling"
    status: "repo-backed"
    note: "Config validation, replay fixtures, and preflight checks."
source_trail:
  - title: "Project repo"
    url: "https://github.com/bseverns/crowd-organ"
    external: true
    note: "Implementation truth."
last_reviewed: 2026
reader_path:
  - title: "Open Scenes"
    url: "/atlas/scenes/"
    note: "Return to the pillar page for related room and participation systems."
---
