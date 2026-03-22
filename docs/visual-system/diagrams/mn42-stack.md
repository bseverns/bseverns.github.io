# MOARkNOBS-42 Stack

- Purpose: show MOARkNOBS-42 as a stack of physical interface, firmware logic, bridge behavior, host use, and public documentation.
- Suggested site placement: `art.html`, `/atlas/`, or a future MN42 detail page
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart TD
    surface["control surface<br/>42 knobs / buttons / panel logic"]
    brain["hardware brain<br/>Teensy + I/O + power"]
    firmware["firmware layer<br/>mapping, timing, state"]
    bridge["bridge layer<br/>MIDI / serial / host handshake"]
    host["host uses<br/>DAW / synths / live-rig / teaching demos"]
    docs["documentation stack<br/>README / manifests / ethics notes"]
    bench["bench + validation<br/>latency lab / measurements / logs"]

    surface --> brain --> firmware --> bridge --> host
    firmware --> docs
    bridge --> docs
    bench --> firmware
    bench --> docs
    docs -. "auditable claim loop" .-> host

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class surface,brain,firmware,bridge,host main;
    class docs,bench support;
```
