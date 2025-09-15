---
layout: default
title: "Studio Portfolio"
seo_description: "Selected studio projects by Ben Severns"
---
# Studio Portfolio
<p>Hover or tap a card to get the gist; click through for the full noise.</p>
<div class="cards">
{% assign items = site.projects | sort: "year" | reverse %}
{% for item in items %}{% include card.html item=item %}{% endfor %}
</div>
