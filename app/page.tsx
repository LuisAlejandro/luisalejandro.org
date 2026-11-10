import { Metadata } from "next";

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
import { faqItems } from "@constants/homepageContent";
import { getAllPostsForHome } from "@lib/api";
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
  const posts = (await getAllPostsForHome()) || [];
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
