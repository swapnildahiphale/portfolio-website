# Portfolio Website SEO — Design Spec

**Date:** 2026-03-31
**Site:** https://swapnil.one
**Stack:** React 18 + Vite SPA, deployed on Vercel
**Approach:** Static HTML — all meta tags and assets added at build time, zero runtime dependencies

## Goals

1. **Professional discoverability** — rank well for "Swapnil Dahiphale", "SRE engineer", related queries
2. **Social sharing polish** — rich preview cards on LinkedIn, Twitter/X, Slack, WhatsApp

## Description (used across meta tags)

> SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform.

## 1. Meta Tags & Open Graph (`index.html`)

Replace the current minimal `<head>` with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Swapnil Dahiphale — SRE & AI Engineer</title>

  <!-- SEO -->
  <meta name="description" content="SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform." />
  <link rel="canonical" href="https://swapnil.one" />
  <meta name="keywords" content="SRE, site reliability engineering, AI engineer, Kubernetes, platform engineering, observability, LLM agents, agentic AI, OpenSRE, Swapnil Dahiphale" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://swapnil.one" />
  <meta property="og:title" content="Swapnil Dahiphale — SRE & AI Engineer" />
  <meta property="og:description" content="SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform." />
  <meta property="og:image" content="https://swapnil.one/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Swapnil Dahiphale — SRE & AI Engineer" />
  <meta name="twitter:description" content="SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform." />
  <meta name="twitter:image" content="https://swapnil.one/og-image.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />
</head>
```

## 2. JSON-LD Structured Data (`index.html`)

Added as an inline script in `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Swapnil Dahiphale",
  "url": "https://swapnil.one",
  "jobTitle": "SRE & AI Engineer",
  "description": "SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE.",
  "knowsAbout": [
    "Site Reliability Engineering",
    "Kubernetes",
    "Platform Engineering",
    "Observability",
    "AI Engineering",
    "LLM Agents",
    "Agentic AI",
    "Incident Response Automation"
  ],
  "sameAs": [
    "https://github.com/swapnildahiphale/",
    "https://www.linkedin.com/in/swapnil2233/",
    "https://opensre.in"
  ]
}
</script>
```

## 3. Static Files (`public/`)

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://swapnil.one/sitemap.xml
```

### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://swapnil.one</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Single URL — this is a single-page site with no client-side routing.

### `public/og-image.png`

Branded card, 1200x630px:
- Dark background matching the site's color scheme
- "Swapnil Dahiphale" in large text
- "SRE & AI Engineer" subtitle
- Subtle accent colors from the site's palette

Design will be created as an HTML page rendered to PNG, or via a design tool.

### `public/favicon.png`

Simple icon with "SD" initials or a monogram. 32x32px minimum, matching site accent colors.

## 4. Out of Scope

- Performance hints (preconnect/preload) — deferred
- Web app manifest (PWA) — not needed
- Custom 404 page — deferred
- React Helmet or runtime meta injection — unnecessary for SPA
- Multi-page sitemap — single page only

## Files Changed

| File | Action |
|------|--------|
| `index.html` | Update `<head>` with meta tags, OG, Twitter Card, JSON-LD, favicon |
| `public/robots.txt` | Create |
| `public/sitemap.xml` | Create |
| `public/og-image.png` | Create (branded card) |
| `public/favicon.png` | Create (initials icon) |
