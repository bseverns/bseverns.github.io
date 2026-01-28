# bseverns.github.io

This repo now runs like a stripped-down landing pad for Ben Severns: three pillars (Tools / Scenes / Learning), a press kit with living copy, and a tiny JS layer that only does conditional image checks. Think studio notebook meets teaching guide—every file is here to explain itself.

## Portfolio diagram
<div align="center" style="max-width:800px; overflow-x:auto;">
%%{ init: { "flowchart": { "defaultRenderer": "dagre-d3", "rankSpacing": 26, "nodeSpacing": 10 } } }%%
graph TD
    thesis["Empower people to build with agency using open tools,<br>consent-forward scenes,<br>and learning environments — all documented loudly."]

    %% Vertical spine (keeps the diagram narrow)
    toolsPillar["Tools"] --> scenesPillar["Scenes"] --> learningPillar["Learning Environments"] --> infraPillar["Systems & Distribution"]

    thesis --> toolsPillar

    %% Hubs kept below so connections stay vertical
    agencyHub["Agency / Authorship / Feedback Loops"]
    opennessHub["Open Documentation & Consent-Forward Ethos"]
    resilienceHub["Field Reliability / Safety / Care"]

    infraPillar --> agencyHub --> opennessHub --> resilienceHub
    toolsPillar --> agencyHub
    scenesPillar --> agencyHub
    learningPillar --> agencyHub
    toolsPillar --> opennessHub
    scenesPillar --> opennessHub
    learningPillar --> opennessHub
    infraPillar --> opennessHub

    %% -----------------------------
    %% TOOLS (bucketed, stacked)
    %% -----------------------------
    toolsAudio["Tools: sound + patch worlds"]
    toolsControl["Tools: control surfaces + hardware"]
    toolsAnalysis["Tools: analysis + triggers + DSP"]

    toolsPillar --> toolsAudio --> toolsControl --> toolsAnalysis

    toolsAudio --> tmsLib["tms-lib"] --> seedBox["seedBox"] --> Horizon["Horizon"] --> DustPress["DustPress"] --> lofiSampler["lofi-sampler"] --> PdRepo["Pd"] --> VCVpatch["VCV_patch"]
    toolsControl --> MOARkNOBS42["MOARkNOBS-42"] --> MN42Configurator["MN42 configurator (bseverns.github.io/MN42)"] --> arduinoSketches["arduinoSketches"] --> microGranny2["microGranny2"] --> x0xb0x["x0xb0x"]
    toolsAnalysis --> frZone["frZone_core"] --> teensyDSP["Teensy DSP fx unit"]

    %% -----------------------------
    %% SCENES (bucketed, stacked)
    %% -----------------------------
    scenesWorks["Scenes: works + studies"]
    scenesStage["Scenes: stage interop stack"]

    scenesPillar --> scenesWorks --> scenesStage

    scenesWorks --> perceptualDrift["perceptual-drift"] --> pointyClumps["pointy-clumps"] --> droneChorus["drone-chorus"] --> roomLens["roomLens"] --> StringFieldNode["StringField"] --> DiceLoopNode["DiceLoop"] --> hallwayReactor["hallway-reactor"] --> ArduinoSculpture["ArduinoSculpture_MCAD"] --> HumanBuffer["Human-Buffer"]

    scenesStage --> liveRig["live-rig"] --> liveRigCtrl["live-rig-control"] --> interstream["interstream"] --> maelstrom["maelstrom"] --> scVideoMixer["SC Video Mixer"] --> clipFoundry["new_wrld (clip foundry)"] --> deskCam["desk camera feed"]

    %% -----------------------------
    %% LEARNING (bucketed, stacked)
    %% -----------------------------
    learnCurricula["Learning: createMPLS curricula"]
    learnFactory["Learning: course factory + templates"]
    learnDocs["Learning: documentation + public site"]
    learnOps["Learning: teacher workflow"]

    learningPillar --> learnCurricula --> learnFactory --> learnDocs --> learnOps

    learnCurricula --> cMCurricula["cM_curricula"] --> scratch["Scratch game design (12w)"] --> printing["3D printing/CAD (4 sessions)"] --> lego["LEGO Spike/BricQ"] --> piper["Piper/RPi creative computing"] --> dronesEd["Drones curriculum"] --> privacyMedia["Privacy-focused media course"]
    learnFactory --> SyllabusRepo["Syllabus"] --> ART215["ART215_SP22"]
    learnDocs --> repairStudio["repair-studio"] --> machineDocs["machine-docs"] --> personalSite["bseverns.github.io"]
    learnOps --> teacherOps["Teacher workflow (make → deploy → assess)"]

    %% -----------------------------
    %% SYSTEMS & DISTRIBUTION (bucketed, stacked)
    %% -----------------------------
    infraLMS["Systems: classroom doorways"]
    infraFleet["Systems: deployment + device fleet"]
    infraArchive["Systems: indexing + publishing"]
    infraLab["Systems: studio infrastructure"]
    infraGov["Systems: governance + ethics scaffolding"]

    infraPillar --> infraLMS --> infraFleet --> infraArchive --> infraLab --> infraGov

    infraLMS --> tailoredu["TailorEDU"] --> tailoreduRepo["Tailoredu repo"] --> djangoLMS["LMS redesign (Django)"] --> classhub["selfhosted-classhub"] --> infraStack["Infra stack (PG/Redis/MinIO/Caddy)"]
    infraFleet --> piImaging["Pi imaging kit"] --> docker["Docker/docker-compose"] --> server["Ubuntu server"] --> openvpn["OpenVPN"]
    infraArchive --> llfs["LlamaFS"] --> studio1["Studio1"] --> ghPages["GitHub Pages"]
    infraLab --> homeauto["homeauto"] --> turingpi2["Turing Pi 2"] --> printServer["Repetier-Server node"]
    infraGov --> governance["AGENTS.md + checklists + consent notes"]

    %% -----------------------------
    %% Minimal cross-links (kept few to preserve narrowness)
    %% -----------------------------
    MOARkNOBS42 -. "workshops" .-> cMCurricula
    frZone -. "triggers" .-> liveRigCtrl
    classhub -. "delivers" .-> cMCurricula
    llfs -. "feeds" .-> personalSite
    dronesEd -. "feeds" .-> droneChorus

    %% -----------------------------
    %% STYLES
    %% -----------------------------
    classDef tools fill:#383838,stroke:#FFFFFF,stroke-width:2px;
    classDef scenes fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef learning fill:#BAE8FC,stroke:#6C8EBF,stroke-width:2px;
    classDef infra fill:#E7D7FF,stroke:#7C5CBF,stroke-width:2px;
    classDef hub fill:#F2F2CC,stroke:#999,stroke-width:2px,stroke-dasharray: 3 3;

    class thesis tools;
    class toolsPillar,toolsAudio,toolsControl,toolsAnalysis,tmsLib,seedBox,Horizon,DustPress,lofiSampler,PdRepo,VCVpatch,MOARkNOBS42,MN42Configurator,arduinoSketches,microGranny2,x0xb0x,frZone,teensyDSP tools;
    class scenesPillar,scenesWorks,scenesStage,perceptualDrift,pointyClumps,droneChorus,roomLens,StringFieldNode,DiceLoopNode,hallwayReactor,ArduinoSculpture,HumanBuffer,liveRig,liveRigCtrl,interstream,maelstrom,scVideoMixer,clipFoundry,deskCam scenes;
    class learningPillar,learnCurricula,learnFactory,learnDocs,learnOps,cMCurricula,scratch,printing,lego,piper,dronesEd,privacyMedia,SyllabusRepo,ART215,repairStudio,machineDocs,personalSite,teacherOps learning;
    class infraPillar,infraLMS,infraFleet,infraArchive,infraLab,infraGov,tailoredu,tailoreduRepo,djangoLMS,classhub,infraStack,piImaging,docker,server,openvpn,llfs,studio1,ghPages,homeauto,turingpi2,printServer,governance infra;
    class agencyHub,opennessHub,resilienceHub hub;
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
