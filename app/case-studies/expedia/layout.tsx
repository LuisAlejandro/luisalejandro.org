import { Metadata } from "next";

import { config } from "@constants/constants";

export const metadata: Metadata = {
  title: "Expedia Case Study | Luis Alejandro",
  description:
    "I built Expedia API integration for Wheel the World, expanding hotel database from 1K to 600K+ hotels, increasing bookings by 39% in Q1 2023.",
  keywords: [
    "Expedia",
    "travel technology",
    "software engineering",
    "scalable systems",
    "user experience",
    "web development",
    "case study",
    "Luis Alejandro",
    "frontend development",
    "travel industry",
    "performance optimization",
  ],
  authors: [{ name: "Luis Alejandro Martínez Faneyth" }],
  creator: "Luis Alejandro Martínez Faneyth",
  openGraph: {
    title: "Expedia Case Study | Luis Alejandro",
    description:
      "I built Expedia API integration for Wheel the World, expanding hotel database from 1K to 600K+ hotels, increasing bookings by 39% in Q1 2023.",
    url: "https://luisalejandro.org/case-studies/expedia",
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/images/case-studies/expedia-hero.png`,
        width: 1200,
        height: 630,
        alt: "Expedia Case Study",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expedia Case Study | Luis Alejandro",
    description:
      "I built Expedia API integration for Wheel the World, expanding hotel database from 1K to 600K+ hotels, increasing bookings by 39% in Q1 2023.",
    creator: "@LuisDevelops",
    images: [`${config.url}/images/case-studies/expedia-hero.png`],
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,
  },
};

export default function ExpediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
