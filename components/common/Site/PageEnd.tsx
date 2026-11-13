import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";

type Action = { label: string; href: string };

type PageEndProps = {
  /** The section number, one after the page's last section. */
  num: string;
  note: string;
  /** The claim, one entry per line. */
  lines: string[];
  primary: Action;
  secondary?: Action;
};

/**
 * How an inner page closes: a numbered "Next" section, a display claim that
 * rises line by line, and at most two ways to act on it.
 */
export function PageEnd({
  num,
  note,
  lines,
  primary,
  secondary,
}: PageEndProps) {
  return (
    <section className="site-section site-wrap site-page-end">
      <SectionHeader num={num} label="Next" note={note} />
      <Reveal>
        <p className="site-display site-page-end__claim">
          {lines.map((line) => (
            <span key={line} className="site-line-mask">
              <span>{line}</span>
            </span>
          ))}
        </p>
      </Reveal>
      <div className="site-hero__ctas site-page-end__actions">
        <SiteButton href={primary.href} arrow>
          {primary.label}
        </SiteButton>
        {secondary && (
          <SiteButton href={secondary.href} variant="ghost" arrow>
            {secondary.label}
          </SiteButton>
        )}
      </div>
    </section>
  );
}
