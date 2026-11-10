"use client";

import { HeroTerrain } from "@components/Home/HeroTerrain";
import { HeroTyped } from "@components/Home/HeroTyped";
import { SiteButton } from "@components/common/Site/SiteButton";
import { contactAction } from "@constants/siteNavigation";
import { heroContent } from "@constants/homepageContent";

export function Hero() {
  return (
    <section className="relative min-h-[82vh] flex flex-col justify-between px-gutter py-8 md:py-12 border-b border-rule overflow-hidden">
      <HeroTerrain />

      {/* Top status bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-rule/60 site-note">
        <span>{heroContent.status.role}</span>
        <span className="hidden md:inline">{heroContent.status.location}</span>
        <span className="text-signal">{heroContent.status.availability}</span>
      </div>

      {/* Main headline */}
      <div className="relative z-10 py-12 md:py-16">
        <HeroTyped
          lead={heroContent.headline.lead}
          typed={heroContent.headline.typed}
        />
      </div>

      {/* Bottom metadata and actions */}
      <div className="relative z-10 flex flex-col gap-6 pt-6 border-t border-rule/60">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 site-note">
          {heroContent.labels.map((label, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-signal">{label.glyph}</span>
              <span>{label.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <SiteButton
            href={contactAction.href}
            tracking={contactAction.pixelEvent}
          >
            {contactAction.label}
          </SiteButton>

          <a
            href={heroContent.actions.secondary.href}
            className="inline-flex items-center justify-center px-4 py-2.5 text-step-0 font-medium text-ink-muted hover:text-ink transition-colors"
          >
            {heroContent.actions.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
