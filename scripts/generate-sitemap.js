// Reads blog post slugs and generates public/sitemap.xml at build time.
// Runs as ESM (package.json has "type": "module").

import { readFileSync, writeFileSync } from "fs";

const posts = JSON.parse(readFileSync("src/data/blogPosts.json", "utf-8"));

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
