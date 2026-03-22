# Fleet Map

- Purpose: show the operating structure of the practice across tools, scenes, learning, and systems/distribution.
- Suggested site placement: `index.html`
- Level: `homepage-level`
- Status: `source draft`

```mermaid
flowchart LR
    thesis["Active practice<br/>connected works, shared methods,<br/>documentation with consequences"]

    subgraph tools["Tools"]
        mn42["MOARkNOBS-42<br/>open control instrument"]
        seedbox["seedBox<br/>portable making kit"]
    end

    subgraph scenes["Scenes"]
        memory["Memory Engine<br/>participant memory environment"]
        liverig["live-rig<br/>audio / control / video rig"]
    end

    subgraph learning["Learning"]
        syllabus["Syllabus<br/>curriculum archive"]
        classhub["Class Hub<br/>learning doorway"]
    end

    subgraph systems["Systems & Distribution"]
        archive["archive / publishing"]
        care["stewardship / maintenance"]
        deploy["delivery / interoperability"]
    end

    thesis --> tools
    thesis --> scenes
    thesis --> learning
    thesis --> systems

    mn42 --> liverig
    mn42 -. workshopable instrument .-> syllabus
    seedbox --> classhub
    seedbox --> syllabus
    memory --> archive
    memory --> care
    liverig --> deploy
    classhub --> deploy
    syllabus --> archive
    classhub --> syllabus

    classDef pillar fill:#f2efe8,stroke:#5f5648,stroke-width:1.5px,color:#1f1a14;
    classDef project fill:#fbfaf7,stroke:#3f372f,stroke-width:1.5px,color:#1f1a14;
    classDef infra fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class mn42,seedbox,memory,liverig,syllabus,classhub project;
    class archive,care,deploy infra;
```
