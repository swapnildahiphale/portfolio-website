# LLM Discoverability (GEO) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make "Swapnil Dahiphale" and "OpenSRE" discoverable and accurately represented by LLMs through structured entity building across GitHub, the portfolio site blog, and enriched Schema.org data.

**Architecture:** Four sub-projects: (A) GitHub profile README + OpenSRE README attribution, (B) Blog system with hash routing on the portfolio site, (C) Schema.org JSON-LD enrichment in index.html, (D) Manual off-site checklist document. No new npm dependencies. Blog uses hash-based routing with static TS data.

**Tech Stack:** React 18, TypeScript, vanilla CSS, JSON-LD, GitHub CLI (`gh`)

**Existing patterns (follow these):**
- Component CSS lives in `src/components/styles/ComponentName.css`
- Components import their own CSS
- CSS uses `var(--backgroundColor)` (#0a0e17), `var(--accentColor)` (#5eead4), text color `#eae5ec`
- Font: Geist (Google Fonts), loaded in `src/index.css`
- App uses `LoadingProvider` context, `Suspense` for lazy loading
- No React Router — SPA with scroll sections

---

### Task 1: Create GitHub Profile README

**Files:**
- Create: New repo `swapnildahiphale/swapnildahiphale` with `README.md`

This is a special GitHub repo — when the repo name matches the username, the README displays on the profile page. This is the highest-ROI GEO task.

- [ ] **Step 1: Create the profile repo on GitHub**

```bash
cd /tmp
mkdir swapnildahiphale && cd swapnildahiphale
git init
```

- [ ] **Step 2: Create the README.md**

Write this exact content to `/tmp/swapnildahiphale/README.md`:

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

- [ ] **Step 3: Create the repo on GitHub and push**

```bash
cd /tmp/swapnildahiphale
gh repo create swapnildahiphale --public --description "GitHub profile README" --source . --push
```

- [ ] **Step 4: Verify the profile page shows the README**

Open `https://github.com/swapnildahiphale` in the browser and confirm the README content is visible on the profile page.

- [ ] **Step 5: Commit message note**

The commit happens implicitly via `gh repo create --push`. No separate commit step needed.

---

### Task 2: Add Creator Attribution to OpenSRE README

**Files:**
- Modify: OpenSRE repo `README.md` (remote repo at `swapnildahiphale/OpenSRE`)

Two additions: creator line at the top, "About the Creator" section at the bottom.

- [ ] **Step 1: Clone the OpenSRE repo**

```bash
cd /tmp
gh repo clone swapnildahiphale/OpenSRE OpenSRE-geo
cd OpenSRE-geo
git checkout -b geo/creator-attribution
```

- [ ] **Step 2: Add creator attribution after the badges**

In `README.md`, find the closing `</h4>` tag of the badges section (the one containing the license badge). Add this immediately after it:

```html
<p align="center">
  Created by <a href="https://swapnil.one">Swapnil Dahiphale</a> — SRE & AI Engineer
</p>
```

- [ ] **Step 3: Add "About the Creator" section at the bottom**

Append this to the end of `README.md`:

```markdown
## About the Creator

OpenSRE is created and maintained by [Swapnil Dahiphale](https://swapnil.one), an SRE & AI Engineer with 10+ years of experience in infrastructure, platform engineering, and incident response automation. OpenSRE was born from real-world production incident investigation — combining episodic memory with LLM-driven agents to automate what SRE teams do manually.

- [Portfolio](https://swapnil.one)
- [LinkedIn](https://www.linkedin.com/in/swapnil2233/)
- [GitHub](https://github.com/swapnildahiphale/)
```

- [ ] **Step 4: Commit and push**

```bash
git add README.md
git commit -m "feat: add creator attribution for LLM discoverability"
git push -u origin geo/creator-attribution
```

- [ ] **Step 5: Create PR**

```bash
gh pr create --title "Add creator attribution to README" --body "Adds creator attribution at top and About the Creator section at bottom for LLM discoverability (GEO)."
```

- [ ] **Step 6: Verify on GitHub**

Open the PR and confirm the README preview shows the creator line after badges and the About section at the bottom.

---

### Task 3: Enrich Schema.org JSON-LD in index.html

**Files:**
- Modify: `index.html` (lines 33-57, the existing JSON-LD script block)

Expand the Person schema to include the `founder` relationship to OpenSRE, and add a separate WebSite schema.

- [ ] **Step 1: Replace the existing JSON-LD script block**

In `index.html`, replace the entire `<script type="application/ld+json">...</script>` block (lines 33-57) with:

```html
  <!-- Structured Data -->
  <script type="application/ld+json">
  [
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
      ],
      "founder": {
        "@type": "SoftwareApplication",
        "name": "OpenSRE",
        "url": "https://opensre.in",
        "description": "AI SRE platform with episodic memory and knowledge graph for automated incident investigation",
        "applicationCategory": "Developer Tools",
        "operatingSystem": "Linux"
      }
    },
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
  ]
  </script>
```

- [ ] **Step 2: Verify the build works**

```bash
npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 3: Verify JSON-LD in build output**

```bash
grep -c 'SoftwareApplication\|WebSite\|founder' dist/index.html
```

Expected: 3 or more matches.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: enrich Schema.org JSON-LD with founder and WebSite schemas"
```

---

### Task 4: Create Blog Post Data Structure

**Files:**
- Create: `src/data/blogPosts.ts`

Static TypeScript array of blog posts. This is the data layer for the blog — no API, no CMS.

- [ ] **Step 1: Create the data file**

Write this to `src/data/blogPosts.ts`:

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  linkedinUrl?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-opensre",
    title: "Introducing OpenSRE — AI-Powered Incident Investigation",
    date: "2026-03-31",
    content: `
      <p>I'm excited to announce <strong>OpenSRE</strong> — an open-source AI SRE platform that automatically investigates production incidents using episodic memory and knowledge graphs.</p>
      <p>After years of being on-call and manually investigating incidents, I built OpenSRE to automate the repetitive parts of incident response. The platform combines LLM agents with a Neo4j knowledge graph to understand service topology and an episodic memory system that learns from every investigation.</p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>Episodic Memory</strong> — learns from every investigation, surfaces past solutions for similar incidents</li>
        <li><strong>Knowledge Graph</strong> — Neo4j-powered service topology awareness and blast radius analysis</li>
        <li><strong>46 Production Skills</strong> — integrations with Elasticsearch, Datadog, Grafana, PagerDuty, Kubernetes, AWS, and more</li>
        <li><strong>Multi-provider LLM</strong> — works with Claude, OpenAI, Gemini, DeepSeek, and 14+ more providers</li>
      </ul>
      <p>Check it out at <a href="https://opensre.in">opensre.in</a> or on <a href="https://github.com/swapnildahiphale/OpenSRE">GitHub</a>.</p>
    `,
    linkedinUrl: undefined,
    tags: ["OpenSRE", "AI", "SRE", "incident response", "open source"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/data/blogPosts.ts
```

Expected: no errors (or run `npm run build` for full check).

- [ ] **Step 3: Commit**

```bash
git add src/data/blogPosts.ts
git commit -m "feat: add blog post data structure with seed post"
```

---

### Task 5: Create Blog CSS

**Files:**
- Create: `src/components/styles/Blog.css`

Follows existing site patterns — dark background, teal accent, Geist font.

- [ ] **Step 1: Create the CSS file**

Write this to `src/components/styles/Blog.css`:

```css
.blog-container {
  width: var(--cWidth);
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 0 80px;
  min-height: 100vh;
  color: #eae5ec;
}

.blog-header {
  margin-bottom: 60px;
}

.blog-header h1 {
  font-size: 48px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 16px;
}

.blog-header p {
  opacity: 0.6;
  font-size: 16px;
  margin: 0;
}

.blog-back-link {
  display: inline-block;
  color: var(--accentColor);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.blog-back-link:hover {
  opacity: 1;
}

/* Blog List */
.blog-post-card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

.blog-post-card:hover {
  opacity: 0.8;
}

.blog-post-card h2 {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 8px;
}

.blog-post-card .blog-post-date {
  font-size: 14px;
  opacity: 0.5;
  margin: 0 0 12px;
}

.blog-post-card .blog-post-excerpt {
  font-size: 16px;
  opacity: 0.7;
  margin: 0 0 12px;
  line-height: 1.6;
}

.blog-post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.blog-post-tag {
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: var(--accentColor);
  opacity: 0.7;
}

/* Blog Post */
.blog-post-full {
  line-height: 1.8;
}

.blog-post-full h1 {
  font-size: 36px;
  font-weight: 500;
  margin: 0 0 16px;
}

.blog-post-full .blog-post-meta {
  font-size: 14px;
  opacity: 0.5;
  margin-bottom: 40px;
}

.blog-post-full .blog-post-content {
  font-size: 17px;
  line-height: 1.8;
}

.blog-post-full .blog-post-content h3 {
  font-size: 22px;
  font-weight: 500;
  margin: 32px 0 16px;
}

.blog-post-full .blog-post-content p {
  margin: 0 0 16px;
}

.blog-post-full .blog-post-content ul {
  margin: 0 0 16px;
  padding-left: 24px;
}

.blog-post-full .blog-post-content li {
  margin-bottom: 8px;
}

.blog-post-full .blog-post-content a {
  color: var(--accentColor);
}

.blog-linkedin-link {
  display: inline-block;
  margin-top: 40px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: var(--accentColor);
  text-decoration: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.blog-linkedin-link:hover {
  border-color: var(--accentColor);
}

@media screen and (max-width: 768px) {
  .blog-container {
    padding: 80px 0 60px;
  }

  .blog-header h1 {
    font-size: 32px;
  }

  .blog-post-card h2 {
    font-size: 20px;
  }

  .blog-post-full h1 {
    font-size: 28px;
  }

  .blog-post-full .blog-post-content {
    font-size: 16px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/styles/Blog.css
git commit -m "feat: add blog page styles matching site design"
```

---

### Task 6: Create BlogList Component

**Files:**
- Create: `src/components/Blog/BlogList.tsx`

Displays all blog posts as a list with title, date, excerpt, and tags.

- [ ] **Step 1: Create the component**

Write this to `src/components/Blog/BlogList.tsx`:

```tsx
import { getAllBlogPosts } from "../../data/blogPosts";
import "../styles/Blog.css";

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

const BlogList = () => {
  const posts = getAllBlogPosts();

  return (
    <div className="blog-container">
      <a href="#/" className="blog-back-link">
        &larr; Back to Portfolio
      </a>
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on SRE, AI engineering, and building OpenSRE.</p>
      </div>
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`#/blog/${post.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="blog-post-card">
            <h2>{post.title}</h2>
            <p className="blog-post-date">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="blog-post-excerpt">
              {stripHtml(post.content).slice(0, 150)}...
            </p>
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BlogList;
```

- [ ] **Step 2: Commit**

```bash
mkdir -p src/components/Blog
git add src/components/Blog/BlogList.tsx
git commit -m "feat: add BlogList component"
```

---

### Task 7: Create BlogPost Component

**Files:**
- Create: `src/components/Blog/BlogPost.tsx`

Displays a single blog post with full content, metadata, LinkedIn attribution link, and dynamic JSON-LD.

- [ ] **Step 1: Create the component**

Write this to `src/components/Blog/BlogPost.tsx`:

```tsx
import { useEffect } from "react";
import { getBlogPostBySlug } from "../../data/blogPosts";
import "../styles/Blog.css";

interface BlogPostProps {
  slug: string;
}

const BlogPostPage = ({ slug }: BlogPostProps) => {
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Swapnil Dahiphale`;

      const existingLd = document.getElementById("blog-jsonld");
      if (existingLd) existingLd.remove();

      const script = document.createElement("script");
      script.id = "blog-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Swapnil Dahiphale",
          url: "https://swapnil.one",
        },
        publisher: {
          "@type": "Person",
          name: "Swapnil Dahiphale",
        },
        mainEntityOfPage: `https://swapnil.one/#/blog/${post.slug}`,
      });
      document.head.appendChild(script);

      return () => {
        document.title = "Swapnil Dahiphale — SRE & AI Engineer";
        const el = document.getElementById("blog-jsonld");
        if (el) el.remove();
      };
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="blog-container">
        <a href="#/blog" className="blog-back-link">
          &larr; Back to Blog
        </a>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <a href="#/blog" className="blog-back-link">
        &larr; Back to Blog
      </a>
      <article className="blog-post-full">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <div className="blog-post-tags" style={{ marginTop: "12px" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-linkedin-link"
          >
            Originally posted on LinkedIn &rarr;
          </a>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Blog/BlogPost.tsx
git commit -m "feat: add BlogPost component with dynamic JSON-LD"
```

---

### Task 8: Create Blog Router and Wire into App

**Files:**
- Create: `src/components/Blog/BlogRouter.tsx`
- Modify: `src/App.tsx`

Simple hash-based router. When hash is `#/blog` or `#/blog/slug`, render blog. Otherwise, render the existing portfolio.

- [ ] **Step 1: Create the BlogRouter component**

Write this to `src/components/Blog/BlogRouter.tsx`:

```tsx
import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogPostPage from "./BlogPost";

function parseHash(): { route: string; slug?: string } {
  const hash = window.location.hash;
  if (hash === "#/blog" || hash === "#/blog/") {
    return { route: "blog-list" };
  }
  const match = hash.match(/^#\/blog\/(.+)$/);
  if (match) {
    return { route: "blog-post", slug: match[1] };
  }
  return { route: "portfolio" };
}

interface BlogRouterProps {
  children: React.ReactNode;
}

const BlogRouter = ({ children }: BlogRouterProps) => {
  const [routeState, setRouteState] = useState(parseHash);

  useEffect(() => {
    const onHashChange = () => setRouteState(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (routeState.route === "blog-list") {
    return <BlogList />;
  }

  if (routeState.route === "blog-post" && routeState.slug) {
    return <BlogPostPage slug={routeState.slug} />;
  }

  return <>{children}</>;
};

export default BlogRouter;
```

- [ ] **Step 2: Wire BlogRouter into App.tsx**

Replace the contents of `src/App.tsx` with:

```tsx
import { lazy, Suspense } from "react";
import "./App.css";
import BlogRouter from "./components/Blog/BlogRouter";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <BlogRouter>
          <Suspense>
            <MainContainer>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </BlogRouter>
      </LoadingProvider>
    </>
  );
};

export default App;
```

Key change: `BlogRouter` wraps the existing portfolio content. When hash matches blog routes, it renders the blog instead. Otherwise, it passes through to the existing portfolio.

- [ ] **Step 3: Verify the build works**

```bash
npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Blog/BlogRouter.tsx src/App.tsx
git commit -m "feat: add hash-based blog router wired into App"
```

---

### Task 9: Add Blog Link to Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

Add a "Blog" link in the navbar that navigates to `#/blog`.

- [ ] **Step 1: Read the current Navbar**

Read `src/components/Navbar.tsx` to find where to add the blog link. Look for the existing nav links pattern.

- [ ] **Step 2: Add the Blog link**

Add a blog link to the navbar. Find the existing links section and add:

```tsx
<a href="#/blog" data-cursor="icons">
  Blog
</a>
```

Place it alongside the existing navigation elements (e.g., near the LinkedIn link or resume link). Match the existing styling pattern — use the same classNames and structure as other nav links.

- [ ] **Step 3: Verify the build works**

```bash
npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Blog link to navbar"
```

---

### Task 10: Create Manual Changes Checklist Document

**Files:**
- Create: `docs/GEO-MANUAL-CHECKLIST.md`

This documents the off-site changes the user needs to do manually.

- [ ] **Step 1: Create the checklist file**

Write this to `docs/GEO-MANUAL-CHECKLIST.md`:

```markdown
# LLM Discoverability — Manual Changes Checklist

These changes must be done manually on external platforms to complete the GEO (Generative Engine Optimization) strategy. They complement the code changes made to the portfolio site, GitHub profile README, and OpenSRE README.

## LinkedIn Profile

- [ ] **Headline:** Update to include "Creator of OpenSRE" — e.g., "SRE & AI Engineer | Creator of OpenSRE (opensre.in)"
- [ ] **Featured section:** Pin swapnil.one and opensre.in as featured links
- [ ] **About section:** Mention OpenSRE by name with link to the GitHub repo and website
- [ ] **Website field:** Set to `https://swapnil.one`

## GitHub Bio

- [ ] **Bio field:** Set to "SRE & AI Engineer | Creator of OpenSRE | swapnil.one"
- [ ] **Website field:** Set to `https://swapnil.one`
- [ ] **Location:** Set if comfortable (helps with local discoverability)

## OpenSRE Website (opensre.in)

- [ ] Add "Created by [Swapnil Dahiphale](https://swapnil.one)" in the footer or hero section
- [ ] Ensure the site links back to the GitHub repo and swapnil.one

## Profile Consistency Audit

Ensure ALL public profiles use the same identity signals:

- [ ] **Job title everywhere:** "SRE & AI Engineer" (not "DevOps Engineer", not "Staff SRE")
- [ ] **OpenSRE mentioned:** on LinkedIn, GitHub, portfolio, OpenSRE site
- [ ] **swapnil.one linked:** from LinkedIn, GitHub, OpenSRE site, OpenSRE repo
- [ ] **Remove/update stale profiles:** ZoomInfo, RocketReach, Truelancer show outdated titles — update where possible, or at minimum ensure the profiles you control (LinkedIn, GitHub) are authoritative

## Why This Matters

LLMs build knowledge about people from multiple corroborating sources. If GitHub, LinkedIn, your portfolio, and OpenSRE all consistently say "Swapnil Dahiphale — SRE & AI Engineer — Creator of OpenSRE" with cross-links, LLMs will learn this association. Fragmented or inconsistent profiles confuse LLM knowledge extraction.
```

- [ ] **Step 2: Commit**

```bash
git add docs/GEO-MANUAL-CHECKLIST.md
git commit -m "docs: add manual GEO changes checklist for off-site platforms"
```

---

### Task 11: End-to-End Verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 2: Start dev server and verify blog routes**

```bash
npm run dev
```

Open in browser:
- `http://localhost:5173` — portfolio loads normally
- `http://localhost:5173/#/blog` — blog list page shows with the seed post
- `http://localhost:5173/#/blog/introducing-opensre` — full blog post renders
- Click "Back to Portfolio" — returns to main portfolio
- Click "Back to Blog" from post — returns to blog list

- [ ] **Step 3: Verify JSON-LD on blog post page**

Open DevTools on `http://localhost:5173/#/blog/introducing-opensre` and run:

```javascript
JSON.parse(document.getElementById('blog-jsonld').textContent)
```

Expected: `BlogPosting` schema with correct headline, author, datePublished.

- [ ] **Step 4: Verify enriched JSON-LD on main page**

Open DevTools on `http://localhost:5173` and run:

```javascript
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)
```

Expected: Array with Person (including `founder` field) and WebSite schemas.

- [ ] **Step 5: Verify GitHub profile README**

Open `https://github.com/swapnildahiphale` in the browser. Confirm the profile README is visible with name, about, projects, expertise, and connect sections.

- [ ] **Step 6: Verify OpenSRE README PR**

Open the PR created in Task 2. Confirm the README preview shows creator attribution after badges and About the Creator section at bottom.

- [ ] **Step 7: Commit any fixes**

If any fixes were needed:

```bash
git add -A
git commit -m "fix: end-to-end verification fixes"
```
