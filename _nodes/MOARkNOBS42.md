---
title: "MOARkNOBS-42"
permalink: /atlas/n/moarknobs42/
pillar: "Tools"
status: "prototype platform"
summary: "Teensy-based MIDI/OSC hardware-test platform with documented mappings, feedback paths, validation methods, and limited dated board-backed receipts."
repo: "https://github.com/bseverns/MOARkNOBS-42"
reading:
  title: "What this makes visible"
  body: >
    MOARkNOBS-42 is not only a box of controls. It is a way of making timing,
    mapping, feedback, and bodily decision visible enough to be played,
    taught, tested, and repaired.
  stakes: >
    The instrument matters because control is never neutral. A knob is a
    promise about what can be changed, when it can be changed, and who can
    understand the change while the room is moving.
  evidence: >
    Public source includes mapping and manifest contracts, validation tooling,
    and dated board-backed receipts for boot/configuration, Bridge
    apply/readback, and live-control round trips. Latency remains a documented
    measurement method rather than a current public performance result.
  boundary: >
    The public claim stays with behavior, method, and legibility. It does not
    ask the prototype to pretend it is already a finished product.
what_it_is: "MOARkNOBS-42 is a hardware-test research platform with 42 configurable control slots, six envelope-follower inputs, documented mappings, and limited board-backed validation. It is public as a prototype, not as a finished production controller."
lets_people_do: "It is designed for performers and learners to examine how physical controls, documented mappings, feedback paths, and measurement protocols shape authorship in a live control system."
public_now:
  - title: "Project repo"
    url: "https://github.com/bseverns/MOARkNOBS-42"
    external: true
    note: "Current source, hardware notes, validation tooling, and dated receipts with stated limits."
  - title: "MN42 project page"
    url: "/projects/mn42/"
    note: "Public site context for the controller branch."
  - title: "Latency rig diagram"
    url: "/assets/diagrams/mn42_latency-rig.svg"
    note: "Public-safe diagram of the measurement framing around the instrument."
  - title: "Latency characterization lab"
    url: "/research/mn42-latency-lab/"
    note: "Public method note; it does not itself report a current latency result."
evidence_status: "Status: hardware-test prototype. The public repository contains dated board-backed receipts and prototype-board documentation, but it does not establish fabrication readiness, full power/display validation, or a public performance capture."
next_proof: "30-second MIDI validation capture showing stable CC output, visible mode LED changes, and either a MIDI monitor or latency log in frame."
proof_objects:
  - title: "Latency rig diagram"
    status: "public"
    url: "/assets/diagrams/mn42_latency-rig.svg"
    note: "Public-safe diagram of the measurement framing around the instrument."
  - title: "Latency characterization lab"
    status: "public"
    url: "/research/mn42-latency-lab/"
    note: "Public method note; it does not itself report a current latency result."
  - title: "Board-backed HIL receipts"
    status: "public"
    url: "https://github.com/bseverns/MOARkNOBS-42/tree/main/docs/bench"
    note: "Dated boot/configuration, Bridge-session, and live-control receipts; each states its own limits."
  - title: "MIDI validation capture"
    status: "needed"
    note: "Current public proof still needs a short capture showing stable CC output and visible mode feedback."
unresolved:
  - "The current public page should not imply enclosure maturity, operator-independence, or production readiness."
  - "No public fabrication BOM or verified fabrication bundle is available; the portfolio also lacks a linked calibration path."
  - "Live-rig integration proof should stay modest until a concrete capture is linked."
methods:
  - title: "Evidence Before Polish"
    url: "/atlas/methods/evidence-before-polish/"
    note: "Bench captures and latency evidence come before enclosure polish."
  - title: "Assumption Ledger"
    url: "/atlas/methods/assumption-ledger/"
    note: "Sensor noise, VREF drift, and control claims should stay named."
  - title: "Documentation as Interface"
    url: "/atlas/methods/documentation-as-interface/"
    note: "Mappings and validation notes are part of the instrument surface."
related_projects:
  - title: "live-rig"
    url: "/atlas/n/liverig/"
    note: "Shows how the controller can move outward into a larger scene system."
  - title: "StringField"
    url: "/atlas/n/stringfieldnode/"
    note: "A neighboring embodied-interface line that pushes beyond knobs and panel logic."
  - title: "seedBox"
    url: "/atlas/n/seedbox/"
    note: "Connects the control surface to portable instrument and teaching contexts."
source_trail:
  - title: "Project repo"
    url: "https://github.com/bseverns/MOARkNOBS-42"
    external: true
    note: "Implementation truth."
  - title: "MN42 latency lab"
    url: "/research/mn42-latency-lab/"
    note: "Public measurement framing."
last_reviewed: 2026-05-15
reader_path:
  - title: "Open live-rig"
    url: "/atlas/n/liverig/"
    note: "See where the controller becomes part of a larger scene topology."
  - title: "Open frZone"
    url: "/atlas/n/frzone/"
    note: "Follow the branch from control into analysis and triggering."
  - title: "Open Horizon"
    url: "/atlas/n/horizon/"
    note: "Follow the branch from control into DSP and listening evidence."
---
