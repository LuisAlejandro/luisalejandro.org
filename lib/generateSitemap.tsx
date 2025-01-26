
import path from "node:path";

import { writeFile } from "node:fs/promises";
import { canonicalHostnameUrl } from "@constants/constants";
import { getAllPostsForHome, getAllCategories } from "@lib/api";

export default async function generateSitemap() {
  
  const basedir = process.cwd();
  const sitemapUrlPath = "sitemap.xml";
  const robotsUrlPath = "robots.txt";
  const sitemapPath = path.join(basedir, "public", sitemapUrlPath);
  const robotsPath = path.join(basedir, "public", robotsUrlPath);

  const robotsTemplate = `# *
User-agent: *
Allow: /

# Host
Host: ${canonicalHostnameUrl}

# Sitemaps
Sitemap: ${canonicalHostnameUrl}/sitemap.xml`;

  const posts = await getAllPostsForHome();
  const categories = await getAllCategories();
  const caseStudies = [
    "expedia",
    "soleit",
    "dockershelf",
    "canaima",
    "wheeltheworld",
    "collagelabs",
  ];

  const sitemapPostsItems = posts.map(
    (post: any) => `<url>
  <loc>${canonicalHostnameUrl}/blog/posts/${post.slug}</loc>
  <lastmod>${post.created_at}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`
  );
  const sitemapCategoriesItems = categories.map(
    (category: any) => `<url>
  <loc>${canonicalHostnameUrl}/blog/category/${category.slug}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
</url>`
  );
  const sitemapCaseStudiesItems = caseStudies.map(
    (caseStudy) => `<url>
  <loc>${canonicalHostnameUrl}/case-studies/${caseStudy}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.3</priority>
</url>`
  );

  const sitemapTemplate = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      <url>
          <loc>${canonicalHostnameUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
      </url>
      <url>
          <loc>${canonicalHostnameUrl}/portfolio</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.3</priority>
      </url>
      ${sitemapCaseStudiesItems.join("")}
      <url>
          <loc>${canonicalHostnameUrl}/blog</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>hourly</changefreq>
          <priority>1.0</priority>
      </url>
      ${sitemapCategoriesItems.join("")}
      ${sitemapPostsItems.join("")}
  </urlset>`;

  await writeFile(sitemapPath, sitemapTemplate);
  await writeFile(robotsPath, robotsTemplate);
}
