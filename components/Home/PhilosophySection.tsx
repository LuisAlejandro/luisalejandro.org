import { philosophy, sectionTitles } from "@constants/homepageContent";

import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

function QuoteIcon() {
  return (
    <svg
      className="w-16 h-16 mx-auto mb-6 text-orange lg:w-20 lg:h-20"
      viewBox="0 0 80 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 44c0-10 6-18 16-22l2 6c-6 2-10 7-10 13h10V44H18zm34 0c0-10 6-18 16-22l2 6c-6 2-10 7-10 13h10V44H52z" />
    </svg>
  );
}

export function PhilosophySection() {
  return (
    <section
      className="py-14 text-center lg:py-20"
      aria-labelledby="home-philosophy-heading"
    >
      <div className="mx-auto max-w-260 px-6 lg:px-12">
        <QuoteIcon />
        <HomeSectionHeading
          id="home-philosophy-heading"
          className="!text-center"
        >
          {sectionTitles.philosophy}
        </HomeSectionHeading>
        <p className="mx-auto max-w-[52ch] text-lg leading-[1.75] font-light text-gray-1 lg:text-xl">
          {philosophy}
        </p>
      </div>
    </section>
  );
}
