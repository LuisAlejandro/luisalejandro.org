import type { Metadata, Viewport } from "next";

import { config } from "@constants/constants";
import { portfolioDescription } from "@lib/portfolio";

import "@styles/tailwind.css";
import { PAPER, pageMeta } from "@lib/metadata";

const title = "Project Archive | Luis Alejandro";

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description: portfolioDescription,
    path: "/portfolio",
  }),
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
};

export const viewport: Viewport = { themeColor: PAPER };

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
