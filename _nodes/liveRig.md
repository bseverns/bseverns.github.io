---
title: "live-rig"
permalink: /atlas/n/liverig/
pillar: "Scenes / Systems"
status: "working prototype"
summary: "Performance system that coordinates audio, control, and video as one rig with explicit setup, recovery, and validation logic."
repo: "https://github.com/bseverns/live-rig"
reading:
  title: "What keeps the scene recoverable"
  body: >
    live-rig treats performance as a system that must survive contact with the
    room. Audio, control, and video become one scene only when setup, recovery,
    and validation are visible enough to be rehearsed.
  stakes: >
    A rig is not just what works when everything is calm. It is also the map of
    what can be checked, restarted, rerouted, and trusted when the room is
    already moving.
  evidence: >
    Runbooks, preflight notes, scene files, and validation tooling turn the rig
    from private operator memory into a shared operating surface.
  boundary: >
    The public page should stay redacted and method-facing. It can show the
    recovery logic without exposing private machines, venues, networks, or
    people.
what_it_is: "live-rig is a documented hybrid scene system for audio, video, MIDI, and OSC. It matters publicly as a field manual and operational topology, not only as a one-off performance setup."
lets_people_do: "It lets performers and maintainers coordinate media lanes, preflight a setup, and recover from failure without treating the rig as private operator folklore."
public_now:
  - title: "Project repo"
    url: "https://github.com/bseverns/live-rig"
    external: true
    note: "Current runbooks, preflight notes, scenes, and validation tooling."
  - title: "Source evidence already surfaced"
    note: "Repo docs support cautious architecture and runbook claims while the public-safe routing capture is still missing."
evidence_status: "Status: working prototype. The public repo supports field-manual and validation claims, but a public-safe routing diagram or setup capture is still needed before the page should sound more field-tested than it is."
next_proof: "Redacted routing diagram or short setup tour using generic endpoint names instead of venue-specific or private infrastructure details."
proof_objects:
  - title: "Project repo documentation"
    status: "public"
    url: "https://github.com/bseverns/live-rig"
    external: true
    note: "Runbooks, preflight notes, scenes, and validation tooling are public now."
  - title: "Public-safe routing diagram or setup tour"
    status: "needed"
    note: "Still needed before the page should imply stronger field use than the current public proof supports."
boundary_note: "This project should be shown as a documented performance method without exposing private machine names, network details, venues, or personnel."
unresolved:
  - "The page should not imply every configuration is reproducible from public material alone."
  - "A redacted visual proof object is still missing."
  - "The minimal-rig versus full-rig story is not yet surfaced clearly in public."
methods:
  - title: "Documentation as Interface"
    url: "/atlas/methods/documentation-as-interface/"
    note: "Setup, preflight, and recovery are part of the scene interface."
  - title: "Evidence Before Polish"
    url: "/atlas/methods/evidence-before-polish/"
    note: "A redacted routing proof matters more than a polished scene claim."
  - title: "Assumption Ledger"
    url: "/atlas/methods/assumption-ledger/"
    note: "Operational dependencies should stay named before they fail in public."
related_projects:
  - title: "live-rig-control"
    url: "/atlas/n/liverigctrl/"
    note: "The control-layer companion that makes the larger rig intelligible and operable."
  - title: "MOARkNOBS-42"
    url: "/atlas/n/moarknobs42/"
    note: "A flagship instrument that can feed directly into the rig’s control language."
  - title: "drone-chorus"
    url: "/atlas/n/dronechorus/"
    note: "Extends the same control and performance questions into telemetry-driven systems."
source_trail:
  - title: "Project repo"
    url: "https://github.com/bseverns/live-rig"
    external: true
    note: "Implementation truth."
last_reviewed: 2026-05-15
reader_path:
  - title: "Open live-rig-control"
    url: "/atlas/n/liverigctrl/"
    note: "See the control layer that helps operate the larger rig."
  - title: "Open MOARkNOBS-42"
    url: "/atlas/n/moarknobs42/"
    note: "See one of the controller branches that can feed into the rig."
---
