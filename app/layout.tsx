import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import {
  ADSENSE_PUBLISHER_ID,
  ENV_NAME,
  GA_MEASUREMENT_ID,
  config,
  experience,
} from "@constants/constants";

import { INK, PAPER, pageMeta } from "@lib/metadata";

import CookieConsentWrapper from "@side-effects/CookieConsentWrapper";
import MetaPixel from "@side-effects/MetaPixel";

import "@styles/tailwind.css";

const siteTitle =
  "Luis Alejandro | Full Stack AI Engineer & Open Source Expert";
const siteDescription = `Venezuelan full-stack AI engineer with more than ${experience} years of remote experience in TypeScript, Python, Go and LLM integration. Open-source projects, agent tooling and a developer blog.`;

export const metadata: Metadata = {
  keywords: [
    "Venezuelan software engineer",
    "remote full stack developer",
    "TypeScript developer",
    "Python developer",
    "Golang developer",
    "open source contributor",
    "remote work specialist",
    "Next.js developer",
    "Docker expert",
    "AWS developer",
    "software architect",
    "web development",
    "API development",
    "DevOps engineer",
    "Latin American developer",
    "freelance developer",
    "software consultant",
    "GitHub developer",
    "React developer",
    "Node.js developer",
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
    statusBarStyle: "default",
  },
  ...pageMeta({ title: siteTitle, description: siteDescription, path: "/" }),
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
        color: INK,
      },
    ],
  },
  manifest: `${config.url}/favicon/site.webmanifest`,
  alternates: {
    canonical: config.url,
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
    // Google AdSense verification
    "google-adsense-account": ADSENSE_PUBLISHER_ID || "",

    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,

    // Dublin Core metadata
    "dcterms.title": siteTitle,
    "dcterms.description": siteDescription,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# dcterms: http://purl.org/dc/terms/#"
    >
      <body className="cursor-default overflow-x-hidden antialiased">
        {children}
        {GA_MEASUREMENT_ID && ENV_NAME !== "local" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {/* No ad units remain anywhere on the site, so the ad loader is gone
            too; the verification meta tag above is what AdSense needs. */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
