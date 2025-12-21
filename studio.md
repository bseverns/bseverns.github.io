---
layout: default
title: "Studio Portfolio"
seo_description: "Selected studio projects by Ben Severns"
permalink: /studio/
archived: true
---
# Studio Portfolio
<p>Hover or tap a card to get the gist; click through for the full noise.</p>

<div class="cards selected-grid">
{% assign featured_projects = site.projects | where: "featured", true | sort: "year" | reverse %}
{% for item in featured_projects %}
  <article class="card selected-card">
    <a href="{{ item.url | relative_url }}">
      {% if item.hero %}
      <div class="card-thumb">
        <img src="{{ item.hero | relative_url }}" alt="{{ item.hero_alt | default: item.title }}">
      </div>
      {% endif %}
      <h3>{{ item.title }}</h3>
      <p class="eyebrow">{{ item.year }}{% if item.media %} • {{ item.media }}{% elsif item.context %} • {{ item.context }}{% endif %}</p>
      <p>{{ item.summary }}</p>
    </a>
  </article>
{% endfor %}
</div>

<p class="archive-link-note">If you prefer the deep stacks, <a href="/#archive-note-title">dig through the archive ↗</a>.</p>
