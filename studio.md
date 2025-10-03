---
layout: default
title: "Studio Portfolio"
seo_description: "Selected studio projects by Ben Severns"
permalink: /studio/
---
# Studio Portfolio
<p>Hover or tap a card to get the gist; click through for the full noise.</p>
<div class="cta">
  <a class="btn secondary" href="/#archive-note-title">
    Dig through the archive stacks ↗
  </a>
</div>
<div class="cards">
{% assign items = site.projects | sort: "year" | reverse %}
{% for item in items %}{% include card.html item=item %}{% endfor %}
</div>
