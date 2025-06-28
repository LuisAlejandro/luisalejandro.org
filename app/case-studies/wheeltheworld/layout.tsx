import { Metadata } from "next";

import { config } from "@constants/constants";

export const metadata: Metadata = {
  title: "Wheel the World Case Study | Luis Alejandro",
  description:
    "I developed accessible travel tech for Wheel the World, building inclusive booking systems that empower travelers with disabilities worldwide.",
  keywords: [
    "Wheel the World",
    "accessible travel",
    "disability inclusion",
    "travel technology",
    "accessibility",
    "inclusive design",
    "web development",
    "case study",
    "Luis Alejandro",
    "social impact",
    "assistive technology",
  ],
  authors: [{ name: "Luis Alejandro Martínez Faneyth" }],
  creator: "Luis Alejandro Martínez Faneyth",
  openGraph: {
    title: "Wheel the World Case Study | Luis Alejandro",
    description:
      "I developed accessible travel tech for Wheel the World, building inclusive booking systems that empower travelers with disabilities worldwide.",
    url: "https://luisalejandro.org/case-studies/wheeltheworld",
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/images/case-studies/wheeltheworld-hero.png`,
        width: 1200,
        height: 630,
        alt: "Wheel the World Case Study",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheel the World Case Study | Luis Alejandro",
    description:
      "I developed accessible travel tech for Wheel the World, building inclusive booking systems that empower travelers with disabilities worldwide.",
    creator: "@LuisDevelops",
    images: [`${config.url}/images/case-studies/wheeltheworld-hero.png`],
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,
  },
};

export default function WheelTheWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
