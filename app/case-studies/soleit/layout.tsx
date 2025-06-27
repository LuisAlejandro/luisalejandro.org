import { Metadata } from "next";

import { config } from "@constants/constants";

export const metadata: Metadata = {
  title: "Soleit Case Study | Luis Alejandro",
  description:
    "I built Soleit's Electron desktop app for foot diagnosis using Ionic React & Python—helping the healthtech startup secure growth stage funding.",
  keywords: [
    "Soleit",
    "fintech",
    "financial technology",
    "payment systems",
    "software development",
    "backend development",
    "API development",
    "case study",
    "Luis Alejandro",
    "financial software",
    "secure payments",
  ],
  authors: [{ name: "Luis Alejandro Martínez Faneyth" }],
  creator: "Luis Alejandro Martínez Faneyth",
  openGraph: {
    title: "Soleit Case Study | Luis Alejandro",
    description:
      "I built Soleit's Electron desktop app for foot diagnosis using Ionic React & Python—helping the healthtech startup secure growth stage funding.",
    url: "https://luisalejandro.org/case-studies/soleit",
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/images/case-studies/soleit-hero.png`,
        width: 1200,
        height: 630,
        alt: "Soleit Case Study",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soleit Case Study | Luis Alejandro",
    description:
      "I built Soleit's Electron desktop app for foot diagnosis using Ionic React & Python—helping the healthtech startup secure growth stage funding.",
    creator: "@LuisDevelops",
    images: [`${config.url}/images/case-studies/soleit-hero.png`],
  },
};

export default function SoleitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
