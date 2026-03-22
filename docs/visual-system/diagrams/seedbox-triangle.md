# seedBox Triangle

- Purpose: show seedBox as a bridge between physical kit, simulated rehearsal, and teachable delivery.
- Suggested site placement: `courses.html` or `/atlas/`
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart LR
    hardware["hardware kit<br/>parts / enclosure / setup ritual"]
    simulator["simulator<br/>preview / rehearsal / remote debugging"]
    pedagogy["pedagogy<br/>lesson arc / station card / residency use"]
    docs["docs + checklists<br/>BOM / install notes / transport care"]

    hardware --> simulator
    simulator --> pedagogy
    pedagogy --> hardware
    docs --> hardware
    docs --> simulator
    docs --> pedagogy

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class hardware,simulator,pedagogy main;
    class docs support;
```
