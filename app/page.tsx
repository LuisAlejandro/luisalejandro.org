import type { Metadata, Viewport } from "next";

import { BlogSection } from "@components/Home/BlogSection";
import { CtaSection } from "@components/Home/CtaSection";
import { FaqSection } from "@components/Home/FaqSection";
import { Hero } from "@components/Home/Hero";
import { MetricsSection } from "@components/Home/MetricsSection";
import { ServicesSection } from "@components/Home/ServicesSection";
import { WorkSection } from "@components/Home/WorkSection";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import { faqItems } from "@constants/homepageContent";
import { getAllPostsForHome } from "@lib/api";
import {
  generateHomepageFaqJsonLd,
  generateHomepageJsonLd,
} from "@lib/structuredData";

export const viewport: Viewport = {
  themeColor: "#f4f4f0",
};

export const metadata: Metadata = {
  alternates: {
    canonical: config.url,
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
  // The home page shows three entries; do not fetch the whole collection.
  const posts = (await getAllPostsForHome(3)) || [];
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
      <MetricsSection />
      <WorkSection />
      <ServicesSection />
      <FaqSection />
      <BlogSection posts={posts} />
      <CtaSection />
    </SiteShell>
  );
}
