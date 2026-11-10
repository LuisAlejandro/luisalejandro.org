"use client";

import Link from "next/link";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { sectionTitles } from "@constants/homepageContent";
import { trackPixelEvent } from "@lib/pixel";

export function CtaSection() {
  return (
    <section className="px-gutter py-20 lg:py-32 border-b border-rule">
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

          <Link
            href="/contact"
            onClick={() => trackPixelEvent("ClickHeaderContact")}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-step-0 font-medium text-paper hover:bg-white transition-colors group"
          >
            <span>Let&apos;s talk</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
