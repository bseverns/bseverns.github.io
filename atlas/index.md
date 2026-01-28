---
layout: atlas_page
title: "Atlas"
permalink: /atlas/
seo_description: "Atlas of tools, scenes, learning environments, and systems tied to the portfolio diagram."
---
<section class="atlas-hero">
  <div class="container">
    <p class="eyebrow">Portfolio diagram</p>
    <h1>Atlas</h1>
    <p class="atlas-lede">A living topology of the lab: tools, scenes, learning environments, and the systems that distribute them. Hover to spotlight a node, click to jump into its node page.</p>
  </div>
</section>

<section class="atlas-diagram" aria-labelledby="atlas-diagram-title">
  <div class="container">
    <h2 id="atlas-diagram-title">Portfolio diagram</h2>
    <p class="atlas-diagram-note">The diagram mirrors the current repository map. It stays legible, auditable, and linked to node stubs.</p>
  </div>
  <div class="container">
    <div class="atlas-diagram-frame">
      <div class="mermaid">
%%{ init: { "flowchart": { "defaultRenderer": "dagre-d3", "rankSpacing": 30, "nodeSpacing": 10 } } }%%
graph TD
    thesis["Empower people to build with agency using open tools,<br>consent-forward scenes,<br>and learning environments — all documented loudly."]

    thesis --> toolsPillar["Tools"]
    thesis --> scenesPillar["Scenes"]
    thesis --> learningPillar["Learning Environments"]
    thesis --> infraPillar["Systems & Distribution"]

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

    %% SYSTEMS (one tall chain + hubs at the bottom)
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

    %% STYLES
    classDef tools fill:#383838,stroke:#FFFFFF,stroke-width:2px;
    classDef scenes fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef learning fill:#BAE8FC,stroke:#6C8EBF,stroke-width:2px;
    classDef infra fill:#E7D7FF,stroke:#7C5CBF,stroke-width:2px;
    classDef hub fill:#F2F2CC,stroke:#999,stroke-width:2px,stroke-dasharray: 3 3;

    class thesis,toolsPillar,toolsAudio,tmsLib,seedBox,Horizon,DustPress,lofiSampler,PdRepo,VCVpatch,toolsControl,MOARkNOBS42,MN42Configurator,arduinoSketches,microGranny2,x0xb0x,toolsAnalysis,frZone,teensyDSP tools;
    class scenesPillar,scenesWorks,perceptualDrift,pointyClumps,droneChorus,roomLens,StringFieldNode,DiceLoopNode,hallwayReactor,ArduinoSculpture,HumanBuffer,scenesStage,liveRig,liveRigCtrl,interstream,maelstrom,scVideoMixer,clipFoundry,deskCam scenes;
    class learningPillar,learnCurricula,cMCurricula,scratch,printing,lego,piper,dronesEd,privacyMedia,learnFactory,SyllabusRepo,ART215,learnDocs,repairStudio,machineDocs,personalSite,learnOps,teacherOps learning;
    class infraPillar,infraLMS,tailoredu,tailoreduRepo,djangoLMS,classhub,infraStack,infraFleet,piImaging,docker,server,openvpn,infraArchive,llfs,studio1,ghPages,infraLab,homeauto,turingpi2,printServer,infraGov,governance infra;
    class agencyHub,opennessHub,resilienceHub hub;
      </div>
    </div>
  </div>
</section>

<section class="atlas-doors" aria-labelledby="atlas-doors-title">
  <div class="container">
    <h2 id="atlas-doors-title">Choose a doorway</h2>
    <div class="card-grid">
      <article class="card">
        <div class="card-body">
          <h3>Tools</h3>
          <p>Instruments, kits, and control layers built for consent-forward use.</p>
          <a class="card-link" href="/atlas/tools/">Explore tools</a>
        </div>
      </article>
      <article class="card">
        <div class="card-body">
          <h3>Scenes</h3>
          <p>Performances and installations that keep power dynamics visible in the room.</p>
          <a class="card-link" href="/atlas/scenes/">Explore scenes</a>
        </div>
      </article>
      <article class="card">
        <div class="card-body">
          <h3>Learning</h3>
          <p>Curricula and learning environments for justice-centered digital literacy.</p>
          <a class="card-link" href="/atlas/learning/">Explore learning</a>
        </div>
      </article>
      <article class="card">
        <div class="card-body">
          <h3>Systems &amp; Distribution</h3>
          <p>Infrastructure, publishing workflows, and governance that move the work outward.</p>
          <a class="card-link" href="/atlas/systems/">Explore systems</a>
        </div>
      </article>
    </div>
  </div>
</section>
