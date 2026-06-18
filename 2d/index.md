---
layout: default
title: "Legacy 2D Works"
seo_description: "Archive catalog of Ben Severns' two-dimensional works with links to each legacy project."
permalink: /2d/
archived: true
---
# Legacy 2D Works

<p>These pages remain public not as leftovers, but as earlier strata of the same practice. The flat-work archive holds the photographic and bodily roots of later questions about threshold, mistranslation, surveillance, injury, and public address.</p>

<p>Each entry keeps its older copy and pacing intact so the work can stay historically honest. The current systems work still cites these experiments.</p>

<nav class="legacy-links" aria-label="Anchor lineage dossiers">
  <h2>Anchor lineage dossiers</h2>
  <ul class="legacy-work-grid compact">
    {% assign anchor_ids = "night-stalker-reruns-on-channel-4,scar,a-madman-wrapped-in-the-clothes-of-a-deadman" | split: "," %}
    {% for id in anchor_ids %}
      {% assign work = site.data.legacy_works | where: "id", id | first %}
      {% if work %}
        {% include legacy-work-card.html work=work %}
      {% endif %}
    {% endfor %}
  </ul>
</nav>

<nav class="legacy-links" aria-label="Legacy 2D works catalog">
  <h2>Projects</h2>
  <ul class="legacy-work-grid">
    {% assign works_2d = site.data.legacy_works | where: "branch", "2d" | sort: "order" %}
    {% for work in works_2d %}
      {% include legacy-work-card.html work=work %}
    {% endfor %}
  </ul>
</nav>

<p class="archive-note">Need the original navigation chrome? Each project link loads the preserved single-page experience with its own menu, scripts, and pacing. Treat these as preserved experiments still in conversation with the current work. For machine-readable records, start with <a href="/catalog/catalog.json">/catalog/catalog.json</a>.</p>
