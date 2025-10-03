---
layout: default
title: "Critical Digital Studies — Sampler (Unlisted)"
permalink: /critical-digital-studies-sampler/
seo_description: "Unlisted sampler of practice-based work in critical digital studies by Ben Severns"
sitemap: false
noindex: true
updated: "2025-09-14"
archived: true
---
<link rel="stylesheet" href="{{ '/assets/css/cds-sampler.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/print-cds.css' | relative_url }}">
<a class="skip-link" href="#sampler-content">Skip to content</a>

<div class="cds-sampler">
  <header class="sampler-hero" aria-labelledby="sampler-title">
    <div class="hero-main">
      <div class="hero-heading">
        <h1 id="sampler-title">Critical Digital Studies — Sampler (Unlisted)</h1>
        <a class="print-btn" href="{{ '/assets/docs/Severns_CriticalDigitalStudies.pdf' | relative_url }}" target="_blank" rel="noopener">Download PDF</a>
      </div>
      <p class="lede">I pair critical inquiry with hands-on digital practice—(playful rigor): {% include flow-chain.html text="build → perform (play, test, break) → document → iterate" class="flow-chain--lede" %}.</p>
      <p>Working systems-first, I make technical and ethical layers legible so students can audit and extend them. This sampler foregrounds digital literacy within questions of justice, representation, and civic engagement, preparing makers to treat media as civic instruments.</p>
       <p class="privacy-note">Every project here rides inside my <a href="{{ 'https://github.com/bseverns/bseverns.github.io/blob/main/PRIVACY_ETHICS.md' | relative_url }}">Privacy &amp; Ethics Statement (v0.1)</a>—dignity over data, consent as interface, local-first processing, and the right to erase. Each project adds its own assumption ledger to tighten those guardrails, never loosen them.</p>
    </div>
    <aside class="service">
      <h2>Service &amp; Stewardship</h2>
      <p>Lab stewardship and equitable access are part of the pedagogy: labeled, calibrated, reproducible. I served 2.5 years on MCAD’s Faculty Senate, collaborating across faculty and administration on curriculum and student support; I bring the same steady, equity-minded approach that is central to my teaching practice to committee work and non-teaching obligations.</p>
    </aside>
  </header>

  <div class="sampler-main">
    <nav class="toc" aria-label="Projects">
      <h2 class="toc-title">Projects &amp; Methods</h2>
      <ul>
      {% for c in site.data.cds.cards %}
        <li><a href="#{{ c.id }}">{{ c.title }}</a></li>
      {% endfor %}
      </ul>
    </nav>

    <div id="sampler-content" class="sampler-grid">
    {% for c in site.data.cds.cards %}
    {% include cds-card.html id=c.id title=c.title img_src=c.img_src img_alt=c.img_alt figcaption=c.figcaption abstract=c.abstract aligns=c.aligns methods=c.methods outcomes=c.outcomes teach=c.teach links=c.links print_compact=c.print_compact %}
    {% endfor %}
    </div>
  </div>

  <footer class="sampler-meta">
    <p class="page-note">This page is <em>unlisted</em> and marked <code>noindex</code>. Updated: {{ page.updated }}.</p>
    <p class="commit-note">
      <span class="label">Sampler commit:</span>
      <code>{% if site.github and site.github.build_revision %}{{ site.github.build_revision | slice:0,7 }}{% else %}local{% endif %}</code>
    </p>
    <p class="methods-note"><em><strong>Methods live in <a href="/research/">Research</a>.</strong></em></p>
  </footer>
</div>
