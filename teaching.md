---
layout: default
title: "Academic Portfolio"
seo_description: "Teaching portfolio and course briefs"
---
# Academic Portfolio
<p>Syllabi and assorted classroom experiments are simmering here. Check back while the dust settles.</p>
<p>Sample syllabi, briefs, and outcomes. Full materials live at <a href="https://github.com/bseverns/Syllabus">github.com/bseverns/Syllabus</a>.</p>
<div class="cards">
{% assign items = site.teaching | sort: "updated" | reverse %}
{% for item in items %}{% include card.html item=item %}{% endfor %}
</div>
