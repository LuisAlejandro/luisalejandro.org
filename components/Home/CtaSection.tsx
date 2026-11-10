import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import {
  ctaContent,
  sectionNotes,
  sectionTitles,
} from "@constants/homepageContent";
import { contactAction } from "@constants/siteNavigation";

/**
 * 06 — the closing pair of lines at display size, then the two pills.
 */
export function CtaSection() {
  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="06"
        label={sectionTitles.cta}
        note={sectionNotes.cta}
        id="next"
      />

      <Reveal>
        <h2 className="site-display site-cta__title text-ink">
          {ctaContent.lines.map((line) => (
            <span key={line} className="site-line-mask">
              <span>{line}</span>
            </span>
          ))}
        </h2>

        <div className="site-cta__actions">
          <SiteButton
            href={contactAction.href}
            tracking={contactAction.pixelEvent}
            arrow
          >
            {ctaContent.primary.label}
          </SiteButton>
          <SiteButton href={ctaContent.secondary.href} variant="ghost">
            {ctaContent.secondary.label}
          </SiteButton>
        </div>
      </Reveal>
    </section>
  );
}
