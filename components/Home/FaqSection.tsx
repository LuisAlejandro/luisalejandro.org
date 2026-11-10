import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { faqItems, sectionTitles } from "@constants/homepageContent";

export function FaqSection() {
  return (
    <section className="px-gutter py-section border-b border-rule">
      <SectionHeader
        num="04"
        label={sectionTitles.faq}
        note="PROCESS & ENGAGEMENTS"
        id="faq"
      />

      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-col-gap">
          {faqItems.map((item, index) => {
            const numStr = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className="flex flex-col border-t border-rule/60 pt-6"
              >
                <div className="site-note text-signal font-medium mb-3">
                  {numStr}
                </div>
                <h3 className="text-step-1 lg:text-step-2 font-medium text-ink tracking-tight mb-3">
                  {item.question}
                </h3>
                <p className="text-step-n1 text-ink-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
