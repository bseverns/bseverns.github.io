# Memory Engine Flow

- Purpose: explain the participant path through Memory Engine and make the choice / room / archive logic explicit.
- Suggested site placement: `art.html` or a future Memory Engine detail page
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart LR
    participant["participant enters"]
    kiosk["kiosk prompt<br/>offer / terms / stakes"]
    choice{"choose<br/>continue / decline / edit"}
    room["room response<br/>light / sound / text / projection"]
    archive["archive / ops ledger<br/>what is kept, timed out, or erased"]
    steward["steward / operator<br/>care, reset, intervention"]
    exit["exit / reflection"]

    participant --> kiosk --> choice
    choice -->|"continue"| room --> exit
    room --> archive
    archive --> steward
    steward --> kiosk
    choice -->|"decline"| exit
    choice -->|"edit terms"| kiosk

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class participant,kiosk,choice,room,exit main;
    class archive,steward support;
```
