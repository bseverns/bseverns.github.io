# live-rig Topology

- Purpose: explain live-rig as three coordinated lanes rather than a single opaque performance stack.
- Suggested site placement: `art.html` or a future live-rig detail page
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart LR
    subgraph audio["Audio lane"]
        audio_in["sources / instruments"]
        mix["mix / FX / buses"]
        out["PA / record"]
    end

    subgraph control["Control lane"]
        ctl_in["controllers / cues"]
        map["mapping / state / timing"]
        route["MIDI / OSC / triggers"]
    end

    subgraph video["Video lane"]
        vid_in["clips / cameras / scenes"]
        comp["switch / composite / scene logic"]
        proj["projection / stream / display"]
    end

    rig["show state<br/>one rig, three lanes"]
    ops["ops + docs<br/>patch notes / setup / recovery"]

    audio_in --> mix --> out --> rig
    ctl_in --> map --> route --> rig
    vid_in --> comp --> proj --> rig
    route --> mix
    route --> comp
    ops -. "setup / reset / troubleshooting" .-> rig

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class audio_in,mix,out,ctl_in,map,route,vid_in,comp,proj,rig main;
    class ops support;
```
