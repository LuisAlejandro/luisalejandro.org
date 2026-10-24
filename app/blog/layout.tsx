import { Metadata } from "next";

import { config } from "@constants/constants";

/**
 * Language strategy for the blog.
 *
 * The site ships a single root layout (`app/layout.tsx`) declaring lang="en",
 * because the site chrome — navigation, footer, search, share labels — is
 * English everywhere, including around Spanish articles. The Spanish content
 * is marked instead: `lang="es"` on the post <main> and on every post card
 * (PostPreview, PostPreviewMini, HeroPost, SearchResultItem), with the few
 * English labels inside those regions marked `lang="en"`.
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
import "yet-another-react-lightbox/styles.css";

export const metadata: Metadata = {
  title:
    "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto",
  description:
    "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title:
      "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto",
    description:
      "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.",
    url: `${config.url}/blog`,
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/favicon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: config.app_name,
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto",
    description:
      "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.",
    images: [`${config.url}/images/banner.png`],
    site: `@${config.blog.twitter}`,
    creator: `@${config.author.twitter}`,
  },
  icons: {
    icon: [
      {
        url: `${config.url}/favicon/favicon.svg`,
        type: "image/svg+xml",
      },
      {
        url: `${config.url}/favicon/favicon.png`,
        type: "image/png",
      },
      {
        url: `${config.url}/favicon/favicon.ico`,
        type: "image/x-icon",
      },
      {
        url: `${config.url}/favicon/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `${config.url}/favicon/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: `${config.url}/favicon/favicon.ico`,
    apple: [
      {
        url: `${config.url}/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: `${config.url}/favicon/safari-pinned-tab.svg`,
        color: "#000000",
      },
    ],
  },
  manifest: `${config.url}/favicon/site.webmanifest`,
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
    "dcterms.title":
      "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto",
    "dcterms.description":
      "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.",
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
    "msapplication-square70x70logo": `${config.url}/favicon/mstile-70x70.png`,
    "msapplication-square144x144logo": `${config.url}/favicon/mstile-144x144.png`,
    "msapplication-square150x150logo": `${config.url}/favicon/mstile-150x150.png`,
    "msapplication-square310x310logo": `${config.url}/favicon/mstile-310x310.png`,
    "msapplication-wide310x150logo": `${config.url}/favicon/mstile-310x150.png`,
    "msapplication-TileImage": `${config.url}/favicon/mstile-310x310.png`,
    "msapplication-TileColor": "#f8d983",
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
  themeColor: "#f8d983",
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
      <link rel="preconnect" href="https://disqus.com" />
      <link rel="dns-prefetch" href="https://disqus.com" />
      {children}
    </>
  );
}
