# Class Hub Architecture

- Purpose: map the relationship between roles, the Class Hub application layer, supporting services, stored course data, and deployment.
- Suggested site placement: `courses.html`, `/atlas/`, or source-only until the public Class Hub story is fuller
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart LR
    teacher["teacher"]
    learner["learner"]
    admin["steward / admin"]

    app["Class Hub<br/>assignments / links / announcements / access"]

    services["services<br/>auth / content / messaging / file delivery"]
    data["data stores<br/>course records / uploads / roster state"]
    deploy["deployment<br/>server / storage / backups / maintenance"]

    teacher --> app
    learner --> app
    admin --> app
    app --> services --> data --> deploy
    admin -. "care / repair / policy" .-> deploy
    teacher -. "course structure" .-> data

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class teacher,learner,admin,app main;
    class services,data,deploy support;
```
