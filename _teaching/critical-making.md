---
title: "Critical Making — Day One"
level: "Grad/Undergrad"
delivery: "Workshop"
hero: /assets/images/cds/criticalMaking.jpg
hero_alt: "Workshop table covered in sensors and breadboards while a projection-mapped consent workflow glows overhead"
summary: "Day-one sprint where theory, consent practice, and solder fumes share the same table."
why: "Kick off with a tangle of theory and solder smoke."
outcomes:
  - "Map critical design lineage"
  - "Wire up a noisy circuit"
  - "Reflect on making as inquiry"
starter_arc:
  - "Rapid reading jam → hands-on circuit"
  - "Peer demo → remix"
  - "Critique → document"
assessment: "Setup list + reflection"
access: "Flexible seating; tool library; clear safety calls"
artifacts: ["Day-one brief", "Circuit diagram"]
updated: "2025-09-01"
featured: true
---

## Workshop tone
Critical Making Day One is a mashup of theory, solder, and consent culture. We prime the room with readings (Dunne & Raby, Ruha Benjamin, Corita Kent’s Ten Rules) and immediately drop into builds pulled from our teaching repos so participants feel the politics in their hands.

### How the room opens
- The first five minutes are **consent + care roll call**: lights, sound levels, seating tweaks, hydration reminders. I quote from the [Shared Policies preamble](https://github.com/bseverns/Syllabus/blob/main/shared/policies/README.md) so people know the social contract is alive, not boilerplate.
- Every table gets a placemat print of the workshop values (criticality, reparative play, documentation-as-witness) and a blank column to add their own.
- I keep a rolling playlist (post-rock + synth minimalism) low in the background so solder fumes feel less like a lab and more like a studio jam.

### Instructor vibe
I facilitate like a lab partner with a bullhorn full of annotations. Expect:
- **Live note-taking** on the projector. I write along with participants, linking to the exact repo files we reference so everything is reproducible.
- **“Show receipts” reflex**. I narrate why each design choice exists, credit collaborators, and call out the TODOs still in flight. Transparency is a teaching tool.
- **Gentle punk energy**. We celebrate when circuits squeal or fail—then we log an issue, mark the timestamp, and keep iterating.

### Pre-flight email (sent 48 hours out)
Participants receive:
- Tool list with loaner request form and access notes (adapted from [`shared/policies/access.md`](https://github.com/bseverns/Syllabus/blob/main/shared/policies/access.md)).
- Reading pack + optional listen-along playlist.
- Link to a “why I build” warm-up prompt so everyone arrives with one sentence about their practice.

### Documentation ritual
- I run a shared HackMD with sections already scaffolded (`Intent`, `Build log`, `Ethics checkpoints`, `Questions for Ben`).
- Polaroids + thermal printer strips get taped next to the HackMD log at the end of each block so the digital notes have an analog twin.

### Care calls
- Breaks every 55 minutes. No exceptions. Stretch, ventilate, hydrate.
- Fume extractors, masks, and ear protection are opt-out, not opt-in—they’re already on the table.
- Explicit heads-up about sensory spikes (lights dimming, motors whining) before each demo.

## Day-one itinerary (6-hour sprint)
| Time | Move | Repo anchor |
| --- | --- | --- |
| 0:00–0:20 | Welcome + “Why build at all?” dialogue | [Syllabus shared policies](https://github.com/bseverns/Syllabus/tree/main/shared/policies) for community agreements |
| 0:20–1:10 | **Consent-forward vision demo** — run Face → Slug | [`Human-Buffer`](https://github.com/bseverns/Human-Buffer) README + Ethics zine |
| 1:10–1:30 | Reflection circle + ledger mapping | `Human-Buffer/docs/assumption-ledger.md` |
| 1:30–2:30 | **Circuit riot lab** — solder + prototype noise makers | [`ArduinoSculpture_MCAD`](https://github.com/bseverns/ArduinoSculpture_MCAD) unit kits |
| 2:30–3:15 | Lunch + “documentation is an artifact” zine jam | Pull quotes from `ArduinoSculpture_MCAD/unit5/README.md` + `build_kits.py` workflow |
| 3:15–4:15 | **Embodied interface teardown** — map agency in MOARkNOBS-42 | [`MOARkNOBS-42`](https://github.com/bseverns/MOARkNOBS-42) docs & button map |
| 4:15–5:15 | **Systems rehearsal** — MotorLightSound state machine | [`MotorLightSound`](https://github.com/bseverns/MotorLightSound) firmware walkthrough |
| 5:15–6:00 | Pop-up critique + action pledges | Everyone logs issues/PRs or writes reflection cards |

## Demo rigs & repo pulls
- **Face → Slug (Privacy-First)** — Use the Processing + Arduino workflow to show detection-only pipelines, opt-in capture, and the assumption ledger habit. The README doubles as a facilitator script, covering logistics, standards alignment, troubleshooting, and serial protocol diagrams so the group can interrogate every decision.
- **Arduino Sculpture kits** — Run `python build_kits.py` from `ArduinoSculpture_MCAD` to generate clean `Unit-Kit.zip` bundles. Participants inspect the generated `sketches/`, `libraries/`, and `docs/Unit-Guide.pdf` to see how automation supports equitable access.
- **MOARkNOBS-42 interface audit** — Crack open the `ButtonManager` table and the ethics section in the README. Learners trace agency, latency logs, and accessibility design to question who the instrument serves.
- **MotorLightSound game loop** — The README’s hardware diagram and state machine renderings become conversation starters about cooperative multitasking, documentation clarity, and how embedded systems embed politics.

## Facilitation tactics
- Start each build with a **values checkpoint**: name who benefits, who’s left out, and how the repo’s policies address that gap.
- Use **documentation karaoke** — participants read repo excerpts aloud (assumption ledgers, testing rituals, README quick starts) so the ethos sticks alongside the code.
- Encourage **issue-filing as critique**. Every team logs at least one issue in the appropriate repo, framing observations as actionable prompts rather than passive notes.
- Close each block with a **“what broke?” round**. Failure stories become the blueprint for next steps.
- Keep a **“bench feedback” loop** with my lab assistant: while I’m roving, they log patterns, accessibility pings, and ideas for re-teaching so we can pivot in real time.
- End the day with a **mutual aid swap**—participants list skills, gear, or readings they can lend before the longer-form studio kicks in.

## Assessment & artifacts
- **Setup ledger** — teams capture their wiring diagrams, software versions, and consent signage in a shared markdown doc.
- **Reflection memo** — 300–500 words tying their prototype to at least one standard (science, arts, CS) and citing the repo docs they leaned on.
- **Issue or PR** — evidence of engagement with open-source workflow (bug report, documentation patch, or feature proposal).

## Safety, access, & care
- Tool library includes loaner soldering irons, fume extractors, magnifiers, and anti-fatigue mats. Breaks are enforced.
- All demo stations post safety cards plus QR links to repo READMEs so participants can review on their own devices.
- Sensory considerations: offer ear protection during noise demos, caption demo videos, and keep lighting adjustable.
- We only capture photos/video after an explicit opt-in; otherwise documentation stays text-based.

## Remix + follow-up ideas
- Extend the workshop into a 3-week studio where teams fork `Human-Buffer` to design alternative input devices (foot pedals, gaze, gesture) and update the assumption ledger accordingly.
- Pair `MOARkNOBS-42` with `MotorLightSound` to explore telepresence or distributed control — map the ethics of remote agency.
- Invite community partners to test the prototypes and record oral histories (with consent) to weave qualitative data into the repo documentation.
- Spin up a **documentation after-party** 48 hours later: a remote session where we close issues, merge light PRs, and publish reflection snippets to the course site so accountability doesn’t fade.

## Link stash
- Human-Buffer teaching build: <https://github.com/bseverns/Human-Buffer>
- Arduino Sculpture course repo: <https://github.com/bseverns/ArduinoSculpture_MCAD>
- MOARkNOBS-42 instrument lab: <https://github.com/bseverns/MOARkNOBS-42>
- MotorLightSound teaching lab: <https://github.com/bseverns/MotorLightSound>
- Syllabus shared policies + critique scaffolds: <https://github.com/bseverns/Syllabus/tree/main/shared/policies>
