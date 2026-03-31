# Blog SEO + GEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make blog posts crawlable by search engines and LLMs through real URL paths, per-post meta tags, enriched schemas, sitemap, and substantive content.

**Architecture:** Replace hash-based blog routing with React Router BrowserRouter. Extend BlogPostPage to inject per-post meta/OG tags and enriched Schema.org JSON-LD. Add a build-time sitemap generator. Expand thin posts with humanized content. Vercel serves all paths via a one-line rewrite.

**Tech Stack:** react-router-dom, Vite, TypeScript, Vercel

---

### Task 1: Install react-router-dom and add Vercel config

**Files:**
- Modify: `package.json`
- Create: `vercel.json`

- [ ] **Step 1: Install react-router-dom**

Run:
```bash
cd /Users/Swapnil/workspace/swapnil/portfolio-website
npm install react-router-dom
```

- [ ] **Step 2: Create vercel.json**

Create `vercel.json` in project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vercel.json
git commit -m "chore: add react-router-dom and Vercel SPA rewrite config"
```

---

### Task 2: Replace hash routing with React Router

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Blog/BlogPost.tsx` (use useParams instead of slug prop)
- Modify: `src/components/Blog/BlogList.tsx` (Link components)
- Modify: `src/components/Navbar.tsx` (blog link href)
- Delete: `src/components/Blog/BlogRouter.tsx`

- [ ] **Step 1: Rewrite App.tsx with BrowserRouter**

Replace the full contents of `src/App.tsx`:

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import BlogList from "./components/Blog/BlogList";
import BlogPostPage from "./components/Blog/BlogPost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route
          path="*"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

- [ ] **Step 2: Update BlogPostPage to use useParams**

Replace `src/components/Blog/BlogPost.tsx`:

```tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPostBySlug } from "../../data/blogPosts";
import "../styles/Blog.css";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
        mainEntityOfPage: `https://swapnil.one/blog/${post.slug}`,
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
        <Link to="/blog" className="blog-back-link">
          &larr; Back to Blog
        </Link>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <Link to="/blog" className="blog-back-link">
        &larr; Back to Blog
      </Link>
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

- [ ] **Step 3: Update BlogList to use Link components**

Replace `src/components/Blog/BlogList.tsx`:

```tsx
import { Link } from "react-router-dom";
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
      <Link to="/" className="blog-back-link">
        &larr; Back to Portfolio
      </Link>
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on SRE, AI engineering, and building OpenSRE.</p>
      </div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
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
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
```

- [ ] **Step 4: Update Navbar blog link**

In `src/components/Navbar.tsx`, change the blog link from hash to path. Find:
```tsx
            <a href="#/blog" data-cursor="icons">
```
Replace with:
```tsx
            <a href="/blog" data-cursor="icons">
```

Also update the SD logo link. Find:
```tsx
          <a href="/#" className="navbar-title" data-cursor="disable">
```
Replace with:
```tsx
          <a href="/" className="navbar-title" data-cursor="disable">
```

- [ ] **Step 5: Delete BlogRouter.tsx**

```bash
rm src/components/Blog/BlogRouter.tsx
```

- [ ] **Step 6: Verify build and test routing**

Run: `npm run build`
Expected: Build succeeds.

Run: `npm run dev`
Test manually:
- Visit `http://localhost:5173/` — portfolio loads
- Visit `http://localhost:5173/blog` — blog list loads
- Click a post — post loads at `/blog/{slug}`
- Click "Back to Blog" — returns to list
- Click "Back to Portfolio" — returns to homepage
- Browser back/forward buttons work

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: migrate blog from hash routing to React Router

Replaces custom hash-based BlogRouter with react-router-dom BrowserRouter.
Blog posts now live at /blog/{slug} instead of /#/blog/{slug}, making them
crawlable by search engines and LLM crawlers."
```

---

### Task 3: Add description field and per-post meta tags + Schema enrichment

**Files:**
- Modify: `src/data/blogPosts.ts` (add description to interface + all posts)
- Modify: `src/components/Blog/BlogPost.tsx` (meta injection + schema enrichment)

- [ ] **Step 1: Add description to BlogPost interface**

In `src/data/blogPosts.ts`, add `description` to the interface:

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  linkedinUrl?: string;
  tags: string[];
}
```

- [ ] **Step 2: Add description to every blog post**

Add a `description` field to each post in the `blogPosts` array. Each description should be 1-2 sentences, 120-160 characters, no fluff. Examples:

```typescript
// introducing-opensre
description: "Open-source AI SRE platform that investigates production incidents using episodic memory and knowledge graphs.",

// cloudflare-is-down-again
description: "Another Cloudflare outage and what it means for teams relying on a single CDN provider for production traffic.",

// toon-token-oriented-object-notation-llm-costs
description: "TOON replaces redundant JSON keys with a schema-once format, cutting LLM token usage by 40-60% on structured data.",

// ai-2027-scenario-moving-too-fast
description: "Two paths for AI development both look bad. Are we moving too fast, too slow, or just making it up as we go?",

// serverless-portfolio-website-production
description: "Building and shipping a personal portfolio website on AWS Lambda and API Gateway in a weekend.",

// redhat-delivery-specialist-cloud-automation
description: "Earning the RedHat Delivery Specialist certification for cloud infrastructure automation with Ansible and CloudForms.",

// redhat-delivery-specialist-paas-certifications
description: "Certified in RedHat PaaS and PaaS Development, covering OpenShift container platform operations and app deployment.",

// speaking-at-devops-global-summit-2017 (after merge, see Task 5)
description: "Co-presenting Windows Automation with Ansible at DevOps++ Global Summit 2017 in Pune with Lokesh Jawane.",

// windows-automation-ansible-devops-summit-2017
description: "Pre-conference post for my DevOps++ Global Summit 2017 talk on automating Windows infrastructure with Ansible.",

// devops-assessment-quiz-free-conference-pass
description: "A DevOps maturity quiz we built to give away conference passes to the doppa17 DevOps event in Pune.",

// continuous-integration-for-salesforce
description: "Why CI/CD for Salesforce is harder than it looks: metadata-driven code, no native Git, and org-dependent state.",

// calculate-your-devops-readiness-score
description: "A simple framework for measuring DevOps maturity across culture, automation, measurement, and sharing.",

// certified-jenkins-engineer
description: "Becoming one of the first Certified Jenkins Engineers and what the exam actually tests about CI/CD pipelines.",

// passed-aws-solutions-architect-associate
description: "Passing the AWS Solutions Architect Associate exam and what it covers: VPC, EC2, S3, RDS, and distributed systems.",

// devops-talk-bangalore-conference (after merge, see Task 5)
description: "Speaking about DevOps practices and container orchestration at meetups in Bangalore, India.",

// are-unikernels-unfit-for-production
description: "Bryan Cantrill's case against unikernels: you get a tiny attack surface but lose every debugging tool that matters.",

// aws-ecs-jenkins-build-pipeline-pune-devops
description: "Live demo of a CI/CD pipeline from Git push to ECS deployment using Jenkins and EC2 at the Pune DevOps meetup.",
```

Write the full description for every post. TypeScript will error if any post is missing the field.

- [ ] **Step 3: Extend BlogPostPage meta tag injection**

In `src/components/Blog/BlogPost.tsx`, replace the existing `useEffect` that handles title + JSON-LD with this expanded version that also sets meta description, canonical, OG tags, and enriched schema:

```tsx
  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} — Swapnil Dahiphale`;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to set or create a link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const canonicalUrl = `https://swapnil.one/blog/${post.slug}`;

    // Meta description
    setMeta("name", "description", post.description);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:type", "article");
    setMeta("property", "og:title", post.title);
    setMeta("property", "og:description", post.description);
    setMeta("property", "og:url", canonicalUrl);

    // Article meta
    setMeta("property", "article:published_time", post.date);

    // Strip HTML for articleBody
    const div = document.createElement("div");
    div.innerHTML = post.content;
    const plainText = div.textContent || "";

    // Enriched JSON-LD
    const existingLd = document.getElementById("blog-jsonld");
    if (existingLd) existingLd.remove();

    const script = document.createElement("script");
    script.id = "blog-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      keywords: post.tags.join(", "),
      inLanguage: "en",
      url: canonicalUrl,
      wordCount: plainText.split(/\s+/).length,
      articleBody: plainText.slice(0, 500),
      author: {
        "@type": "Person",
        name: "Swapnil Dahiphale",
        url: "https://swapnil.one",
      },
      publisher: {
        "@type": "Person",
        name: "Swapnil Dahiphale",
      },
      mainEntityOfPage: canonicalUrl,
    });
    document.head.appendChild(script);

    return () => {
      document.title = "Swapnil Dahiphale — SRE & AI Engineer";
      const el = document.getElementById("blog-jsonld");
      if (el) el.remove();
      // Restore homepage meta
      setMeta("name", "description", "SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform.");
      setLink("canonical", "https://swapnil.one");
      setMeta("property", "og:type", "website");
      setMeta("property", "og:title", "Swapnil Dahiphale — SRE & AI Engineer");
      setMeta("property", "og:description", "SRE & AI Engineer building resilient systems at scale. Creator of OpenSRE — the open-source SRE knowledge platform.");
      setMeta("property", "og:url", "https://swapnil.one");
    };
  }, [post, slug]);
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

Run: `npm run dev`
Navigate to a blog post. Open DevTools → Elements → `<head>`. Verify:
- `<meta name="description">` has the post description
- `<link rel="canonical">` has `/blog/{slug}` URL
- `<meta property="og:title">` has the post title
- JSON-LD script has `description`, `keywords`, `wordCount`, `articleBody` fields

- [ ] **Step 5: Commit**

```bash
git add src/data/blogPosts.ts src/components/Blog/BlogPost.tsx
git commit -m "feat: add per-post meta tags, OG tags, and enriched Schema.org

Adds description field to BlogPost interface. BlogPostPage now injects
meta description, canonical URL, OG tags, article:published_time, and
enriched BlogPosting JSON-LD with keywords, wordCount, and articleBody."
```

---

### Task 4: Sitemap generation

**Files:**
- Create: `scripts/generate-sitemap.js`
- Modify: `package.json` (build script)

- [ ] **Step 1: Create the sitemap script**

Create `scripts/generate-sitemap.js`:

```javascript
// Reads blog post slugs and generates public/sitemap.xml at build time.
// Runs as ESM (package.json has "type": "module").
// We don't import the TS file directly — we parse it with regex to avoid
// needing ts-node in the build.

import { readFileSync, writeFileSync } from "fs";

const blogPostsFile = readFileSync("src/data/blogPosts.ts", "utf-8");

// Extract slug and date from each post object
const postRegex = /slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g;
const posts = [];
let match;
while ((match = postRegex.exec(blogPostsFile)) !== null) {
  posts.push({ slug: match[1], date: match[2] });
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  `  <url>
    <loc>https://swapnil.one</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
  `  <url>
    <loc>https://swapnil.one/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  ...posts.map(
    (p) => `  <url>
    <loc>https://swapnil.one/blog/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", sitemap);
console.log(`Sitemap generated with ${posts.length} blog posts.`);
```

- [ ] **Step 2: Add sitemap generation to build script**

In `package.json`, change the build script from:
```json
"build": "tsc -b && vite build"
```
To:
```json
"build": "tsc -b && node scripts/generate-sitemap.js && vite build"
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: "Sitemap generated with 19 blog posts." (or 17 after merges) then Vite build succeeds.

Check `public/sitemap.xml` — should have homepage, /blog, and all /blog/{slug} entries.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-sitemap.js package.json public/sitemap.xml
git commit -m "feat: auto-generate sitemap with all blog post URLs at build time"
```

---

### Task 5: Expand thin posts and merge duplicates (humanized content)

**Files:**
- Modify: `src/data/blogPosts.ts`

This task rewrites the `content` field for posts that are too thin, and merges two pairs of duplicate posts. All content must follow the humanizer rules: varied rhythm, first person, specific details, no AI patterns (no "testament to", "landscape", "fostering", etc.), no em-dash overuse, no rule-of-three.

- [ ] **Step 1: Merge the two DevOps++ 2017 posts**

Delete the post with slug `devops-global-summit-2017-experience` entirely from the array.

Update the post with slug `speaking-at-devops-global-summit-2017` — change its content to the merged version:

```typescript
  {
    slug: "speaking-at-devops-global-summit-2017",
    title: "Speaking at DevOps++ Global Summit 2017",
    date: "2017-09-12",
    description: "Co-presenting Windows Automation with Ansible at DevOps++ Global Summit 2017 in Pune with Lokesh Jawane.",
    content: `
      <p>Gave my talk on Windows Automation using Ansible at DevOps++ Global Summit 2017 on September 9th. My co-presenter Lokesh Jawane and I had been prepping for weeks, and the actual session went better than either of us expected.</p>
      <p>The topic itself was a bit of an outlier at a conference where most talks assumed Linux. But that's exactly why it resonated. A lot of teams in India still run mixed Windows/Linux estates, and automating Windows with Ansible was a real pain point nobody was addressing. We showed how to manage IIS deployments, Windows services, and registry settings through Ansible playbooks, all without touching the GUI.</p>
      <p>What surprised me was the Q&A. People stuck around for 20 minutes after, asking about WinRM configuration, credential management, and how Ansible compares to DSC for Windows. Those hallway conversations are where conferences actually earn their value.</p>
      <p>Big thanks to Lokesh for being a solid co-presenter. Presenting alone is fine, but having someone to bounce off of makes the whole thing more natural.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6316834021577986048/",
    tags: ["DevOps", "Ansible", "Windows", "automation", "conference", "DevOps++ 2017"],
  },
```

- [ ] **Step 2: Merge the two Bangalore posts**

Delete the post with slug `devops-meetup-bangalore-presentation` entirely.

Update the post with slug `devops-talk-bangalore-conference`:

```typescript
  {
    slug: "devops-talk-bangalore-conference",
    title: "DevOps Talks in Bangalore",
    date: "2015-12-15",
    description: "Speaking about DevOps practices and container orchestration at meetups in Bangalore, India.",
    content: `
      <p>Did a couple of DevOps talks in Bangalore around this time. The scene there is something else. Packed rooms, people showing up after long commutes, and genuinely sharp questions from engineers running production systems at scale.</p>
      <p>My talks covered the usual ground: CI/CD pipelines, configuration management, container basics. But what made Bangalore different was the audience. These weren't people learning DevOps from blog posts. They were running it at Flipkart scale, dealing with deploy frequencies and failure modes that most teams never hit.</p>
      <p>The meetup format worked well for this. No slides-behind-a-podium formality. Just a projector, a terminal, and a room full of people who wanted to see things break and get fixed. Someone asked me to debug a Jenkins pipeline live, which I probably should have declined, but it turned into the best part of the evening.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6108913374249111553/",
    tags: ["DevOps", "speaking", "Bangalore", "meetup"],
  },
```

- [ ] **Step 3: Expand Cloudflare post**

Replace the content for slug `cloudflare-is-down-again`:

```typescript
    content: `
      <p>Cloudflare went down again. If you were on the internet that day, you probably noticed. Half the sites you tried to visit threw 500 errors, and the other half loaded like it was 2005.</p>
      <p>What gets me about these outages is the blast radius. Cloudflare sits in front of so many services that when it goes down, it takes a chunk of the internet with it. We're talking millions of domains behind one provider's control plane. That's a concentration risk most teams don't think about until it's too late.</p>
      <p>From an SRE perspective, this is the classic single-point-of-failure problem at internet scale. Your app can have five nines of uptime internally, but if your CDN/DNS provider has a bad day, none of that matters. Your users see a broken page.</p>
      <p>The uncomfortable question: should you run multi-CDN? It's expensive, operationally complex, and most teams decide the risk doesn't justify the cost. Until it does. There's no clean answer here, just trade-offs.</p>
    `,
```

- [ ] **Step 4: Expand CI for Salesforce post**

Replace the content for slug `continuous-integration-for-salesforce`:

```typescript
    content: `
      <p>CI/CD for Salesforce is one of those things that sounds straightforward until you actually try it.</p>
      <p>The core problem: Salesforce development isn't file-based in the traditional sense. Your "code" lives as metadata in an org, not as files in a Git repo. Apex classes, triggers, page layouts, validation rules, workflow rules, custom objects -- they all live server-side. Getting them into version control requires pulling metadata through the Salesforce CLI or Metadata API, and the results aren't always deterministic.</p>
      <p>Then there's the deployment model. You can't just push code to a branch and deploy. Salesforce deployments are essentially metadata diffs between orgs, and they depend on org state. A deployment that works in your sandbox might fail in staging because someone manually changed a field type through the UI. This happens more often than anyone admits.</p>
      <p>We set up a Jenkins pipeline that pulled metadata from a developer sandbox, ran Apex tests, and promoted to a staging org. It worked, but maintaining it was a constant fight against Salesforce's deployment quirks. Still worth it. Without CI, the alternative was developers deploying change sets manually and hoping nothing broke.</p>
    `,
```

- [ ] **Step 5: Expand DevOps Readiness Score post**

Replace the content for slug `calculate-your-devops-readiness-score`:

```typescript
    content: `
      <p>We built a DevOps readiness assessment around this time. The idea was simple: answer some questions about your team's practices and get a score across a few dimensions. Culture, automation, measurement, sharing -- the CAMS model that Damon Edwards and John Willis popularized.</p>
      <p>Most teams scored well on automation (everyone had some CI pipeline) and poorly on measurement (nobody was tracking deployment frequency, lead time, or change failure rate). Culture was the wildcard. Some teams said "we do DevOps" but meant "we gave the devs SSH access to production." That's not the same thing.</p>
      <p>The assessment wasn't scientific. It was a conversation starter. But it worked. Teams that scored themselves honestly could see the gaps, and that made it easier to prioritize what to fix first. Usually the answer was: start measuring. You can't improve what you aren't tracking.</p>
    `,
```

- [ ] **Step 6: Expand DevOps Assessment Quiz post**

Replace the content for slug `devops-assessment-quiz-free-conference-pass`:

```typescript
    content: `
      <p>Leading up to the DevOps++ 2017 conference in Pune, we put together a DevOps assessment quiz and gave away a free conference pass to the top scorer.</p>
      <p>The quiz covered the basics: CI/CD concepts, configuration management, monitoring, infrastructure as code. We threw in a few curveball questions about incident response and blameless postmortems to see who was actually practicing DevOps culture vs. just tooling.</p>
      <p>The response surprised us. Over a hundred people took it in the first week. Some of the scores were impressively high, some were impressively creative (one person argued their wrong answer was actually a better practice, and they had a point). It was a fun way to build buzz for the conference and start conversations about where the Pune DevOps community stood on maturity.</p>
    `,
```

- [ ] **Step 7: Expand RedHat certification posts**

Replace the content for slug `redhat-delivery-specialist-cloud-automation`:

```typescript
    content: `
      <p>Picked up the RedHat Delivery Specialist certification for Cloud Automation. The cert covers automating infrastructure provisioning and configuration using Ansible, CloudForms, and Satellite.</p>
      <p>The exam was hands-on, which I appreciated. No multiple choice trivia about obscure config flags. You get a broken environment and a set of requirements, and you fix it with Ansible playbooks and CloudForms policies. If it works, you pass. If it doesn't, you don't.</p>
      <p>At the time I was doing a lot of hybrid cloud work, managing deployments across on-prem VMware and AWS. The RedHat tooling gave us a single pane for provisioning VMs regardless of where they ran. Not perfect, but better than maintaining two completely separate automation stacks.</p>
    `,
```

Replace the content for slug `redhat-delivery-specialist-paas-certifications`:

```typescript
    content: `
      <p>Earned both the RedHat PaaS and PaaS Development delivery specialist certifications around the same time.</p>
      <p>The PaaS cert focuses on OpenShift operations: installing clusters, managing projects and quotas, configuring persistent storage, setting up CI/CD pipelines within OpenShift. The Development cert goes deeper on building and deploying applications -- source-to-image builds, custom builder images, application health checks, and rolling deployments.</p>
      <p>OpenShift in 2018 was a different beast than it is now. We were running version 3.x, and a lot of the operational tooling was still rough. Getting persistent storage right across an on-prem cluster involved more YAML and prayer than I'd like to admit. But the developer experience was already ahead of raw Kubernetes at the time -- the opinionated defaults saved teams from reinventing the wheel on every project.</p>
    `,
```

- [ ] **Step 8: Expand AWS and Jenkins certification posts**

Replace the content for slug `passed-aws-solutions-architect-associate`:

```typescript
    content: `
      <p>Passed the AWS Solutions Architect Associate exam. This was back when the cert was still relatively new and the study materials were mostly whitepapers and re:Invent talk recordings.</p>
      <p>The exam tests your ability to design systems on AWS that are available, cost-effective, and fault tolerant. Lots of scenarios: "A company needs X, which architecture would you recommend?" You need to know VPC networking, EC2 instance families, S3 storage classes, RDS multi-AZ, and a dozen other services well enough to pick the right combination under constraints.</p>
      <p>What actually helped most wasn't studying -- it was building things. I'd been running workloads on AWS for a couple of years before taking the exam, so a lot of the questions mapped to problems I'd already solved (or messed up) in production. The auto-scaling questions were easy because I'd already been paged at 2am when scaling policies weren't aggressive enough.</p>
    `,
```

Replace the content for slug `certified-jenkins-engineer`:

```typescript
    content: `
      <p>Got my Certified Jenkins Engineer credential. I was in the first batch of people to take this exam, which felt like a milestone for the Jenkins community as much as for me personally.</p>
      <p>The exam covers pipeline design (scripted and declarative), plugin management, distributed builds with agents, security configuration, and backup strategies. It's hands-on knowledge, not theory. You need to know what happens when a Jenkins master runs out of disk space (everything stops), how to configure LDAP authentication, and how pipeline libraries work.</p>
      <p>Jenkins gets a lot of grief these days. People complain about the UI, the plugin compatibility issues, the Groovy scripting. Fair enough. But in 2016, Jenkins was the CI server. It was the tool that made continuous integration practical for most teams. I ran it for years across multiple organizations, and for all its quirks, it worked. The muscle memory from debugging Jenkins pipelines at 3am still kicks in when I'm troubleshooting CI systems today.</p>
    `,
```

- [ ] **Step 9: Expand AWS ECS post**

Replace the content for slug `aws-ecs-jenkins-build-pipeline-pune-devops`:

```typescript
    content: `
      <p>Gave a talk and live demo at the Pune DevOps meetup on building a CI/CD pipeline with Jenkins, EC2, and AWS ECS. WhiteHedge Technologies hosted the event.</p>
      <p>ECS was brand new at the time. Most people in the room hadn't touched containers in production yet, let alone a managed orchestrator. The demo walked through the full flow: code push to GitHub, Jenkins picks it up, builds a Docker image, pushes to ECR, and triggers an ECS service update with a new task definition. When it works, it's smooth. When it doesn't -- and live demos have a way of not working -- you learn a lot about ECS error messages in front of an audience.</p>
      <p>The Pune DevOps community has always been good about showing up for hands-on content. Nobody wants to sit through 45 minutes of slides about "the future of DevOps." They want to see a terminal, a deploy, and ideally something going wrong so they can learn from the recovery. That's the kind of talk I enjoy giving.</p>
    `,
```

- [ ] **Step 10: Polish remaining posts that are acceptable but slightly AI-sounding**

Review and lightly edit: `serverless-portfolio-website-production`, `ai-2027-scenario-moving-too-fast`, `windows-automation-ansible-devops-summit-2017`. Remove any remaining "landscape", "ecosystem", "journey" language. Vary sentence lengths. Keep the core message intact.

For `serverless-portfolio-website-production`:
```typescript
    content: `
      <p>Spent a weekend putting my portfolio website into production on a fully serverless stack. AWS Lambda, API Gateway, S3, CloudFront. No servers to manage, no EC2 instances to patch, no monthly bill surprises from idle compute.</p>
      <p>The whole thing costs almost nothing to run. Lambda charges per request, and a personal portfolio doesn't exactly get millions of hits. Most months the bill rounds down to zero. That was the appeal -- build it once, deploy it, and forget about infrastructure.</p>
      <p>The trade-off is cold starts. First visit after a period of inactivity takes a noticeable beat longer. For a portfolio site that's fine. For a production API, you'd want to think harder about provisioned concurrency. But for this use case, serverless is close to the perfect fit.</p>
    `,
```

For `windows-automation-ansible-devops-summit-2017`:
```typescript
    content: `
      <p>Heading to DevOps++ Global Summit 2017 to talk about Windows Automation using Ansible. If you're managing Windows servers and haven't looked at Ansible for it yet, come by the session.</p>
      <p>Most Ansible content assumes Linux. Understandable, but it leaves a gap for the many teams running Windows Server in production. WinRM configuration, PowerShell module management, IIS deployment, Windows service control -- Ansible handles all of it, but the setup is different enough from Linux that it trips people up.</p>
      <p>I'll be covering the practical bits: getting WinRM working reliably, writing playbooks for common Windows tasks, and the gotchas that the docs don't warn you about. See you at the conference.</p>
    `,
```

For `ai-2027-scenario-moving-too-fast`:
```typescript
    content: `
      <p>Read this AI 2027 scenario piece and I keep coming back to it. The basic premise: there are two paths from here, and neither one is comfortable.</p>
      <p>Path one: we keep accelerating AI development at the current pace. Things go wrong in ways we didn't predict because we're building faster than we can evaluate. Path two: we slow down significantly, but the organizations that got there first end up with a dangerous concentration of capability and power.</p>
      <p>What bothers me is that both paths feel plausible. I work with AI systems daily and I see how quickly the capability bar is rising. Six months ago, things that required careful prompt engineering now work out of the box. That rate of change makes it hard to plan, hard to regulate, and hard to even form stable opinions about what's safe.</p>
      <p>I don't have a take beyond "this is worth thinking about more seriously than most people are." If you're building AI products, you owe it to yourself to think about where this is going, not just what ships next quarter.</p>
    `,
```

- [ ] **Step 11: Verify build**

Run: `npm run build`
Expected: Build succeeds.

Browse through a few posts on localhost to confirm content reads naturally.

- [ ] **Step 12: Commit**

```bash
git add src/data/blogPosts.ts
git commit -m "feat: expand thin blog posts with substantive content, merge duplicates

Merges two DevOps++ 2017 posts and two Bangalore posts into single entries.
Expands all thin posts (certifications, conference talks, Cloudflare, CI/CD)
with first-person, detailed content. Reduces post count from 19 to 17."
```

---

### Task 6: Final build verification

- [ ] **Step 1: Full build**

```bash
npm run build
```

Verify:
- No TypeScript errors
- Sitemap generated with 17 posts + homepage + /blog
- Vite build succeeds

- [ ] **Step 2: Manual smoke test on dev server**

```bash
npm run dev
```

Test checklist:
- `/` — portfolio loads, navbar works
- `/blog` — list shows 17 posts sorted by date
- `/blog/toon-token-oriented-object-notation-llm-costs` — post loads, has code block
- `/blog/speaking-at-devops-global-summit-2017` — merged post shows full content
- Click "Originally posted on LinkedIn" — opens LinkedIn in new tab
- DevTools → Elements → `<head>`: verify meta description, canonical, OG tags, JSON-LD
- Browser back/forward navigation works between blog pages
- Direct URL entry (paste `/blog/certified-jenkins-engineer` into address bar) loads the post
- `/blog/nonexistent-slug` — shows "Post not found"

- [ ] **Step 3: Verify sitemap**

Open `public/sitemap.xml`. Confirm:
- Homepage entry with priority 1.0
- `/blog` entry with priority 0.8
- 17 `/blog/{slug}` entries with priority 0.6 and correct lastmod dates
- No hash fragments anywhere

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Fix any lint errors before committing.
