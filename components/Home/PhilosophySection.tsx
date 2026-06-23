import { philosophy, sectionTitles } from "@constants/homepageContent";

import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

export function PhilosophySection() {
  return (
    <section aria-labelledby="home-philosophy-heading">
      <HomeSectionHeading id="home-philosophy-heading">
        {sectionTitles.philosophy}
      </HomeSectionHeading>
      <p className="text-xl font-normal leading-relaxed text-justify my-4 mx-auto w-full text-gray-1 lg:font-light lg:w-175 lg:text-lg">
        {philosophy}
      </p>
    </section>
  );
}
