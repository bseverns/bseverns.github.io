# bseverns.github.io

This repo now runs like a stripped-down landing pad for Ben Severns: three pillars (Tools / Scenes / Learning), a press kit with living copy, and a tiny JS layer that only does conditional image checks. Think studio notebook meets teaching guide—every file is here to explain itself.

## Portfolio diagram
<div align="center" style="max-width:800px; overflow-x:auto;">
## Portfolio diagram

## Systems topology
```mermaid
%% bseverns.github.io — Portfolio map (SPINE)
%% Diagram-Version: 2026-02-20.spine.v1
%% Intent: legible overview; completeness lives in cork-boards below
%% If render issues: delete the init line first.

%%{ init: { "flowchart": { "rankSpacing": 22, "nodeSpacing": 18 } } }%%
flowchart TD
  thesis["Empower people to build with agency using open tools,<br/>consent-forward scenes,<br/>and learning environments — documented loudly."]

  thesis --> Tools["Tools"]
  thesis --> Scenes["Scenes"]
  thesis --> Learning["Learning Environments"]
  thesis --> Systems["Systems & Distribution"]

  %% Tools (collapsed bundles; full lists in cork-board)
  Tools --> T1["Sound + patch worlds<br/>tms-lib → seedBox → Horizon → DustPress → lofi-sampler → Pd → VCV_patch"]
  Tools --> T2["Control + hardware<br/>MOARkNOBS-42 → MN42 configurator → arduinoSketches → microGranny2 → x0xb0x"]
  Tools --> T3["Analysis + triggers + DSP<br/>frZone_core → Teensy DSP fx unit"]

  %% Scenes
  Scenes --> S1["Works + studies<br/>perceptual-drift → pointy-clumps → drone-chorus → roomLens → StringField → DiceLoop → hallway-reactor → ArduinoSculpture_MCAD → Human-Buffer"]
  Scenes --> S2["Stage interop stack<br/>live-rig → live-rig-control → interstream → maelstrom → SC Video Mixer → new_wrld (clip foundry) → desk camera feed"]

  %% Learning
  Learning --> L1["createMPLS curricula<br/>cM_curricula → Scratch (12w) → 3D print/CAD (4) → LEGO Spike/BricQ → Piper/RPi → Drones curriculum → Privacy media course"]
  Learning --> L2["Course factory + templates<br/>Syllabus → ART215_SP22"]
  Learning --> L3["Docs + public site<br/>repair-studio → machine-docs → bseverns.github.io"]
  Learning --> L4["Teacher workflow<br/>make → deploy → assess"]

  %% Systems
  Systems --> Y1["Classroom doorways<br/>TailorEDU → Tailoredu repo → LMS redesign (Django) → selfhosted-classhub → Infra stack (PG/Redis/MinIO/Caddy)"]
  Systems --> Y2["Deployment + device fleet<br/>Pi imaging kit → Docker/compose → Ubuntu server → OpenVPN"]
  Systems --> Y3["Indexing + publishing<br/>LlamaFS → Studio1 → GitHub Pages"]
  Systems --> Y4["Studio infrastructure<br/>homeauto → Turing Pi 2 → Repetier-Server node"]
  Systems --> Y5["Governance + ethics<br/>AGENTS + checklists + consent notes"]

  Y5 --> H1["Agency / Authorship / Feedback Loops"] --> H2["Open Documentation & Consent-Forward Ethos"] --> H3["Field Reliability / Safety / Care"]

  %% Only the few cross-links that matter at “spine resolution”
  T2 -. "workshops" .-> L1
  T3 -. "triggers" .-> S2
  Y1 -. "delivers" .-> L1
  Y3 -. "publishes" .-> L3
  L1 -. "fieldwork feeds" .-> S1
```
## Tools
```mermaid
%% bseverns.github.io — Cork board (TOOLS)
%% Diagram-Version: 2026-02-20.tools-index.v1
flowchart LR
  subgraph AUDIO["audio + patch worlds"]
    direction TB
    tms["tms-lib"]
    seed["seedBox"]
    hor["Horizon"]
    dust["DustPress"]
    lofi["lofi-sampler"]
    pd["Pd"]
    vcv["VCV_patch"]
  end

  subgraph CONTROL["control + hardware"]
    direction TB
    moar["MOARkNOBS-42"]
    cfg["MN42 configurator"]
    ard["arduinoSketches"]
    micro["microGranny2"]
    x0x["x0xb0x"]
  end

  subgraph DSP["analysis + triggers + DSP"]
    direction TB
    fr["frZone_core"]
    teensy["Teensy DSP fx unit"]
  end
```

## Scenes
```mermaid
%% bseverns.github.io — Cork board (SCENES)
%% Diagram-Version: 2026-02-20.scenes-index.v1
flowchart LR
  subgraph WORKS["works + studies"]
    direction TB
    pd["perceptual-drift"]
    pc["pointy-clumps"]
    dc["drone-chorus"]
    rl["roomLens"]
    sf["StringField"]
    dl["DiceLoop"]
    hr["hallway-reactor"]
    asc["ArduinoSculpture_MCAD"]
    hb["Human-Buffer"]
  end

  subgraph STAGE["stage interop stack"]
    direction TB
    rig["live-rig"]
    rigc["live-rig-control"]
    inter["interstream"]
    mael["maelstrom"]
    scvm["SC Video Mixer"]
    nw["new_wrld (clip foundry)"]
    cam["desk camera feed"]
  end
```

## Learning
```mermaid
%% bseverns.github.io — Cork board (LEARNING)
%% Diagram-Version: 2026-02-20.learning-index.v1
flowchart LR
  subgraph CURR["createMPLS curricula"]
    direction TB
    cm["cM_curricula"]
    scratch["Scratch (12w)"]
    print["3D print/CAD (4)"]
    lego["LEGO Spike/BricQ"]
    piper["Piper/RPi"]
    drones["Drones curriculum"]
    priv["Privacy media course"]
  end

  subgraph FACTORY["course factory + templates"]
    direction TB
    syl["Syllabus"]
    art215["ART215_SP22"]
  end

  subgraph DOCS["docs + public site"]
    direction TB
    repair["repair-studio"]
    mach["machine-docs"]
    site["bseverns.github.io"]
  end

  subgraph OPS["teacher workflow"]
    direction TB
    ops["make → deploy → assess"]
  end
```

## Systems
```mermaid
%% bseverns.github.io — Cork board (SYSTEMS)
%% Diagram-Version: 2026-02-20.systems-index.v1
flowchart LR
  subgraph LMS["classroom doorways"]
    direction TB
    te["TailorEDU"]
    ter["Tailoredu repo"]
    dj["LMS redesign (Django)"]
    ch["selfhosted-classhub"]
    stack["Infra stack (PG/Redis/MinIO/Caddy)"]
  end

  subgraph DEPLOY["deployment + device fleet"]
    direction TB
    pi["Pi imaging kit"]
    dc["Docker/compose"]
    srv["Ubuntu server"]
    vpn["OpenVPN"]
  end

  subgraph ARCH["indexing + publishing"]
    direction TB
    llfs["LlamaFS"]
    st1["Studio1"]
    ghp["GitHub Pages"]
  end

  subgraph LAB["studio infrastructure"]
    direction TB
    ha["homeauto"]
    tp["Turing Pi 2"]
    ps["Repetier-Server node"]
  end

  subgraph GOV["governance + ethics"]
    direction TB
    gov["AGENTS + checklists + consent notes"]
    hub1["Agency / Authorship / Feedback Loops"]
    hub2["Open Documentation & Consent-Forward Ethos"]
    hub3["Field Reliability / Safety / Care"]
    gov --> hub1 --> hub2 --> hub3
  end
```

## Living things that aren't neatly packed as much as the others

```mermaid
%% bseverns.github.io — Concepts climate (NON-PROJECTS)
%% Diagram-Version: 2026-02-20.concepts.v1
flowchart TD
  subgraph Concepts["Concepts (can change)"]
    direction TB
    consent["consent-forward design"]
    care["field reliability / care"]
    loops["feedback loops (make→deploy→assess)"]
    memory["memory / time / degradation"]
    registry["reference & registry thinking"]
  end

  subgraph Practices["Practices (operational realities)"]
    direction TB
    workshops["Workshops (formats + facilitation moves)"]
    templates["Templates / checklists as instruments"]
    inventory["Kit inventory + maintenance reality"]
    partners["Community partners + classrooms"]
    rhythm["Weekly rhythm / planning systems"]
    safety["Safety, care, boundaries (field)"]
  end

  workshops --> loops
  templates --> registry
  inventory --> care
  partners --> consent
  rhythm --> loops
  safety --> care
  memory --> registry
```

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
