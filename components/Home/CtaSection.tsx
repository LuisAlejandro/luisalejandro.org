"use client";

import { Reveal } from "@components/common/Site/Reveal";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { sectionTitles } from "@constants/homepageContent";
import { contactAction } from "@constants/siteNavigation";

export function CtaSection() {
  return (
    <section className="px-gutter py-section border-b border-rule">
      <SectionHeader
        num="06"
        label={sectionTitles.cta}
        note="INITIATE"
        id="next"
      />

      <Reveal>
        <div className="flex flex-col items-start max-w-3xl">
          <h2 className="text-step-3 sm:text-step-4 lg:text-step-5 font-medium text-ink tracking-tight mb-8 leading-[1.05]">
            Tell me what you&apos;re building.
          </h2>

          <SiteButton
            href={contactAction.href}
            size="lg"
            tracking={contactAction.pixelEvent}
            arrow
          >
            {contactAction.label}
          </SiteButton>
        </div>
      </Reveal>
    </section>
  );
}
