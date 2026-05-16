---
layout: null
title: "Studio Portfolio"
seo_description: "Studio route alias redirecting to the canonical Studio page."
permalink: /studio/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url={{ '/art.html' | relative_url }}">
  <link rel="canonical" href="{{ '/art.html' | absolute_url }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page.title }} · {{ site.title }}</title>
  <meta name="description" content="{{ page.seo_description }}">
  <link rel="stylesheet" href="{{ '/css/site.css' | relative_url }}">
</head>
<body>
  <main class="content-area">
    <h1>Studio moved</h1>
    <p>The canonical Studio page lives at <a href="{{ '/art.html' | relative_url }}">/art.html</a>.</p>
  </main>
</body>
</html>
