# bseverns.github.io

This repo now runs like a stripped-down landing pad for Ben Severns: three pillars (Tools / Scenes / Learning), a press kit with living copy, and a tiny JS layer that only does conditional image checks. Think studio notebook meets teaching guide—every file is here to explain itself.

## Portfolio diagram
<div align="center" style="max-width:800px; overflow-x:auto;">
    
```mermaid
%%{ init: { "flowchart": { "defaultRenderer": "dagre-d3", "rankSpacing": 30, "nodeSpacing": 12 } } }%%
graph TD
    thesis["Empower people to build with agency using open tools,<br>consent-forward scenes,<br>and learning environments — all documented loudly."]

    toolsPillar["Tools"]
    scenesPillar["Scenes"]
    learningPillar["Learning Environments"]
    agencyHub["Agency / Authorship / Feedback Loops"]
    opennessHub["Open Documentation & Consent-Forward Ethos"]

    thesis --> toolsPillar
    thesis --> scenesPillar
    thesis --> learningPillar

    toolsPillar --> scenesPillar
    scenesPillar --> learningPillar
    learningPillar --> toolsPillar

    toolsPillar -. "informs design literacy" .-> learningPillar
    learningPillar -. "develops pedagogy" .-> scenesPillar
    scenesPillar -. "provides embodied context" .-> toolsPillar

    toolsPillar --> agencyHub
    scenesPillar --> agencyHub
    learningPillar --> agencyHub
    thesis --> opennessHub
    toolsPillar --> opennessHub
    scenesPillar --> opennessHub
    learningPillar --> opennessHub

    subgraph Toolset
      direction TB
      tmsLib["tms-lib"]
      seedBox["seedBox"]
      Horizon["Horizon"]
      DustPress["DustPress"]
      lofiSampler["lofi-sampler"]
      MOARkNOBS42["MOARkNOBS-42"]
      PdRepo["Pd"]
      VCVpatch["VCV_patch"]
      arduinoSketches["arduinoSketches"]
      microGranny2["microGranny2"]
      toolsPillar --> tmsLib --> seedBox --> Horizon --> DustPress --> lofiSampler --> MOARkNOBS42 --> PdRepo --> VCVpatch --> arduinoSketches --> microGranny2
    end

    subgraph Scenes
      direction TB
      perceptualDrift["perceptual-drift"]
      pointyClumps["pointy-clumps"]
      droneChorus["drone-chorus"]
      roomLens["roomLens"]
      StringFieldNode["StringField"]
      DiceLoopNode["DiceLoop"]
      hallwayReactor["hallway-reactor"]
      ArduinoSculpture["ArduinoSculpture_MCAD"]
      HumanBuffer["Human-Buffer"]
      scenesPillar --> perceptualDrift --> pointyClumps --> droneChorus --> roomLens --> StringFieldNode --> DiceLoopNode --> hallwayReactor --> ArduinoSculpture --> HumanBuffer
    end

    subgraph Learning
      direction TB
      SyllabusRepo["Syllabus"]
      ART215["ART215_SP22"]
      repairStudio["repair-studio"]
      machineDocs["machine-docs"]
      personalSite["bseverns.github.io"]
      learningPillar --> SyllabusRepo --> ART215 --> repairStudio --> machineDocs --> personalSite
    end

    MOARkNOBS42 -. "used in workshops" .-> learningPillar
    ArduinoSculpture -. "exhibited as learning prototype" .-> learningPillar
    SyllabusRepo -. "informs" .-> ART215
    repairStudio -. "inspired" .-> machineDocs
    tmsLib -. "extends" .-> seedBox

    classDef tools fill:#FFEBCC,stroke:#B57614,stroke-width:2px;
    classDef scenes fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef learning fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px;
    classDef hub fill:#FFF2CC,stroke:#999,stroke-width:2px,stroke-dasharray: 3 3;

    class thesis,toolsPillar,tmsLib,seedBox,lofiSampler,MOARkNOBS42,PdRepo,VCVpatch,arduinoSketches,microGranny2 tools;
    class scenesPillar,perceptualDrift,pointyClumps,droneChorus,roomLens,StringFieldNode,DiceLoopNode,hallwayReactor,ArduinoSculpture,HumanBuffer scenes;
    class learningPillar,SyllabusRepo,ART215,repairStudio,machineDocs,personalSite learning;
    class agencyHub,opennessHub hub;
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
