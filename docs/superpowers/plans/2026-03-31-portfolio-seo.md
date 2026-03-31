# Portfolio Website SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete SEO setup (meta tags, OG image, favicon, robots.txt, sitemap, structured data) to the portfolio website at swapnil.one.

**Architecture:** All SEO assets are static — meta tags in `index.html`, static files in `public/`. No runtime dependencies, no new npm packages. OG image generated as an HTML-to-PNG render.

**Tech Stack:** HTML meta tags, JSON-LD, static assets (PNG), Vite (copies `public/` to build output)

**Site colors:**
- Background: `#0a0e17`
- Accent (teal): `#5eead4`
- Text: `#eae5ec`
- Font: Geist (Google Fonts)

---

### Task 1: Create OG Image

**Files:**
- Create: `public/og-image.png` (1200x630 branded card)

The OG image is a 1200x630px PNG with:
- Background: `#0a0e17` (site background)
- Large text: "Swapnil Dahiphale" in white (`#eae5ec`), Geist font, ~64px
- Subtitle: "SRE & AI Engineer" in teal (`#5eead4`), ~32px
- Subtle teal accent line or glow element
- Clean, minimal — no busy patterns

- [ ] **Step 1: Create the OG image HTML template**

Create a temporary HTML file to render the card design. Open it in a browser and screenshot/export as PNG at 1200x630.

```html
<!-- /tmp/og-card.html — temporary, not committed -->
<!DOCTYPE html>
<html>
<head>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap");
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #0a0e17;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Geist', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-line {
    width: 80px;
    height: 4px;
    background: #5eead4;
    margin-bottom: 32px;
    border-radius: 2px;
  }
  h1 {
    color: #eae5ec;
    font-size: 64px;
    font-weight: 600;
    letter-spacing: -1px;
    margin-bottom: 16px;
  }
  h2 {
    color: #5eead4;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .url {
    position: absolute;
    bottom: 40px;
    color: rgba(234, 229, 236, 0.4);
    font-size: 18px;
    letter-spacing: 1px;
  }
  .glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(94, 234, 212, 0.15) 0%, transparent 70%);
    top: -50px;
    right: -50px;
    border-radius: 50%;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="accent-line"></div>
  <h1>Swapnil Dahiphale</h1>
  <h2>SRE & AI Engineer</h2>
  <span class="url">swapnil.one</span>
</body>
</html>
```

- [ ] **Step 2: Render the HTML to PNG**

Open the HTML in a browser at exactly 1200x630 viewport. Use the browser's screenshot tool or a CLI tool to capture:

```bash
# Option A: Using Chrome headless
google-chrome --headless --screenshot=/Users/Swapnil/workspace/swapnil/portfolio-website/public/og-image.png --window-size=1200,630 /tmp/og-card.html

# Option B: Open in browser, use DevTools > device toolbar set to 1200x630, screenshot
# Option C: Use puppeteer/playwright if installed
```

- [ ] **Step 3: Verify the image**

```bash
file public/og-image.png
# Expected: PNG image data, 1200 x 630
```

- [ ] **Step 4: Commit**

```bash
git add public/og-image.png
git commit -m "feat: add branded OG image for social sharing"
```

---

### Task 2: Create Favicon

**Files:**
- Create: `public/favicon.png` (32x32 icon)

A minimal "SD" monogram on dark background with teal accent.

- [ ] **Step 1: Create the favicon HTML template**

```html
<!-- /tmp/favicon-template.html — temporary, not committed -->
<!DOCTYPE html>
<html>
<head>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap");
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 128px;
    height: 128px;
    background: #0a0e17;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Geist', sans-serif;
    border-radius: 24px;
  }
  span {
    color: #5eead4;
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -2px;
  }
</style>
</head>
<body>
  <span>SD</span>
</body>
</html>
```

- [ ] **Step 2: Render to PNG and resize to 32x32**

```bash
# Render at 128x128 first for quality, then resize
google-chrome --headless --screenshot=/tmp/favicon-large.png --window-size=128,128 /tmp/favicon-template.html

# Resize to 32x32 (using sips on macOS)
sips -z 32 32 /tmp/favicon-large.png --out /Users/Swapnil/workspace/swapnil/portfolio-website/public/favicon.png
```

- [ ] **Step 3: Verify**

```bash
file public/favicon.png
# Expected: PNG image data, 32 x 32
```

- [ ] **Step 4: Commit**

```bash
git add public/favicon.png
git commit -m "feat: add SD monogram favicon"
```

---

### Task 3: Create robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create the file**

```
User-agent: *
Allow: /

Sitemap: https://swapnil.one/sitemap.xml
```

Write this to `public/robots.txt`.

- [ ] **Step 2: Verify Vite will serve it**

Vite copies everything in `public/` to the build output root. Verify:

```bash
ls public/robots.txt
# Expected: file exists
```

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt with sitemap reference"
```

---

### Task 4: Create sitemap.xml

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create the file**

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

Write this to `public/sitemap.xml`.

- [ ] **Step 2: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat: add sitemap.xml for search engine discovery"
```

---

### Task 5: Update index.html with SEO meta tags

**Files:**
- Modify: `index.html` (the entire `<head>` section, lines 4-8)

This is the main task — adds meta description, canonical, keywords, Open Graph, Twitter Card, favicon, and JSON-LD structured data.

- [ ] **Step 1: Replace the `<head>` contents**

Replace the current `<head>` in `index.html` (lines 4-8):

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

  <!-- Structured Data -->
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
</head>
```

- [ ] **Step 2: Verify the build still works**

```bash
npm run build
# Expected: exits 0, no errors
```

- [ ] **Step 3: Verify meta tags in build output**

```bash
head -40 dist/index.html
# Expected: all meta tags present in output
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add SEO meta tags, OG, Twitter Card, and JSON-LD structured data"
```

---

### Task 6: Verify Everything End-to-End

- [ ] **Step 1: Run full build**

```bash
npm run build
```

- [ ] **Step 2: Check all SEO files exist in dist/**

```bash
ls -la dist/robots.txt dist/sitemap.xml dist/og-image.png dist/favicon.png
# Expected: all four files present
```

- [ ] **Step 3: Check index.html in dist/ has all meta tags**

```bash
grep -c 'og:image\|twitter:card\|application/ld+json\|canonical\|description' dist/index.html
# Expected: 5 or more matches
```

- [ ] **Step 4: Preview locally**

```bash
npm run preview
# Open http://localhost:4173 and inspect <head> in DevTools
# Verify: title, description, OG tags, favicon, JSON-LD all present
```

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: SEO verification fixes"
```
