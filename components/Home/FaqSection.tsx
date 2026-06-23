import { faqItems, sectionTitles } from "@constants/homepageContent";

import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

export function FaqSection() {
  return (
    <section aria-labelledby="home-faq-heading">
      <HomeSectionHeading id="home-faq-heading">
        {sectionTitles.faq}
      </HomeSectionHeading>
      <div className="my-4 mx-auto w-full lg:w-175 space-y-6">
        {faqItems.map(({ question, answer }) => (
          <article key={question}>
            <h3 className="font-main font-normal text-xl leading-8 text-gray-1 mb-2 lg:font-light lg:text-lg">
              {question}
            </h3>
            <p className="text-xl font-normal leading-relaxed text-justify text-gray-1 lg:font-light lg:text-lg">
              {answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
