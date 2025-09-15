---
layout: default
title: "Home"
seo_description: "Portfolio of studio projects and teaching by Ben Severns"
---
# Ben Severns — Studio & Teaching

I’m a maker–educator and creative technologist. My work pairs critical inquiry with hands-on digital practice — *playful rigor*: build → perform → document → iterate. I teach systems-first and publish reproducible tools.

## Featured Studio
<div class="cards">
{% assign featured_projects = site.projects | where_exp: "p", "p.featured == true" | sort: "year" | reverse | slice: 3 %}
{% for item in featured_projects %}{% include card.html item=item %}{% endfor %}
</div>

## Featured Teaching
<div class="cards">
{% assign featured_teaching = site.teaching | where_exp: "t", "t.featured == true" | sort: "updated" | reverse | slice: 3 %}
{% for item in featured_teaching %}{% include card.html item=item %}{% endfor %}
</div>
