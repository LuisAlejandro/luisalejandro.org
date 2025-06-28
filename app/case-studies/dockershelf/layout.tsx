import { Metadata } from "next";

import { config } from "@constants/constants";

export const metadata: Metadata = {
  title: "Dockershelf Case Study | Luis Alejandro",
  description:
    "I created Dockershelf—a Docker image repository with 294K+ downloads, featuring Python, Node & Debian images 4x smaller than official ones.",
  keywords: [
    "Dockershelf",
    "Docker images",
    "containerization",
    "DevOps",
    "programming languages",
    "development tools",
    "automation",
    "case study",
    "Luis Alejandro",
    "software architecture",
    "CI/CD",
  ],
  authors: [{ name: "Luis Alejandro Martínez Faneyth" }],
  creator: "Luis Alejandro Martínez Faneyth",
  openGraph: {
    title: "Dockershelf Case Study | Luis Alejandro",
    description:
      "I created Dockershelf—a Docker image repository with 294K+ downloads, featuring Python, Node & Debian images 4x smaller than official ones.",
    url: "https://luisalejandro.org/case-studies/dockershelf",
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/images/case-studies/dockershelf-hero.png`,
        width: 1200,
        height: 630,
        alt: "Dockershelf Case Study",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dockershelf Case Study | Luis Alejandro",
    description:
      "I created Dockershelf—a Docker image repository with 294K+ downloads, featuring Python, Node & Debian images 4x smaller than official ones.",
    creator: "@LuisDevelops",
    images: [`${config.url}/images/case-studies/dockershelf-hero.png`],
  },
  other: {
    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,
  },
};

export default function DockershelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
