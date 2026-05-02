// Generates static HTML for /blog and /blog/:slug after `vite build`,
// so unauthenticated fetchers (search engines, link previewers, curl) get
// fully-rendered post lists and post bodies instead of an empty SPA shell.
//
// Output:
//   dist/blog/index.html         server-rendered post list
//   dist/blog/<slug>/index.html  server-rendered post page
//
// Vercel serves these static files before the SPA rewrite catch-all.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const distDir = join(repoRoot, "dist");

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run `vite build` first.");
  process.exit(1);
}

const posts = JSON.parse(
  readFileSync(join(repoRoot, "src/data/blogPosts.json"), "utf-8")
);
const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const SHELL = readFileSync(join(distDir, "index.html"), "utf-8");
const LINKEDIN = "https://www.linkedin.com/in/swapnil2233/";
const X = "https://x.com/Swapnil2233";
const GITHUB = "https://github.com/swapnildahiphale/";
const SITE = "https://swapnil.one";

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const stripHtml = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const headerHtml = `<nav class="blog-nav" aria-label="Primary">
      <a href="/" class="blog-nav-link">Home</a>
      <a href="/blog" class="blog-nav-link">Blog</a>
      <a href="${LINKEDIN}" class="blog-nav-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="${X}" class="blog-nav-link" target="_blank" rel="noopener noreferrer">X</a>
    </nav>`;

const footerHtml = `<footer class="blog-footer">
      <p>Swapnil Dahiphale &middot; SRE &amp; AI Engineer</p>
      <p>
        <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span aria-hidden="true"> &middot; </span>
        <a href="${X}" target="_blank" rel="noopener noreferrer">X</a>
        <span aria-hidden="true"> &middot; </span>
        <a href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </footer>`;

const renderTagPills = (tags) =>
  tags
    .map(
      (t) => `<span class="blog-post-tag">${escapeHtml(t)}</span>`
    )
    .join("\n              ");

const renderPostCard = (post) => `<a href="/blog/${post.slug}" style="text-decoration: none; color: inherit;">
        <div class="blog-post-card">
          <h2>${escapeHtml(post.title)}</h2>
          <p class="blog-post-date">${formatDate(post.date)}</p>
          <p class="blog-post-excerpt">${escapeHtml(post.description)}</p>
          <div class="blog-post-tags">
              ${renderTagPills(post.tags)}
          </div>
        </div>
      </a>`;

const blogIndexBody = `<div class="blog-container">
      ${headerHtml}
      <div class="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on SRE, AI engineering, and building OpenSRE.</p>
      </div>
      ${sortedPosts.map(renderPostCard).join("\n      ")}
      ${footerHtml}
    </div>`;

const renderPostBody = (post) => {
  const linkedinCta = post.linkedinUrl
    ? `<a href="${escapeHtml(post.linkedinUrl)}" target="_blank" rel="noopener noreferrer" class="blog-linkedin-link">Originally posted on LinkedIn &rarr;</a>`
    : "";
  return `<div class="blog-container">
      ${headerHtml}
      <a href="/blog" class="blog-back-link">&larr; Back to Blog</a>
      <article class="blog-post-full">
        <h1>${escapeHtml(post.title)}</h1>
        <div class="blog-post-meta">
          ${formatDate(post.date)}
          <div class="blog-post-tags" style="margin-top: 12px;">
              ${renderTagPills(post.tags)}
          </div>
        </div>
        <div class="blog-post-content">${post.content}</div>
        ${linkedinCta}
      </article>
      ${footerHtml}
    </div>`;
};

const buildPage = ({ title, description, canonicalUrl, ogType, jsonLd, body, articleDate }) => {
  let html = SHELL;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  const replaceMeta = (input, attr, key, value) =>
    input.replace(
      new RegExp(`<meta ${attr}="${key}"[^>]*?/>`),
      `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`
    );

  html = replaceMeta(html, "name", "description", description);
  html = replaceMeta(html, "property", "og:type", ogType);
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", description);

  html = html.replace(
    /<link rel="canonical"[^>]*?\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  if (articleDate) {
    html = html.replace(
      /<\/head>/,
      `  <meta property="article:published_time" content="${escapeHtml(articleDate)}" />\n</head>`
    );
  }

  if (jsonLd) {
    const jsonLdTag = `<script type="application/ld+json" id="blog-jsonld">${JSON.stringify(
      jsonLd
    ).replace(/</g, "\\u003c")}</script>`;
    html = html.replace(/<\/head>/, `  ${jsonLdTag}\n</head>`);
  }

  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">\n    ${body}\n    </div>`
  );

  return html;
};

const writeFile = (relPath, contents) => {
  const fullPath = join(distDir, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
};

const indexHtml = buildPage({
  title: "Blog — Swapnil Dahiphale",
  description: "Thoughts on SRE, AI engineering, and building OpenSRE.",
  canonicalUrl: `${SITE}/blog`,
  ogType: "website",
  body: blogIndexBody,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Swapnil Dahiphale — Blog",
    url: `${SITE}/blog`,
    description: "Thoughts on SRE, AI engineering, and building OpenSRE.",
    author: { "@type": "Person", name: "Swapnil Dahiphale", url: SITE },
    blogPost: sortedPosts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}`,
      description: p.description,
    })),
  },
});
writeFile("blog/index.html", indexHtml);

for (const post of sortedPosts) {
  const canonicalUrl = `${SITE}/blog/${post.slug}`;
  const plainText = stripHtml(post.content);
  const html = buildPage({
    title: `${post.title} — Swapnil Dahiphale`,
    description: post.description,
    canonicalUrl,
    ogType: "article",
    articleDate: post.date,
    body: renderPostBody(post),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      keywords: post.tags.join(", "),
      inLanguage: "en",
      url: canonicalUrl,
      wordCount: plainText.split(/\s+/).filter(Boolean).length,
      articleBody: plainText.slice(0, 500),
      author: { "@type": "Person", name: "Swapnil Dahiphale", url: SITE },
      publisher: { "@type": "Person", name: "Swapnil Dahiphale" },
      mainEntityOfPage: canonicalUrl,
    },
  });
  writeFile(`blog/${post.slug}/index.html`, html);
}

console.log(
  `Prerendered ${sortedPosts.length} post(s) + blog index into dist/blog/.`
);
