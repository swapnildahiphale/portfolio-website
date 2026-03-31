# Blog SEO + GEO (LLM discoverability) design

## Context

The portfolio blog has 19 posts (1 original + 18 imported from LinkedIn). Currently all blog routes use hash-based URLs (`/#/blog/slug`) which are invisible to search engines and LLM crawlers. Meta tags are static (homepage only), the sitemap lists only the homepage, and many posts are 1-3 sentences. This spec addresses all of it.

Hosting: Vercel (static SPA).

## 1. Routing: hash to React Router

**What changes:**
- Add `react-router-dom` dependency
- Replace `src/components/Blog/BlogRouter.tsx` (custom hash parser) with React Router `BrowserRouter`
- Routes: `/` (portfolio), `/blog` (list), `/blog/:slug` (post)
- `Navbar.tsx` blog link: `href="/blog"` instead of `href="#/blog"`
- `BlogList.tsx` post links: `href="/blog/${slug}"` instead of `href="#/blog/${slug}"`
- Back links: `/blog` and `/` instead of `#/blog` and `#/`

**Vercel config** (`vercel.json` in project root):
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Vite dev server**: already returns index.html for unknown paths, no config needed.

**Hierarchy preserved**: `BlogRouter` currently wraps `LoadingProvider` in `App.tsx`. The new router maintains the same component hierarchy — portfolio content renders inside `LoadingProvider`, blog routes render outside it (same as today).

**Files modified:**
- `package.json` (add react-router-dom)
- `src/App.tsx` (BrowserRouter setup)
- `src/components/Blog/BlogRouter.tsx` (delete — routing logic moves into App.tsx using React Router's Routes/Route)
- `src/components/Blog/BlogList.tsx` (link hrefs)
- `src/components/Blog/BlogPost.tsx` (back link href)
- `src/components/Navbar.tsx` (blog link href)
- `vercel.json` (new file)

## 2. Per-post SEO meta tags

**New field on BlogPost interface:**
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;  // NEW: 1-2 sentence summary for meta/OG
  content: string;
  linkedinUrl?: string;
  tags: string[];
}
```

**Dynamic meta injection in BlogPost.tsx useEffect** (extending existing logic):
- `<meta name="description" content="${post.description}">`
- `<link rel="canonical" href="https://swapnil.one/blog/${post.slug}">`
- `<meta property="og:title" content="${post.title}">`
- `<meta property="og:description" content="${post.description}">`
- `<meta property="og:url" content="https://swapnil.one/blog/${post.slug}">`
- `<meta property="og:type" content="article">`
- `<meta name="article:published_time" content="${post.date}">`

On cleanup, restore homepage defaults.

**Note:** Social media crawlers (LinkedIn, Twitter) don't execute JS, so shared links show homepage OG. This is a known limitation; fixing it requires Vercel Edge Middleware or build-time HTML generation (deferred to follow-up).

**Files modified:**
- `src/data/blogPosts.ts` (add description field to interface and all posts)
- `src/components/Blog/BlogPost.tsx` (extend useEffect meta injection)

## 3. Schema.org enrichment

**Enrich BlogPosting JSON-LD** (already injected in BlogPost.tsx useEffect):

Add fields:
- `description` — from post.description
- `keywords` — from post.tags (joined as comma-separated string)
- `inLanguage` — `"en"`
- `url` — `https://swapnil.one/blog/${post.slug}`
- `articleBody` — plain text, first 500 chars of content (HTML stripped)
- `wordCount` — computed from stripped content

**Update index.html schemas:**
- No path changes needed in Person/WebSite schemas (they reference the root domain)

**Files modified:**
- `src/components/Blog/BlogPost.tsx`

## 4. Sitemap generation

**Build-time sitemap script** (`scripts/generate-sitemap.ts` or `.js`):
- Imports blog post slugs and dates from `src/data/blogPosts.ts`
- Generates `public/sitemap.xml` with:
  - `https://swapnil.one/` (priority 1.0, monthly)
  - `https://swapnil.one/blog` (priority 0.8, weekly)
  - `https://swapnil.one/blog/${slug}` for each post (priority 0.6, lastmod from post date)
- Runs as part of `npm run build` (added to build script in package.json)

**Files modified:**
- `scripts/generate-sitemap.ts` (new)
- `package.json` (build script includes sitemap generation)
- `public/sitemap.xml` (generated, overwritten on each build)

## 5. Content expansion + humanizer

**Posts needing expansion** (currently 1-3 sentences, target 150-300 words each):

| Post | Current state | Expansion direction |
|------|--------------|-------------------|
| Cloudflare is Down, Again! | 1 sentence | What happened, SRE perspective on recurring outages |
| CI for Salesforce | 1 sentence (just hashtags) | CI challenges in Salesforce: metadata-driven, no native Git |
| DevOps Readiness Score | 1 sentence | What maturity dimensions matter, why assessment helps |
| Speaking at DevOps++ 2017 | 1 sentence | Merge with recap post into one richer post |
| DevOps++ Summit Experience | 3 sentences | Merged into above |
| DevOps Talk Bangalore | 1 sentence | Merge with Meetup Bangalore into one post |
| DevOps Meetup Bangalore | 1 sentence | Merged into above |
| DevOps Assessment Quiz | 2 sentences | What the quiz measured, conference context |
| RedHat Cloud Automation cert | 2 sentences | What the cert covers, career context |
| RedHat PaaS certs | 3 sentences | What PaaS/OpenShift expertise means |
| AWS Solutions Architect | 1 sentence | What the exam covers, cloud journey context |
| Certified Jenkins Engineer | 3 sentences | Already decent, light expansion |
| AWS ECS Jenkins Pipeline | 2 sentences | What the demo covered, ECS in 2015 context |

**Posts that are solid** (polish only): TOON, AI 2027, Serverless Portfolio, Unikernels, Windows Automation Ansible, Join Me at DevOps++ 2017.

**Merges:**
- "Speaking at DevOps++ 2017" + "DevOps++ Summit Experience" → single post
- "DevOps Talk Bangalore" + "DevOps Meetup Bangalore" → single post

This reduces 19 posts to 17 posts after merges.

**Humanizer rules applied to all content:**
- Varied sentence rhythm (short + long mixed)
- First-person voice where natural
- No AI patterns: no "testament to", "pivotal", "landscape", "fostering"
- No inline-header bullet lists with bolded labels
- No rule-of-three, no em-dash overuse
- Specific details over vague claims
- Opinions and personality where appropriate

**Files modified:**
- `src/data/blogPosts.ts` (all post content updated)

## Verification

After implementation:
1. `npm run build` succeeds with no TypeScript errors
2. `npm run dev` — navigate to `/blog`, click into posts, verify routing works without `#`
3. Check that browser back/forward navigation works
4. Inspect `<head>` on a blog post page — verify meta description, OG tags, canonical, JSON-LD
5. View `public/sitemap.xml` — verify all 17 posts are listed with correct URLs
6. Read through expanded posts — no AI writing patterns
7. Deploy to Vercel preview — verify routes work with the rewrite rule
