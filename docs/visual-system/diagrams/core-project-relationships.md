# Core Project Relationships

- Purpose: show how the six core projects feed one another as a fleet instead of standing alone.
- Suggested site placement: `index.html` or `/atlas/`
- Level: `homepage-level`
- Status: `source draft`

```mermaid
flowchart LR
    memory["Memory Engine<br/>scene + ethics + retention"]
    mn42["MOARkNOBS-42<br/>tool + embodiment + open hardware"]
    seedbox["seedBox<br/>kit + simulator + pedagogy"]
    classhub["Class Hub<br/>roles + access + delivery"]
    syllabus["Syllabus<br/>curriculum + archive + policies"]
    liverig["live-rig<br/>performance + interop + ops"]

    mn42 -->|"control language"| liverig
    mn42 -->|"bench-friendly hardware"| seedbox
    seedbox -->|"teachable kits"| syllabus
    seedbox -->|"portable access"| classhub
    classhub -->|"delivery doorway"| syllabus
    syllabus -->|"policies and framing"| memory
    syllabus -->|"shared methods"| mn42
    liverig -->|"scene operations"| memory
    memory -->|"ethics and afterlife questions"| classhub
    classhub -. "publishes / routes" .-> liverig
    memory -. "documents what remains" .-> syllabus

    classDef project fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    class memory,mn42,seedbox,classhub,syllabus,liverig project;
```
