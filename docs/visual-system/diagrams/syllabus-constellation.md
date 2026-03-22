# Syllabus Constellation

- Purpose: frame Syllabus as both a teaching tool and an archive that connects courses, policies, prompts, and public reuse.
- Suggested site placement: `courses.html`
- Level: `project-level`
- Status: `source draft`

```mermaid
flowchart TD
    syllabus["Syllabus<br/>curriculum archive"]

    courses["course families<br/>studio / media / critical making"]
    policies["shared policies<br/>consent / access / critique / conduct"]
    prompts["prompts + exemplars<br/>briefs / starter code / references"]
    archive["archive role<br/>snapshots / lineage / version memory"]
    distribution["distribution<br/>students / peers / public reuse"]

    syllabus --> courses
    syllabus --> policies
    syllabus --> prompts
    syllabus --> archive
    courses --> distribution
    policies --> distribution
    prompts --> distribution
    archive -. "lets later work cite earlier teaching" .-> courses

    classDef main fill:#fbfaf7,stroke:#40372f,stroke-width:1.5px,color:#1f1a14;
    classDef support fill:#efe9dd,stroke:#7a6d5b,stroke-width:1.25px,color:#1f1a14,stroke-dasharray: 4 3;

    class syllabus,courses,policies,prompts,distribution main;
    class archive support;
```
