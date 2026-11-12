import type { ReactNode } from "react";

type CaseStudySectionProps = {
  /** Two-digit ordinal, e.g. "01". */
  index: string;
  /** Short label, e.g. "Problem". */
  label: string;
  children: ReactNode;
};

/**
 * One numbered narrative section. The label column sticks on wide viewports so
 * the reader always knows which part of the story they are in; the reveal is a
 * CSS scroll-driven animation that simply does nothing where it is unsupported.
 */
export function CaseStudySection({
  index,
  label,
  children,
}: CaseStudySectionProps) {
  const id = `case-${label.toLowerCase()}`;

  return (
    <section className="site-case-section site-wrap" aria-labelledby={id}>
      <div className="site-case-section__label">
        <p className="site-note">
          <span className="site-case-section__index">{index}</span> {label}
        </p>
      </div>
      <div className="site-case-section__body" id={id}>
        <h2 className="site-h2">{label}</h2>
        {children}
      </div>
    </section>
  );
}
