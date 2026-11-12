import type { Metadata, Viewport } from "next";

import { config } from "@constants/constants";
import { portfolioDescription } from "@lib/portfolio";

import "@styles/tailwind.css";

const title = "Project Archive | Luis Alejandro";

export const metadata: Metadata = {
  title,
  description: portfolioDescription,
  alternates: {
    canonical: `${config.url}/portfolio`,
    types: {
      "application/rss+xml": [
        { url: `${config.url}/blog/posts/feed.xml`, title: "RSS feed" },
      ],
      "application/atom+xml": [
        { url: `${config.url}/blog/posts/atom.xml`, title: "Atom feed" },
      ],
      "application/feed+json": [
        { url: `${config.url}/blog/posts/feed.json`, title: "JSON feed" },
      ],
      "application/xml": [
        { url: `${config.url}/sitemap.xml`, title: "Sitemap" },
      ],
      "text/markdown": [{ url: "/portfolio.md", title: "Markdown twin" }],
    },
  },
  openGraph: {
    title,
    description: portfolioDescription,
    url: `${config.url}/portfolio`,
    type: "website",
    images: [
      {
        url: `${config.url}/images/banner.png`,
        alt: "Luis Alejandro — project archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: portfolioDescription,
    images: [`${config.url}/images/banner.png`],
  },
};

export const viewport: Viewport = { themeColor: "#f4f4f0" };

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
