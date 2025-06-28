import { Metadata } from "next";

import { config } from "@constants/constants";

export const metadata: Metadata = {
  title: "Canaima GNU/Linux Case Study | Luis Alejandro",
  description:
    "I led Canaima GNU/Linux development—a Venezuelan Debian-based OS with 220K+ downloads, deployed across government, schools & universities.",
  keywords: [
    "Canaima GNU/Linux",
    "Linux distribution",
    "Debian",
    "Venezuelan government",
    "open source",
    "software development",
    "case study",
    "Luis Alejandro",
    "system administration",
    "package management",
  ],
  authors: [{ name: "Luis Alejandro Martínez Faneyth" }],
  creator: "Luis Alejandro Martínez Faneyth",
  openGraph: {
    title: "Canaima GNU/Linux Case Study | Luis Alejandro",
    description:
      "I led Canaima GNU/Linux development—a Venezuelan Debian-based OS with 220K+ downloads, deployed across government, schools & universities.",
    url: "https://luisalejandro.org/case-studies/canaima",
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/images/case-studies/canaima-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Canaima GNU/Linux Case Study",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canaima GNU/Linux Case Study | Luis Alejandro",
    description:
      "I led Canaima GNU/Linux development—a Venezuelan Debian-based OS with 220K+ downloads, deployed across government, schools & universities.",
    creator: "@LuisDevelops",
    images: [`${config.url}/images/case-studies/canaima-hero.jpg`],
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,
  },
};

export default function CanaimaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
