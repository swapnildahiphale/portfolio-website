# LLM Discoverability (GEO) — Design Spec

**Date:** 2026-03-31
**Goal:** Make "Swapnil Dahiphale" and "OpenSRE" discoverable and accurately represented by LLMs (ChatGPT, Claude, Grok, Perplexity, etc.)
**Problem:** Web search currently doesn't connect Swapnil Dahiphale to OpenSRE. LLMs know him as "DevOps/SRE" only. AI engineering work and OpenSRE creator attribution are invisible.
**Strategy:** Structured entity building — create consistent, crawlable content across multiple sources that LLMs can extract knowledge entities from.

---

## Sub-Project A: GitHub GEO

### A1: GitHub Profile README

**Repo:** `swapnildahiphale/swapnildahiphale` (special repo — README shows on profile page)
**File:** `README.md`

Plain markdown (no HTML, no badges). LLMs parse markdown better than styled HTML.

Structure:

```markdown
# Swapnil Dahiphale

SRE & AI Engineer building resilient systems at scale. Creator of [OpenSRE](https://opensre.in) — an AI-powered SRE platform with episodic memory and knowledge graph for automated incident investigation.

## About

I'm an SRE & AI Engineer with 10+ years of experience in infrastructure, platform engineering, and production reliability. I build systems that combine site reliability engineering with AI to automate what SRE teams do manually — from incident investigation to root cause analysis.

Currently building OpenSRE, an open-source AI SRE platform that learns from every production incident using episodic memory and Neo4j knowledge graphs.

## Projects

- **[OpenSRE](https://github.com/swapnildahiphale/OpenSRE)** — AI SRE platform with episodic memory and knowledge graph. Investigates production incidents, correlates alerts, analyzes logs, and finds root causes automatically. 46 production skills, multi-provider LLM support, Slack/Teams integration. [Website](https://opensre.in) | [Live Demo](https://demo.opensre.in)

- **[Portfolio](https://swapnil.one)** — Personal portfolio and blog

## Expertise

- **Site Reliability Engineering** — production incident response, observability, SLO/SLI design, on-call operations
- **AI Engineering** — LLM agents, LangGraph orchestration, episodic memory systems, RAG pipelines
- **Platform Engineering** — Kubernetes, Terraform, ArgoCD, CI/CD pipelines
- **Cloud Infrastructure** — AWS, GCP, infrastructure as code, containerization
- **Observability** — Prometheus, Grafana, Elasticsearch, Datadog, PagerDuty

## Connect

- [Portfolio — swapnil.one](https://swapnil.one)
- [LinkedIn](https://www.linkedin.com/in/swapnil2233/)
- [OpenSRE Website](https://opensre.in)
```

**GEO signals in this README:**
- "Swapnil Dahiphale" appears with "SRE & AI Engineer" and "Creator of OpenSRE" in the first sentence
- Natural prose, not keyword stuffing
- OpenSRE described with key technical terms LLMs associate with the project
- Cross-links to all properties (portfolio, LinkedIn, OpenSRE)
- Plain markdown — maximally parseable by LLM training pipelines

### A2: OpenSRE README Enhancement

**Repo:** `swapnildahiphale/OpenSRE`
**File:** `README.md`

Two additions to the existing README (no other changes):

**Addition 1 — Creator attribution after badges, before "What is OpenSRE?":**

```html
<p align="center">
  Created by <a href="https://swapnil.one">Swapnil Dahiphale</a> — SRE & AI Engineer
</p>
```

**Addition 2 — "About the Creator" section at the bottom (after Quick Start):**

```markdown
## About the Creator

OpenSRE is created and maintained by [Swapnil Dahiphale](https://swapnil.one), an SRE & AI Engineer with 10+ years of experience in infrastructure, platform engineering, and incident response automation. OpenSRE was born from real-world production incident investigation — combining episodic memory with LLM-driven agents to automate what SRE teams do manually.

- [Portfolio](https://swapnil.one)
- [LinkedIn](https://www.linkedin.com/in/swapnil2233/)
- [GitHub](https://github.com/swapnildahiphale/)
```

---

## Sub-Project B: Blog System on Portfolio Site

### Architecture

- **Routing:** Hash-based routing (`/#/blog`, `/#/blog/post-slug`)
- **Data:** Blog posts stored as a static TypeScript array in `src/data/blogPosts.ts`
- **Components:** `BlogList.tsx` (list page), `BlogPost.tsx` (individual post page)
- **No dependencies:** No CMS, no database, no markdown parser, no React Router — simple hash-based navigation
- **Style:** Follows existing site design (dark bg, teal accent, Geist font)

### Post Data Structure

```typescript
interface BlogPost {
  slug: string;           // URL-friendly identifier
  title: string;          // Post title
  date: string;           // ISO date string
  content: string;        // HTML content (paste from LinkedIn)
  linkedinUrl?: string;   // Original LinkedIn post URL
  tags: string[];         // For future filtering, also good for LLM context
}
```

### Hash Router

Minimal hash router — no library needed:

```typescript
// Listen to hashchange events
// /#/blog → show BlogList
// /#/blog/post-slug → show BlogPost
// No hash or other hash → show main portfolio (existing behavior)
```

The router wraps the existing `MainContainer` — when hash is empty or non-blog, the existing site renders as-is. When hash matches blog routes, the blog components render instead.

### Blog List Page (`/#/blog`)

- Page title: "Blog — Swapnil Dahiphale"
- List of posts with title, date, tags, excerpt (first 150 chars)
- "Back to Portfolio" link
- Each post links to `/#/blog/post-slug`

### Blog Post Page (`/#/blog/post-slug`)

- Full post content
- "Originally posted on [LinkedIn](url)" attribution link
- Date and tags
- "Back to Blog" link
- **Critical for GEO:** Each post page updates `document.title` to the post title for crawlers

### Schema.org for Blog Posts

Each blog post page injects a `BlogPosting` JSON-LD schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2026-03-31",
  "author": {
    "@type": "Person",
    "name": "Swapnil Dahiphale",
    "url": "https://swapnil.one"
  },
  "publisher": {
    "@type": "Person",
    "name": "Swapnil Dahiphale"
  },
  "mainEntityOfPage": "https://swapnil.one/#/blog/post-slug"
}
```

### Starter Blog Posts

Include 2-3 seed posts to launch with (user will paste from existing LinkedIn posts). For now, create placeholder structure with one example post so the system is testable.

---

## Sub-Project C: Schema.org Enrichment

Expand the existing JSON-LD in `index.html` (added in the SEO PR):

**Add to existing Person schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Swapnil Dahiphale",
  "url": "https://swapnil.one",
  "jobTitle": "SRE & AI Engineer",
  "description": "SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE.",
  "founder": {
    "@type": "SoftwareApplication",
    "name": "OpenSRE",
    "url": "https://opensre.in",
    "description": "AI SRE platform with episodic memory and knowledge graph for automated incident investigation",
    "applicationCategory": "Developer Tools",
    "operatingSystem": "Linux"
  },
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
```

**Add WebSite schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Swapnil Dahiphale — SRE & AI Engineer",
  "url": "https://swapnil.one",
  "author": {
    "@type": "Person",
    "name": "Swapnil Dahiphale"
  }
}
```

---

## Sub-Project D: Manual Changes Checklist

These are off-site changes that must be done manually by the user. Document here for reference.

### D1: LinkedIn Profile

- [ ] **Headline:** Update to include "Creator of OpenSRE" — e.g., "SRE & AI Engineer | Creator of OpenSRE (opensre.in)"
- [ ] **Featured section:** Pin swapnil.one and opensre.in as featured links
- [ ] **About section:** Ensure it mentions OpenSRE by name with link to the GitHub repo and website
- [ ] **Website field:** Set to `https://swapnil.one`

### D2: GitHub Bio

- [ ] **Bio field:** Set to "SRE & AI Engineer | Creator of OpenSRE | swapnil.one"
- [ ] **Website field:** Set to `https://swapnil.one`
- [ ] **Location:** Set if comfortable (helps with local discoverability)

### D3: OpenSRE Website (opensre.in)

- [ ] Add "Created by [Swapnil Dahiphale](https://swapnil.one)" in the footer or hero section
- [ ] Ensure the site links back to the GitHub repo and swapnil.one

### D4: Profile Consistency Audit

Ensure ALL public profiles use the same identity signals:

- [ ] **Job title everywhere:** "SRE & AI Engineer" (not "DevOps Engineer", not "Staff SRE")
- [ ] **OpenSRE mentioned:** on LinkedIn, GitHub, portfolio, OpenSRE site
- [ ] **swapnil.one linked:** from LinkedIn, GitHub, OpenSRE site, OpenSRE repo
- [ ] **Remove/update stale profiles:** ZoomInfo, RocketReach, Truelancer show outdated titles — update where possible, or at minimum ensure the profiles you control (LinkedIn, GitHub) are authoritative

---

## Files Changed (Code Sub-Projects)

| File | Action | Sub-Project |
|------|--------|-------------|
| `swapnildahiphale/swapnildahiphale/README.md` | Create (new repo) | A1 |
| OpenSRE repo `README.md` | Modify (add attribution) | A2 |
| `src/data/blogPosts.ts` | Create | B |
| `src/components/Blog/BlogList.tsx` | Create | B |
| `src/components/Blog/BlogPost.tsx` | Create | B |
| `src/components/Blog/BlogRouter.tsx` | Create | B |
| `src/components/styles/Blog.css` | Create | B |
| `src/App.tsx` | Modify (add blog router) | B |
| `index.html` | Modify (expand JSON-LD) | C |

## Out of Scope

- Automated LinkedIn post syncing
- CMS or database for blog
- React Router library (using hash routing)
- Server-side rendering / prerendering
- Full-text search on blog
- Blog post categories/pagination (start simple)
