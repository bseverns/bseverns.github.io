---
layout: default
title: "Critical Digital Studies — Sampler (Unlisted)"
permalink: /critical-digital-studies-sampler/
seo_description: "Unlisted sampler of practice-based work in critical digital studies by Ben Severns"
sitemap: false
noindex: true
updated: "2025-09-14"
---

<!-- Ghost page — keep it off the nav and out of search. Swappable assets live in /assets/images/cds/ and /assets/docs/. -->

# Critical Digital Studies — Sampler (Unlisted)

I pair critical inquiry with hands-on digital practice — *playful rigor*: **build → perform → document → iterate**. Working **systems-first**, I map technical / operational / ethical layers and translate them into scaffolds, demos, and documentation others can use, audit, and extend. This unlisted page gathers practice-based work across consent-forward vision, open hardware, audio→form pipelines, and film/vision grammar.

<div class="cards">

<!-- CARD 1 -->
<article class="card">
  <img src="/assets/images/cds/faceTimes-consent.svg" alt="faceTimes consent screen showing detection-only, opt-in language and a visible delete-now action">
  <h3>faceTimes — Consent-Forward Vision Station</h3>
  <p>On-device, <strong>detection-only</strong> pipeline with explicit opt-in and delete-now controls. No identification, no network calls, and no storage without consent. Interface copy foregrounds agency before computation; documentation (README, PRIVACY/ETHICS, assumption ledger) is treated as research output.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>Classroom demo & public kiosk contexts</li>
    <li>Detection overlay with visible status + erase</li>
    <li>System: webcam → local detector → ephemeral buffer → user action</li>
  </ul>
  <p><a href="https://github.com/bseverns/faceTimes">Repo</a> • <a href="#" aria-disabled="true">Vimeo clip (add link)</a></p>
</article>

<!-- CARD 2 -->
<article class="card">
  <img src="/assets/images/cds/mn42-panel.svg" alt="MOARkNOBS-42 panel top-down with labeled controls">
  <h3>MOARkNOBS-42 — open-source microcontroller MIDI controller</h3>
  <p>Reproducible hardware + firmware used as both instrument and teaching platform. Parameter mapping functions as an inquiry into authorship and control; latency is characterized and documented so performance claims are auditable and extendable.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>Teensy-based instrument + teaching rig</li>
    <li>Complete docs: BOM, wiring, parameter map</li>
    <li>Measurement folded into practice (latency notes)</li>
  </ul>
  <p><a href="https://github.com/bseverns/MOARkNOBS-42">Repo</a> • <a href="#" aria-disabled="true">Demo video (optional)</a></p>
</article>

<!-- CARD 3 -->
<article class="card">
  <img src="/assets/images/cds/glitch-geometry-still.svg" alt="Generative geometry frame driven by live audio features">
  <h3>Glitch Geometry — Audio→Form Instrument</h3>
  <p>Live translation of signal features into geometry; pipeline choices (feature extraction, modulation, rendering) are made legible as aesthetic and ethical decisions. The system is tunable and documented for both teaching and critique.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>Signal in → features → geometry modulation → render</li>
    <li>Transparent, documented pipeline for reproducibility</li>
    <li>Designed for classroom demos and public performance</li>
  </ul>
  <p><a href="#" aria-disabled="true">Vimeo excerpt (add link)</a></p>
</article>

<!-- CARD 4 -->
<article class="card">
  <img src="/assets/images/cds/ds200412-still.svg" alt="Dead Sky rural pursuit still, a lone figure on a November road">
  <h3>DEAD SKY — Vision & Motion Grammar Studies</h3>
  <p>Two short studies — rural pursuit (DS200412) and wheel-mounted POV (DS200801) — probing surveillance logics, attention, and embodied capture toward a larger film project. Tests “pursuit grammar” and mechanical vision’s entrainment.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>November light, long-lens compression (pursuit grammar)</li>
    <li>Wheel POV: cyclic motion & peripheral smear</li>
    <li>Consent & site plans for actors / bystanders</li>
  </ul>
  <p><a href="https://vimeo.com/user2746012">Vimeo profile</a> (clip timecodes TBD)</p>
</article>

<!--CARD 5-->
<article class="card">
  <img src="/assets/images/cds/spectacle-mediafast.svg" alt="Prompt card and public intervention still for Spectacle / Media Fast">
  <h3>Skyway Derivé / Media Fast — Critical Pedagogy Interventions</h3>
  <p>Paired interventions that make media power felt: a “Spectacle” action-lecture moves critique into public space; a structured “Media Fast” maps sensory shifts and agency before reflective media making. Designed as public method; prompts and reflections are the artifacts.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>Transparent prompts; bystander consent & respect</li>
    <li>Reflection before publication; no IDs without release</li>
    <li>Documentation pack (brief, roles, reflection prompts)</li>
  </ul>
  <p><a href="#" aria-disabled="true">Brief</a> • <a href="#" aria-disabled="true">Reflection template</a></p>
</article>

<!--CARD 6 - cut best sample from final Media 2 episodes-->
<article class="card">
  <img src="/assets/images/cds/mcad-media2-mtn.svg" alt="MCAD Media 2: public access broadcast production still">
  <h3>MCAD Media 2 — MTN Public Access Broadcast</h3>
  <p>Studio-seminar culminating in a 28.5-minute MTN broadcast planned, produced, and edited by students. The artifact is civic-facing media formed by calendars, critique gates, and documentation standards for longevity.</p>
  <h4>Methods & Ethics</h4>
  <ul>
    <li>Roles & calendars; consent and authorship checkpoints</li>
    <li>Deliverables: broadcast master + process docs</li>
    <li>Public exhibition as peer review</li>
  </ul>
  <p><a href="#" aria-disabled="true">Episode link</a> • <a href="#" aria-disabled="true">Production calendar</a></p>
</article>

</div>

<hr>

<p><a href="/assets/docs/Severns_CriticalDigitalStudies_Sampler.pdf">Download PDF sampler</a> (placeholder) • This page is <em>unlisted</em> and marked <code>noindex</code>. Updated: {{ page.updated }}.</p>

<style>
.cards { display:grid; gap:1.25rem; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); }
.card { border:1px solid #ddd; padding:1rem; border-radius:12px; background:#fff; }
.card img { max-width:100%; height:auto; border-radius:8px; }
.card h3 { margin:.6rem 0 .35rem; }
.card h4 { margin:.5rem 0 .35rem; font-size:1rem; }
.card ul { margin:.25rem 0 .5rem 1.2rem; }
@media print {
  header.site-head, footer.site-footer, nav { display:none !important; }
  .card { break-inside: avoid; border:0; padding:0; }
}
</style>
