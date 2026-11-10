import { Metadata } from "next";

import { Hero } from "@components/Home/Hero";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { faqItems } from "@constants/homepageContent";
import {
  generateHomepageFaqJsonLd,
  generateHomepageJsonLd,
} from "@lib/structuredData";

export const metadata: Metadata = {
  alternates: {
    types: {
      "text/markdown": [
        {
          url: "/index.md",
          title: "Markdown twin",
        },
      ],
    },
  },
};

export default async function HomePage() {
  const homepageJsonLd = generateHomepageJsonLd();
  const homepageFaqJsonLd = generateHomepageFaqJsonLd(faqItems);

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd),
        }}
      />
      {homepageFaqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageFaqJsonLd),
          }}
        />
      )}
      <Hero />
    </SiteShell>
  );
}
