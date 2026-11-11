"use client";

import { HeroVortex } from "@components/Home/HeroVortex";
import { HeroTyped } from "@components/Home/HeroTyped";
import { SiteButton } from "@components/common/Site/SiteButton";
import { heroContent } from "@constants/homepageContent";
import { contactAction } from "@constants/siteNavigation";

export function Hero() {
  return (
    <div className="site-hero-pin">
      <section className="site-hero site-wrap">
        <HeroVortex />

        {/* Status line: name and role, the base camp, availability. */}
        <div className="site-hero__top site-note relative z-10">
          <span>{heroContent.status.role}</span>
          <span className="hidden sm:inline">
            {heroContent.status.location}
          </span>
          <span>{heroContent.status.availability}</span>
        </div>

        <HeroTyped
          lead={heroContent.headline.lead}
          typed={heroContent.headline.typed}
        />

        {/* What the two lines above are: written, then generated. */}
        <div className="site-hero__notes site-note relative z-10">
          {heroContent.labels.map((label) => (
            <p key={label.text} className="flex items-center gap-1.5">
              <span className="site-accent">{label.glyph}</span>
              <span>{label.text}</span>
            </p>
          ))}
          <p className="flex items-center gap-1.5">
            <span className="site-accent">▲</span>
            <span>{heroContent.vortexNote}</span>
          </p>
        </div>

        <div className="site-hero__foot relative z-10">
          <p className="site-lead-type site-hero__intro" data-bp="p.intro">
            {heroContent.intro}
          </p>

          <div className="site-hero__ctas" data-bp="nav.cta">
            <SiteButton
              href={contactAction.href}
              tracking={contactAction.pixelEvent}
              arrow
            >
              {contactAction.label}
            </SiteButton>
            <SiteButton
              href={heroContent.actions.secondary.href}
              variant="ghost"
            >
              {heroContent.actions.secondary.label}
            </SiteButton>
          </div>
        </div>
      </section>
    </div>
  );
}
