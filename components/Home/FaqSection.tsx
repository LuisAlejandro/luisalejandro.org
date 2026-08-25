import { faqItems, sectionTitles } from "@constants/homepageContent";

import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

function FaqIcon() {
  return (
    <span
      className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-gold font-title font-black text-lg text-gray-1"
      style={{
        boxShadow:
          "inset 0 -3px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.15), inset -1px 0 0 rgba(0,0,0,0.12), inset 1px 1px 0 rgba(0,0,0,0.12)",
      }}
      aria-hidden="true"
    >
      ?
    </span>
  );
}

export function FaqSection() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="home-faq-heading">
      <div className="mx-auto max-w-260 px-6 lg:px-12">
        <HomeSectionHeading id="home-faq-heading" className="!text-center">
          {sectionTitles.faq}
        </HomeSectionHeading>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {faqItems.map(({ question, answer }) => (
            <article
              key={question}
              className="flex flex-col gap-3.5 rounded-lg border border-gold-dark bg-[color-mix(in_oklch,var(--color-gold)_88%,white)] p-5 lg:p-7"
              style={{
                boxShadow:
                  "inset 0 -4px 0 rgba(255,255,255,0.25), inset 0 -3px 0 rgba(0,0,0,0.08), inset -1px 0 0 rgba(0,0,0,0.06), inset 1px 1px 0 rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-start gap-3.5">
                <FaqIcon />
                <h3 className="font-title text-base font-semibold leading-snug text-gray-2 pt-0.5 lg:text-lg">
                  {question}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-3 lg:pl-[3.125rem] lg:text-base">
                {answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
