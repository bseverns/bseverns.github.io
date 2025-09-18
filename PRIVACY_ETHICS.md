# PRIVACY & ETHICS — Main Statement (Draft v0.1)

> *Playful rigor: build → perform → document → iterate. People first, always.*

**Maintainer:** Ben (maker, artist, STEAM educator)  
**Status:** Working draft  
**Last updated:** 2025-09-16

---

## 0. Plain‑Language Summary (TL;DR)
- **Dignity over data.** I only collect what’s needed to make a thing work, and only *with explicit, informed consent*.
- **Local first, deletion by default.** Process on‑device when possible. Store as little as possible. “Delete now” is always one click away.
- **Open by design, not exploitative.** Code and documentation prefer free/libre licenses. Sharing knowledge is not a license to extract people.
- **Care for minors and communities.** Extra protections for youth. Harm prevention beats novelty.
- **Transparent practice.** I publish an assumption ledger, data‑flows, known risks, and change logs.
- **Accountable and reversible.** Consent can be revoked, data can be erased, decisions can be appealed.

---

## 1. North Star
I build tools, scenes, and learning environments where **other people create**. My ethics follow that purpose: **reduce harm, increase agency, share knowledge,** and design systems that **support equitable participation**. I align with the **free software movement**—*free as in freedom to study, modify, share, and use*—and I operate in the spirit of **Kent’s 10 rules** as a craft ethos of clarity, humility, and responsibility in making.

---

## 2. Scope
This statement covers:
- Software, hardware, installations, workshops, and documentation published under this umbrella (e.g., *Human-Buffer — Consent-Forward Vision Station* (formerly *faceTimes*), *MOARkNOBS-42*, curricula, demos, exhibitions).  
- All interactions with participants, students, collaborators, and audiences in these contexts.

> **Note:** Specific projects carry addenda with precise data‑flows, risks, and micro‑copy. Project ethics **never weaken** any principle here; they may **strengthen** them.

---

## 3. Principles
1. **Human dignity is inviolable.** People are not datasets. No biometric identification or surveillance by default. Detection‑only when possible.  
2. **Equity is a system requirement.** I design for the margins first and audit for disparate impacts.
3. **Consent is an interface.** Opt‑in, affirmative, revocable, time‑bounded, and contextual. Consent UX is plain‑language and visible.  
4. **Data minimization.** If I don’t need it, I don’t collect it. If I must collect it, I keep it short-lived and secure.
5. **Local first.** Prefer on‑device processing with no network calls.  
6. **Transparency and legibility.** Publish assumption ledgers, data‑flow diagrams, and change logs.  
7. **Right to inspect, correct, and erase.** Participants can see what exists about them, fix it, or remove it—fast.  
8. **Open knowledge, not open people.** I release *code, methods, and documentation* under free/libre licenses while *protecting personal data*.
9. **Accountability.** Clear roles, audit trails, and incident response. When harm happens, I repair where possible and learn in public.
10. **Proportionality & necessity.** Fancy isn’t a justification. Risk must be proportionate to purpose.

---

## 4. Definitions
- **Personal Data:** Any information relating to an identifiable person (including images, voiceprints, device identifiers).  
- **Sensitive Data:** Data that could cause harm or discrimination if exposed (e.g., biometrics, health info, precise location, minors’ data).  
- **Processing:** Any operation on data (capture, transform, store, transmit, display).  
- **On‑device:** Processing done locally on the user’s hardware without cloud transmission.  
- **Assumption Ledger:** A living document listing design assumptions, uncertainties, mitigations, and evidence.

---

## 5. Data Practice
### 5.1 What I avoid
- Facial **identification** or **recognition**; emotion inference; demographic inference.  
- Passive, undisclosed logging (no shadow telemetry).  
- Cross‑context tracking; ad tech; data broker sharing.

### 5.2 What I may collect (case‑by‑case)
- **Ephemeral sensor data** required for live functionality (e.g., audio levels, detection bounding boxes) retained **in RAM** only.  
- **Operational logs** necessary for stability and safety—anonymized, minimized, and **rotated quickly**.  
- **Explicit submissions** from participants (e.g., saved images, consent forms) stored only with clear time limits.

### 5.3 Data lifecycle (default)
| Stage | Where | Default TTL | Who can access | Notes |
|---|---|---:|---|---|
| Capture | On‑device (RAM) | transient | Participant & operator | Visible indicators (LED/UI) show capture state. |
| Process | On‑device | transient | Operator | No cloud calls; no third‑party inference. |
| Review | On‑device | until decision | Participant | **Buttons:** *Show me my data* · *Save* · *Delete now*. |
| Save (opt‑in) | Encrypted local storage | 30 days (project default) | Maintainer | TTL set in project addendum; user may set shorter. |
| Share (opt‑in) | Controlled repository | case‑specific | Maintainer & participant | License and purpose specified; revocable when feasible. |
| Erase | Local + backups | immediate | Maintainer | Erasure receipts logged; backups pruned.

> **Deletion Controls:** Every project includes an obvious **“Delete now”** control and a post‑capture **review screen**. No auto‑save of personal data.

---

## 6. Consent Architecture
- **Opt‑in by default.** No implied consent. No dark patterns.  
- **Micro‑copy** accompanies every capture: purpose, retention, sharing, and how to revoke.  
- **Revocation** process is simple and honored quickly; erasure confirmations are provided.  
- **Informed participation** includes a plain‑language brief, risks, and alternatives.

**For youth (minors):**
- Require **guardian consent** and youth assent.  
- **No public posting** of minors’ personal data without explicit, project‑specific consent.  
- Blur/obfuscate by default in public artifacts; prefer avatars over headshots.

---

## 7. Safety, Fairness, and Testing
- **Pre‑launch risk review** for each project (technical, social, legal, and educational risks).  
- **Bias checks** on model behavior where ML is used; document limitations and failure modes.  
- **Red team exercises** proportional to risk (abuse cases, spoofing, misuse scenarios).  
- **Accessibility** is mandatory: readable contrast, captions, keyboard paths, and alt text.  
- **Environmental safety** for hardware: no exposed mains, proper fusing, thermal and RF considerations, and signage.

---

## 8. Licensing & Knowledge Sharing
- **Software:** Prefer **AGPL‑3.0**/**GPL‑3.0** or **CERN‑OHL‑S/W** for hardware where applicable.  
- **Documentation & Curriculum:** Prefer **CC BY‑SA 4.0**.  
- **Media Assets:** Prefer **CC BY‑NC** (or more permissive if participants agree).  
- **Contributor Terms:** Contributions are accepted under the same licenses; contributors affirm they have rights to contribute; no CLA surprise grabs.  
- **Ethical Use Rider:** Licenses are free/libre; I additionally publish norms discouraging use in surveillance, discrimination, or state/corporate harm—even when license text permits. I name those harms plainly.

---

## 9. Governance & Accountability
- **Stewardship:** Named maintainers for each project with contact info.  
- **Change control:** All updates to this statement and project addenda are tracked in **CHANGELOG.md** with semantic versioning.  
- **Assumption ledger:** Kept in repo; updated with experiments and findings.  
- **Incident response:**
  - Acknowledge within 72 hours.
  - Contain and assess impact.
  - Notify affected participants when relevant.
  - Publish a post‑mortem with fixes and timelines.

- **Appeals & Remedies:** Participants can request review of decisions (e.g., takedowns, denials). I prioritize repairing harm over defending reputation.

---

## 10. Exhibition & Classroom Norms (Community Covenant)
- **Consent signage:** Clear, multilingual, with QR to the project addendum and this statement.  
- **No harassment / no doxxing / no recording without consent.**  
- **Right to be unrecorded.** A “no capture” badge or zone is always available.  
- **Care teams:** Identified adults/staff trained in de‑escalation and data hygiene.  
- **Photography protocol:** Ask first, explain purpose, provide deletion on request.

---

## 11. Project Addendum Template (per‑project)
Each project includes a `PRIVACY-ADDENDUM.md` with:
1. **Purpose & benefits**  
2. **Data categories** (exact fields)  
3. **Data‑flow diagram** (camera ➜ RAM ➜ review ➜ save/erase)  
4. **Risk register** (with likelihood × impact × mitigations)  
5. **Consent text** (micro‑copy as shown to participants)  
6. **Retention policy** (TTL & erasure path)  
7. **Accessibility notes**  
8. **Contact & appeals**

---

## 12. Known Limits & Commitments
- I cannot guarantee absolute security, but I commit to **minimization, encryption, and rapid response**.
- I will sometimes choose **less capable** technology to reduce risk.
- When constraints force compromise, I will **name the trade‑offs** and **invite critique**.

---

## 13. Contact
- **Primary:** severns3@gmail.com  
- **Security/Erasure Requests:** same for the time being

---

## 14. Change Log (excerpt)
- **v0.1 (2025-09-16):** Initial draft establishing core principles, consent architecture, and per‑project addendum template.

---

### Appendix A: Values Cheat‑Sheet (for posters/UI)
- People first.  
- Opt‑in, informed, reversible.  
- Local processing; minimal data.  
- Clear purpose; short retention.  
- Show • Save • Delete—always visible.  
- Open code & docs; closed doors on personal data.  
- Document assumptions; publish changes.  
- Extra care for youth.  
- Accessibility is a feature, not a toggle.  
- Repair harm; learn in public.
