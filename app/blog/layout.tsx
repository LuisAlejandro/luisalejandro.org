import { Metadata } from "next";

import { config } from "@constants/constants";

/**
 * Language strategy for the blog.
 *
 * The site ships a single root layout (`app/layout.tsx`) declaring lang="en",
 * because the site chrome — navigation, footer, search, share labels — is
 * English everywhere, including around Spanish articles. The Spanish content
 * is marked instead: `lang="es"` on the article prose and on every Spanish
 * title, teaser and category name, with the English labels around them left
 * in the site language.
 *
 * Why not a second root layout with lang="es": two root layouts give correct
 * <html lang> but make every navigation between the blog and the rest of the
 * site a full page load. Google ignores the lang attribute for language
 * detection and relies on content plus hreflang, so the only real beneficiaries
 * are screen readers, spell-check, and translation prompts — all of which honor
 * nested lang. See WCAG 3.1.1 and 3.1.2.
 *
 * Do not split this into multiple root layouts without accepting the reload.
 */
import "@styles/tailwind.css";
import { PAPER, pageMeta } from "@lib/metadata";

const blogTitle =
  "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto";
const blogDescription =
  "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.";

export const metadata: Metadata = {
  ...pageMeta({
    title: blogTitle,
    description: blogDescription,
    path: "/blog",
    locale: "es_VE",
  }),
  keywords: [
    "software development blog",
    "programming blog",
    "TypeScript blog",
    "Python programming blog",
    "Golang blog",
    "remote work blog",
    "Venezuelan developer blog",
    "open source blog",
    "web development blog",
    "full stack developer blog",
    "technical blog",
    "coding blog",
    "software engineering blog",
    "DevOps blog",
    "React development blog",
    "Next.js blog",
    "Docker blog",
    "API development blog",
    "remote work tips",
    "software architecture blog",
  ],
  authors: [{ name: config.author.name }],
  generator: config.generator,
  applicationName: config.app_name,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${config.url}/blog`,
    types: {
      "application/rss+xml": [
        {
          url: `${config.url}/blog/posts/feed.xml`,
          title: "RSS feed",
        },
      ],
      "application/atom+xml": [
        {
          url: `${config.url}/blog/posts/atom.xml`,
          title: "Atom feed",
        },
      ],
      "application/feed+json": [
        {
          url: `${config.url}/blog/posts/feed.json`,
          title: "JSON feed",
        },
      ],
      "application/xml": [
        {
          url: `${config.url}/sitemap.xml`,
          title: "Sitemap",
        },
      ],
      "text/markdown": [
        {
          url: "/blog.md",
          title: "Markdown twin",
        },
      ],
    },
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,

    // Dublin Core metadata
    "dcterms.title": blogTitle,
    "dcterms.description": blogDescription,
    "dcterms.language": "es",
    "dcterms.type": "Collection",
    "dcterms.source": config.url,
    "dcterms.creator": config.author.name,
    "dcterms.publisher": config.author.name,

    // Microsoft Application metadata
    "msapplication-starturl": config.url,
    "msapplication-tooltip": config.app_name,
    "msapplication-window": "width=1024;height=768",
    "msapplication-task": `name=${config.app_name};action-uri=${config.url};icon-uri=${config.url}/favicon/favicon.ico`,
    "msapplication-TileImage": `${config.url}/favicon/mstile-144x144.png`,
    "msapplication-TileColor": PAPER,
    "msapplication-config": `${config.url}/favicon/browserconfig.xml`,

    // Facebook metadata
    "fb:admins": config.author.fb_profile_id,
    "fb:profile_id": config.author.fb_profile_id,
    "fb:app_id": config.blog.fb_app_id,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: true,
  themeColor: PAPER,
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://imgix.cosmicjs.com" />
      <link rel="dns-prefetch" href="https://imgix.cosmicjs.com" />
      <link rel="preconnect" href="https://cdn.cosmicjs.com" />
      <link rel="dns-prefetch" href="https://cdn.cosmicjs.com" />
      {children}
    </>
  );
}
