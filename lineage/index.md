---
layout: default
title: "Lineage"
permalink: /lineage/
seo_description: "Lineage notes and practice arc connecting the archive to the current studio, teaching, and systems work."
---
<section class="practice-arc" aria-labelledby="lineage-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Archive bridge</p>
      <h1 id="lineage-title">The media line stays continuous even when the tools change</h1>
      <p>This practice moved from image, to room, to sound, to system, to shared structure. The container changed. The questions stayed consistent.</p>
    </div>

    <div class="lineage-prose">
      <p>The earliest work begins in photography and darkroom process, where the image is treated less as proof than as translation: memory passing through chemistry, framing, apparatus, distance, and loss. <em>Night Stalker Re-Runs on Channel 4</em> sits near that root, where lit windows, rerun logic, and uneasy distance turn mediated sight into a problem rather than a certainty.</p>
      <p>From there, the work widened into installation, text, moving image, and public situations. What changed over time was not the question but the container. Grief, contradiction, failed promises, pressure, unstable seeing, and partial access kept reappearing as room-scale situations, glitched sequences, sound, code, prototypes, and shared structures.</p>
      <p>Recent tools, scenes, learning systems, and machine manuals still carry those earlier concerns: who gets seen, how memory is held, what a system erases, and what care looks like when it takes operational form. The current systems layer is not a break from the earlier art. It is one later container for the same long-running questions.</p>
    </div>

    <ol class="practice-arc-list compact">
      <li class="arc-card">
        <a class="arc-card-link" href="/lineage/night-stalker/">
          <strong>Photography</strong>
          <span>memory translated through framing, chemistry, distance, and loss</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="/lineage/i-was-young-once/">
          <strong>Early objects and prototypes</strong>
          <span>ambition, flight, injury, and proof</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="/lineage/fly/">
          <strong>Installations and thesis work</strong>
          <span>grief staged, contradiction made public, many points of entry</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="/lineage/digital-bath-engram/">
          <strong>Moving image and glitch</strong>
          <span>pressure sequenced in time, unstable seeing made explicit</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="https://bbss.bandcamp.com/" target="_blank" rel="noopener">
          <strong>B_S.</strong>
          <span>pressure sounded, ritualized, and shared through repetition and collapse</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="/3d/genfab.html">
          <strong>Code, sensing, and fabrication</strong>
          <span>invisible relations made legible and material constraint made part of the form</span>
        </a>
      </li>
      <li class="arc-card">
        <a class="arc-card-link" href="/atlas/systems/">
          <strong>Tools, platforms, and machine care</strong>
          <span>care, legibility, participation, maintenance, and continuation operationalized</span>
        </a>
      </li>
    </ol>
  </div>
</section>

<section class="fleet-section" aria-labelledby="lineage-doors-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Open a root</p>
      <h2 id="lineage-doors-title">Selected lineage notes and archive routes</h2>
      <p>These pages stay public as active roots, not leftovers. Use them to move between preserved archive records and the current studio and Atlas layers.</p>
    </div>

    <ul class="legacy-work-grid compact">
      {% assign sorted_legacy_works = site.data.legacy_works | sort: "title" %}
      {% for work in sorted_legacy_works %}
        {% if work.lineage_note %}
        {% include legacy-work-card.html work=work %}
        {% endif %}
      {% endfor %}
    </ul>

    <div class="section-intro archive-image-intro">
      <p class="eyebrow">Preserved image pages</p>
      <h2>More archive pieces with images already on the site</h2>
      <p>These do not all have full lineage distillations yet, but they are live image-bearing pages. They should be read as source material for future notes, not as missing work.</p>
    </div>

    <ul class="legacy-work-grid">
      {% for work in sorted_legacy_works %}
        {% if work.archive_url and work.thumbnail %}
        {% include legacy-work-card.html work=work %}
        {% endif %}
      {% endfor %}
    </ul>

    <p class="archive-link-note">For broader preserved context, browse the <a href="/2d/">2D archive</a>, the <a href="/3d/">3D archive</a>, visit the <a href="/art.html">Studio page</a>, or open <a href="/atlas/">Atlas</a> for the current fleet.</p>
  </div>
</section>
