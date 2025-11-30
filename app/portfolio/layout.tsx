import { Metadata } from "next";

import { config } from "@constants/constants";

import "@styles/tailwind.css";

export const metadata: Metadata = {
  title: "Portfolio | Luis Alejandro - TypeScript, Python & Golang Expert",
  description:
    "Full stack developer portfolio: Expedia API (39% booking boost), Dockershelf (294K+ downloads), Canaima Linux (220K+ users). 60+ open source projects.",
  keywords: [
    "full stack developer portfolio",
    "TypeScript developer portfolio",
    "Python developer portfolio",
    "Golang developer portfolio",
    "remote developer portfolio",
    "software engineer portfolio",
    "web developer portfolio",
    "API developer portfolio",
    "Docker expert portfolio",
    "Next.js developer portfolio",
    "React developer portfolio",
    "Node.js developer portfolio",
    "DevOps portfolio",
    "open source portfolio",
    "software architecture portfolio",
    "Venezuelan developer portfolio",
    "Latin American developer",
    "freelance developer portfolio",
    "remote work portfolio",
    "software consultant portfolio",
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
    title: "Portfolio | Luis Alejandro - TypeScript, Python & Golang Expert",
    description:
      "Full stack developer portfolio: Expedia API (39% booking boost), Dockershelf (294K+ downloads), Canaima Linux (220K+ users). 60+ open source projects.",
    url: `${config.url}/portfolio`,
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/favicon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: config.app_name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Luis Alejandro - TypeScript, Python & Golang Expert",
    description:
      "Full stack developer portfolio: Expedia API (39% booking boost), Dockershelf (294K+ downloads), Canaima Linux (220K+ users). 60+ open source projects.",
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
    canonical: `${config.url}/portfolio`,
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
    },
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,

    // Dublin Core metadata
    "dcterms.title":
      "Portfolio | Luis Alejandro - TypeScript, Python & Golang Expert",
    "dcterms.description":
      "Full stack developer portfolio: Expedia API (39% booking boost), Dockershelf (294K+ downloads), Canaima Linux (220K+ users). 60+ open source projects.",
    "dcterms.language": "en",
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

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-orange-2 via-orange-3/15 via-30% to-bright-gold min-h-screen">
      {children}
    </div>
  );
}
