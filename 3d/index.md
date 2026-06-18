---
layout: default
title: "Legacy 3D Works"
seo_description: "Archive catalog of Ben Severns' installation, sculpture, and action-based works with links to each legacy project."
permalink: /3d/
archived: true
---
# Legacy 3D Works

<p>Installations, kinetic actions, sculptural experiments, and hybrid stacks that leaned hard into interactivity, spectatorship, grief, pressure, and ritual. These pages stay published because today’s systems, instruments, and care structures did not emerge from nowhere.</p>

<p>The original project pages still carry their full image stacks, videos, and material notes. Read them as earlier layers of the same practice rather than a sealed-off previous phase.</p>

<nav class="legacy-links" aria-label="Anchor lineage dossiers">
  <h2>Anchor lineage dossiers</h2>
  <ul class="legacy-work-grid compact">
    {% assign anchor_ids = "i-was-young-once,are-you-ready-to-fly,digital-bath-engram,id-never-lie-to-you-warning,two-lefts-and-another-right-out-the-door" | split: "," %}
    {% for id in anchor_ids %}
      {% assign work = site.data.legacy_works | where: "id", id | first %}
      {% if work %}
        {% include legacy-work-card.html work=work %}
      {% endif %}
    {% endfor %}
  </ul>
</nav>

<nav class="legacy-links" aria-label="Legacy 3D works catalog">
  <h2>Projects</h2>
  <ul class="legacy-work-grid">
    {% assign works_3d = site.data.legacy_works | where: "branch", "3d" | sort: "order" %}
    {% for work in works_3d %}
      {% include legacy-work-card.html work=work %}
    {% endfor %}
  </ul>
</nav>

<p class="archive-note">All project pages stay untouched so you can see the original scripts, navigation, and pacing, warts and all. What looks like infrastructure now began here in rooms, actions, improvised stacks, and public tests. For the record layer beneath this archive, start with <a href="/catalog/catalog.json">/catalog/catalog.json</a>.</p>
