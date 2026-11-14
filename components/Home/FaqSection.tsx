import { Fragment } from "react";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import {
  faqClaim,
  faqItems,
  sectionNotes,
  sectionTitles,
} from "@constants/homepageContent";

/**
 * 04 — a two-line claim, a rule that draws across, then four steps marked with
 * accent dots. The questions replace the reference's process steps.
 */
export function FaqSection() {
  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="04"
        label={sectionTitles.faq}
        note={sectionNotes.faq}
        id="faq"
      />

      <h2 className="site-h2 site-claim" data-reveal="lines">
        {faqClaim.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h2>

      <div className="site-process-line" data-draw />

      <ol className="site-steps site-grid mt-10">
        {faqItems.map((item, index) => (
          <li key={item.question} className="site-step" data-reveal="up">
            <span aria-hidden="true" className="site-step__dot" />
            <span className="site-note">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="site-step__title">{item.question}</h3>
            <p className="site-step__body">{item.answer}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
