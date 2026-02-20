# bseverns.github.io

This repo now runs like a stripped-down landing pad for Ben Severns: three pillars (Tools / Scenes / Learning), a press kit with living copy, and a tiny JS layer that only does conditional image checks. Think studio notebook meets teaching guide—every file is here to explain itself.

## Portfolio diagram
<div align="center" style="max-width:800px; overflow-x:auto;">
## Portfolio diagram

```mermaid
%% Diagram: bseverns.github.io README — Narrative + Index Overlay
%% Diagram-Version: 2026-02-20
%% Target: GitHub Mermaid (flowchart)
%% Notes:
%% - Concepts/Non-projects are intentionally editable without re-threading lineage.
%% - Keep lineage edges solid. Keep index edges dotted.
%% - If rendering fails, remove the init line first and retry.

%%{ init: { "flowchart": { "rankSpacing": 30, "nodeSpacing": 10 } } }%%
flowchart TD
  thesis["Empower people to build with agency using open tools,<br/>consent-forward scenes,<br/>and learning environments — documented loudly."]

  thesis --> toolsPillar["Tools"]
  thesis --> scenesPillar["Scenes"]
  thesis --> learningPillar["Learning Environments"]
  thesis --> infraPillar["Systems & Distribution"]

  %% =========================================================
  %% NARRATIVE (lineage / causality — your tall chains)
  %% =========================================================
  subgraph NARRATIVE["Narrative (lineage / causality)"]
    direction TB

    %% TOOLS (one tall chain)
    toolsPillar --> toolsAudio["Tools: sound + patch worlds"]
    toolsAudio --> tmsLib["tms-lib"] --> seedBox["seedBox"] --> Horizon["Horizon"] --> DustPress["DustPress"] --> lofiSampler["lofi-sampler"] --> PdRepo["Pd"] --> VCVpatch["VCV_patch"]
    VCVpatch --> toolsControl["Tools: control + hardware"]
    toolsControl --> MOARkNOBS42["MOARkNOBS-42"] --> MN42Configurator["MN42 configurator"] --> arduinoSketches["arduinoSketches"] --> microGranny2["microGranny2"] --> x0xb0x["x0xb0x"]
    x0xb0x --> toolsAnalysis["Tools: analysis + triggers + DSP"]
    toolsAnalysis --> frZone["frZone_core"] --> teensyDSP["Teensy DSP fx unit"]

    %% SCENES (one tall chain)
    scenesPillar --> scenesWorks["Scenes: works + studies"]
    scenesWorks --> perceptualDrift["perceptual-drift"] --> pointyClumps["pointy-clumps"] --> droneChorus["drone-chorus"] --> roomLens["roomLens"] --> StringFieldNode["StringField"] --> DiceLoopNode["DiceLoop"] --> hallwayReactor["hallway-reactor"] --> ArduinoSculpture["ArduinoSculpture_MCAD"] --> HumanBuffer["Human-Buffer"]
    HumanBuffer --> scenesStage["Scenes: stage interop stack"]
    scenesStage --> liveRig["live-rig"] --> liveRigCtrl["live-rig-control"] --> interstream["interstream"] --> maelstrom["maelstrom"] --> scVideoMixer["SC Video Mixer"] --> clipFoundry["new_wrld (clip foundry)"] --> deskCam["desk camera feed"]

    %% LEARNING (one tall chain)
    learningPillar --> learnCurricula["Learning: createMPLS curricula"]
    learnCurricula --> cMCurricula["cM_curricula"] --> scratch["Scratch (12w)"] --> printing["3D print/CAD (4)"] --> lego["LEGO Spike/BricQ"] --> piper["Piper/RPi"] --> dronesEd["Drones curriculum"] --> privacyMedia["Privacy media course"]
    privacyMedia --> learnFactory["Learning: course factory + templates"]
    learnFactory --> SyllabusRepo["Syllabus"] --> ART215["ART215_SP22"]
    ART215 --> learnDocs["Learning: docs + public site"]
    learnDocs --> repairStudio["repair-studio"] --> machineDocs["machine-docs"] --> personalSite["bseverns.github.io"]
    personalSite --> learnOps["Learning: teacher workflow"]
    learnOps --> teacherOps["make → deploy → assess"]

    %% SYSTEMS (one tall chain + governance hubs)
    infraPillar --> infraLMS["Systems: classroom doorways"]
    infraLMS --> tailoredu["TailorEDU"] --> tailoreduRepo["Tailoredu repo"] --> djangoLMS["LMS redesign (Django)"] --> classhub["selfhosted-classhub"] --> infraStack["Infra stack (PG/Redis/MinIO/Caddy)"]
    infraStack --> infraFleet["Systems: deployment + device fleet"]
    infraFleet --> piImaging["Pi imaging kit"] --> docker["Docker/compose"] --> server["Ubuntu server"] --> openvpn["OpenVPN"]
    openvpn --> infraArchive["Systems: indexing + publishing"]
    infraArchive --> llfs["LlamaFS"] --> studio1["Studio1"] --> ghPages["GitHub Pages"]
    ghPages --> infraLab["Systems: studio infrastructure"]
    infraLab --> homeauto["homeauto"] --> turingpi2["Turing Pi 2"] --> printServer["Repetier-Server node"]
    printServer --> infraGov["Systems: governance + ethics"]
    infraGov --> governance["AGENTS + checklists + consent notes"]

    governance --> agencyHub["Agency / Authorship / Feedback Loops"] --> opennessHub["Open Documentation & Consent-Forward Ethos"] --> resilienceHub["Field Reliability / Safety / Care"]

    %% Cross-links (kept high-level so columns stay vertical)
    toolsControl -. "workshops" .-> learnCurricula
    toolsAnalysis -. "triggers" .-> scenesStage
    infraLMS -. "delivers" .-> learnCurricula
    infraArchive -. "publishes" .-> learnDocs
    learnCurricula -. "fieldwork feeds" .-> scenesWorks
  end

  %% =========================================================
  %% INDEX OVERLAY (cork board / retrieval — editable concepts)
  %% =========================================================
  subgraph INDEX["Index overlay (cork board / retrieval) — pin everything here"]
    direction LR

    subgraph TAGS["Tags (mostly stable buckets)"]
      direction TB
      tag_audio((audio))
      tag_patch((patch worlds))
      tag_dsp((dsp / triggers))
      tag_firmware((firmware))
      tag_hardware((hardware))
      tag_web((web))
      tag_docs((docs))
      tag_pedagogy((pedagogy))
      tag_infra((infra))
      tag_deploy((deployment))
      tag_archiving((archiving))
      tag_performance((performance))
      tag_fabrication((fabrication))
      tag_privacy((privacy / ethics))
      tag_registry((reference / registry))
    end

    subgraph CONCEPTS["Concepts & practices (allowed to change)"]
      direction TB
      c_consent(["consent-forward design"])
      c_field(["field reliability / care"])
      c_portable(["portable learning artifacts"])
      c_memory(["memory / time / degradation"])
      c_loops(["feedback loops (make→deploy→assess)"])
      c_studioSystems(["studio-systems (tools → scenes → learning)"])
      c_openDocs(["open documentation as instrument"])
    end

    subgraph NONPROJECTS["Non-project nodes (can evolve)"]
      direction TB
      np_workshops["Workshops (formats + facilitation moves)"]
      np_templates["Templates / checklists as instruments"]
      np_inventory["Kit inventory + maintenance reality"]
      np_partners["Community partners + classrooms"]
      np_routines["Weekly rhythm / planning systems"]
      np_safety["Safety, care, boundaries (field)"]
    end

    subgraph SATELLITES["Satellites (add smaller repos here without disturbing lineage)"]
      direction TB
      sat_1["(add repo)"]
      sat_2["(add repo)"]
      sat_3["(add repo)"]
      sat_4["(add repo)"]
      sat_5["(add repo)"]
    end
  end

  %% =========================================================
  %% LINKING LAYER (integration)
  %% Solid = lineage. Dotted = index pin.
  %% =========================================================

  %% Anchor tags back to pillars (so overlay “belongs”)
  toolsPillar --- tag_audio
  toolsPillar --- tag_patch
  toolsPillar --- tag_dsp
  toolsPillar --- tag_firmware
  toolsPillar --- tag_hardware

  scenesPillar --- tag_performance
  scenesPillar --- tag_memory

  learningPillar --- tag_pedagogy
  learningPillar --- tag_docs
  learningPillar --- tag_privacy

  infraPillar --- tag_infra
  infraPillar --- tag_web
  infraPillar --- tag_deploy
  infraPillar --- tag_archiving
  infraPillar --- tag_registry

  %% Bridge pins from chain headers to tags (makes the overlay feel “linked”)
  toolsAudio -.-> tag_audio
  toolsAudio -.-> tag_patch
  toolsControl -.-> tag_hardware
  toolsControl -.-> tag_firmware
  toolsAnalysis -.-> tag_dsp

  scenesWorks -.-> tag_performance
  scenesWorks -.-> tag_memory
  scenesStage -.-> tag_web
  scenesStage -.-> tag_performance

  learnCurricula -.-> tag_pedagogy
  learnFactory -.-> tag_docs
  learnDocs -.-> tag_docs
  learnOps -.-> c_loops

  infraLMS -.-> tag_web
  infraStack -.-> tag_infra
  infraFleet -.-> tag_deploy
  infraArchive -.-> tag_archiving
  infraGov -.-> tag_privacy

  %% Projects ↔ Tags (pin major nodes; add more as desired)
  tmsLib -.-> tag_audio
  tmsLib -.-> tag_docs
  seedBox -.-> tag_audio
  seedBox -.-> tag_dsp
  Horizon -.-> tag_audio
  Horizon -.-> tag_dsp
  DustPress -.-> tag_audio
  DustPress -.-> tag_dsp
  lofiSampler -.-> tag_audio
  lofiSampler -.-> tag_hardware
  PdRepo -.-> tag_patch
  VCVpatch -.-> tag_patch

  MOARkNOBS42 -.-> tag_hardware
  MOARkNOBS42 -.-> tag_firmware
  MN42Configurator -.-> tag_web
  MN42Configurator -.-> tag_docs
  arduinoSketches -.-> tag_firmware
  microGranny2 -.-> tag_hardware
  x0xb0x -.-> tag_hardware
  frZone -.-> tag_dsp
  teensyDSP -.-> tag_dsp
  teensyDSP -.-> tag_hardware
  teensyDSP -.-> tag_firmware

  perceptualDrift -.-> tag_performance
  pointyClumps -.-> tag_performance
  droneChorus -.-> tag_performance
  droneChorus -.-> tag_memory
  roomLens -.-> tag_performance
  StringFieldNode -.-> tag_performance
  DiceLoopNode -.-> tag_performance
  hallwayReactor -.-> tag_performance
  ArduinoSculpture -.-> tag_hardware
  HumanBuffer -.-> tag_memory

  liveRig -.-> tag_performance
  liveRig -.-> tag_audio
  liveRigCtrl -.-> tag_web
  interstream -.-> tag_web
  maelstrom -.-> tag_web
  scVideoMixer -.-> tag_performance
  clipFoundry -.-> tag_web
  deskCam -.-> tag_performance

  cMCurricula -.-> tag_pedagogy
  cMCurricula -.-> tag_docs
  scratch -.-> tag_pedagogy
  printing -.-> tag_fabrication
  printing -.-> tag_pedagogy
  lego -.-> tag_pedagogy
  piper -.-> tag_pedagogy
  piper -.-> tag_infra
  dronesEd -.-> tag_pedagogy
  privacyMedia -.-> tag_privacy
  SyllabusRepo -.-> tag_docs
  repairStudio -.-> tag_docs
  repairStudio -.-> tag_fabrication
  machineDocs -.-> tag_docs
  personalSite -.-> tag_docs
  personalSite -.-> tag_web
  personalSite -.-> tag_registry
  teacherOps -.-> c_loops

  tailoreduRepo -.-> tag_web
  tailoreduRepo -.-> tag_infra
  djangoLMS -.-> tag_web
  classhub -.-> tag_web
  classhub -.-> tag_infra
  classhub -.-> c_portable
  classhub -.-> c_loops
  infraStack -.-> tag_infra
  piImaging -.-> tag_deploy
  docker -.-> tag_deploy
  server -.-> tag_deploy
  openvpn -.-> tag_deploy
  llfs -.-> tag_archiving
  llfs -.-> tag_memory
  studio1 -.-> tag_archiving
  ghPages -.-> tag_web
  homeauto -.-> tag_infra
  turingpi2 -.-> tag_infra
  printServer -.-> tag_fabrication
  printServer -.-> tag_infra
  governance -.-> tag_privacy
  governance -.-> c_consent
  governance -.-> c_field
  governance -.-> c_openDocs

  %% Projects ↔ Non-projects (so the “living” layer can change safely)
  cMCurricula -.-> np_workshops
  SyllabusRepo -.-> np_templates
  repairStudio -.-> np_templates
  lego -.-> np_inventory
  printing -.-> np_inventory
  piper -.-> np_inventory
  infraFleet -.-> np_inventory
  learnCurricula -.-> np_partners
  infraLMS -.-> np_partners
  resilienceHub -.-> np_safety
  infraGov -.-> np_safety
  learnOps -.-> np_routines

  %% Non-projects ↔ Concepts (the editable “climate” around the work)
  np_workshops -.-> c_loops
  np_templates -.-> c_openDocs
  np_inventory -.-> c_field
  np_partners -.-> c_consent
  np_routines -.-> c_studioSystems
  np_safety -.-> c_field

  %% =========================================================
  %% STYLES (your originals + overlay styles)
  %% =========================================================
  classDef tools fill:#383838,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF;
  classDef scenes fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
  classDef learning fill:#BAE8FC,stroke:#6C8EBF,stroke-width:2px;
  classDef infra fill:#E7D7FF,stroke:#7C5CBF,stroke-width:2px;
  classDef hub fill:#F2F2CC,stroke:#999,stroke-width:2px,stroke-dasharray: 3 3;

  classDef tag fill:#F7F7F7,stroke:#777,stroke-width:1px;
  classDef concept fill:#FFF7E6,stroke:#AA7,stroke-width:1px;
  classDef nonproj fill:#EEF7FF,stroke:#79A,stroke-width:1px,stroke-dasharray: 4 2;
  classDef satellite fill:#FFFFFF,stroke:#BBB,stroke-width:1px,stroke-dasharray: 2 3;

  %% Apply classes (narrative)
  class thesis,toolsPillar,toolsAudio,tmsLib,seedBox,Horizon,DustPress,lofiSampler,PdRepo,VCVpatch,toolsControl,MOARkNOBS42,MN42Configurator,arduinoSketches,microGranny2,x0xb0x,toolsAnalysis,frZone,teensyDSP tools;
  class scenesPillar,scenesWorks,perceptualDrift,pointyClumps,droneChorus,roomLens,StringFieldNode,DiceLoopNode,hallwayReactor,ArduinoSculpture,HumanBuffer,scenesStage,liveRig,liveRigCtrl,interstream,maelstrom,scVideoMixer,clipFoundry,deskCam scenes;
  class learningPillar,learnCurricula,cMCurricula,scratch,printing,lego,piper,dronesEd,privacyMedia,learnFactory,SyllabusRepo,ART215,learnDocs,repairStudio,machineDocs,personalSite,learnOps,teacherOps learning;
  class infraPillar,infraLMS,tailoredu,tailoreduRepo,djangoLMS,classhub,infraStack,infraFleet,piImaging,docker,server,openvpn,infraArchive,llfs,studio1,ghPages,infraLab,homeauto,turingpi2,printServer,infraGov,governance infra;
  class agencyHub,opennessHub,resilienceHub hub;

  %% Apply classes (overlay)
  class tag_audio,tag_patch,tag_dsp,tag_firmware,tag_hardware,tag_web,tag_docs,tag_pedagogy,tag_infra,tag_deploy,tag_archiving,tag_performance,tag_fabrication,tag_privacy,tag_registry tag;
  class c_consent,c_field,c_portable,c_memory,c_loops,c_studioSystems,c_openDocs concept;
  class np_workshops,np_templates,np_inventory,np_partners,np_routines,np_safety nonproj;
  class sat_1,sat_2,sat_3,sat_4,sat_5 satellite;
```
</div>


## Stack snapshot
- **HTML**: Hand-authored pages at the project root (`index.html`, `art.html`, `courses.html`, `press-kit.html`, `contact.html`, `404.html`). No templates, no includes—what you see is what ships.
- **CSS**: One file, [`/css/site.css`](css/site.css). It handles layout, color systems (light/dark), placeholders, and focus states.
- **JS**: [`/js/site.js`](js/site.js) for conditional image rendering, asset status badges, and footer year updates. [`/js/archive-banner.js`](js/archive-banner.js) exists for legacy pages only.
- **No images baked in**: JavaScript does a `HEAD` request before inserting any `<img>`. Missing files borrow an in-repo fallback photo before dropping to an accessible placeholder block.

## Local dev (pick your flavor)
1. **Quick static preview** (no build step):
   ```bash
   npx serve .
   ```
   or any static web server (`python -m http.server`, `ruby -run -ehttpd . -p 4000`, etc.).
2. **Jekyll folks**: the repo still contains old `_projects/` content. If you need them, run `bundle exec jekyll serve` and everything—including the new flat files—will compile. The new landing doesn’t rely on Jekyll though.

## Content map
| File | Intent |
| --- | --- |
| `index.html` | Hero statement, three-pillar cards, What’s New list, archive note. Edit the list in-place (there’s a reminder comment). |
| `art.html` | Studio starter cards. Swap copy + links as projects solidify. |
| `courses.html` | Teaching starter cards with comment-callouts for pending links. |
| `press-kit.html` | Contains the 100-word and 300-word bios, quick facts, image drop points. JS turns asset paths into ✅ links if files exist. |
| `contact.html` | Email + social routes. Points media back to the press kit. |
| `404.html` | Friendly reroute to the main sections. |
| `robots.txt` & `sitemap.xml` | Pre-baked for search engines; update `lastmod` dates when you ship meaningful changes. |

## Working with images (without shipping new ones)
- Drop files at the listed paths (`/img/press/headshot.jpg`, `/img/social/og-banner.jpg`, etc.) and refresh—JS will surface them.
- If a path stays empty, the placeholder announces itself via `aria-label="… (placeholder)"` so screen readers know what’s happening.
- Want different art on a card? Update the `data-src` and `data-alt` attributes and the script does the rest.
- The loader now waits for actual image load events (instead of fragile `HEAD` checks), so you’ll either see the image, the documented fallback, or a loud placeholder—no more silent failures.

## Archiving the old site (optional but handy)
Legacy HTML still lives throughout this repo. To tack on the new archive banner + canonical link automatically:
```bash
node tools/attach-archive-banner.js
```
The script walks every `.html` file outside the new set and injects:
- `<script src="/js/archive-banner.js" defer></script>` before `</body>`
- `<link rel="canonical" href="https://bseverns.github.io/">` in `<head>` if it’s missing
It’s idempotent—run it as often as you like.

## Editing rituals
- **What’s New**: keep three bullets live; swap them as projects shift. The inline comment in `index.html` is your reminder.
- **Cards**: each card has a `data-src` and `data-alt`. Leave them empty rather than pointing at non-existent media.
- **Press kit copy**: treat it like source-of-truth text. Update bios here first; elsewhere should link back.
- **Accessibility + SEO**: titles, descriptions, JSON-LD, and Open Graph tags are all hard-coded per page. Keep descriptions under ~160 chars when you edit.

## Testing checklist
- Load pages in a browser with DevTools open—watch the network tab for `HEAD` requests only (no `GET` on missing images).
- Tab through everything to confirm focus rings stay visible.
- Run Lighthouse (desktop) and aim for 95+ across the board. The lightweight stack makes that achievable without extra tuning.

## License
Content: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Built for curiosity, remixing, and the kind of documentation that lets other people build faster.
