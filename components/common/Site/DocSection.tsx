import type { ReactNode } from "react";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";

type DocSectionProps = {
  num: string;
  label: string;
  note?: ReactNode;
  children: ReactNode;
};

/**
 * A numbered reading section (case studies, privacy): the shared section head,
 * the label again as a display claim rising out of its mask, then the body in
 * the prose column. The claim repeats the heading, so it is hidden from
 * assistive technology rather than read twice.
 */
export function DocSection({ num, label, note, children }: DocSectionProps) {
  const id = `section-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section className="site-section site-wrap site-doc-section">
      <SectionHeader num={num} label={label} note={note} id={id} />
      <div className="site-grid">
        <Reveal className="site-doc-section__claim">
          <p className="site-h2" aria-hidden="true">
            <span className="site-line-mask">
              <span>{label}</span>
            </span>
          </p>
        </Reveal>
        <div className="site-doc-section__body">{children}</div>
      </div>
    </section>
  );
}
