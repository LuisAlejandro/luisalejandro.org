import { proofPoints, sectionTitles } from "@constants/homepageContent";

import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

export function ProofBlock() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="home-proof-heading">
      <div className="mx-auto max-w-260 px-6 lg:px-12">
        <HomeSectionHeading id="home-proof-heading" className="!text-center">
          {sectionTitles.proof}
        </HomeSectionHeading>
        <div
          className="flex flex-col overflow-hidden rounded-xl border border-gold-dark bg-[color-mix(in_oklch,var(--color-gold)_88%,white)] shadow-small lg:flex-row"
          role="list"
        >
          {proofPoints.map(({ metric, project, context }, idx) => (
            <article
              key={project}
              className={`flex flex-1 flex-col gap-2 p-6 lg:p-8 ${
                idx > 0
                  ? "border-t border-gold-dark lg:border-t-0 lg:border-l"
                  : ""
              }`}
              role="listitem"
            >
              <p className="font-display text-5xl leading-[0.95] tracking-tight text-gray-1 uppercase lg:text-7xl">
                {metric}
              </p>
              <h3 className="font-title text-base font-bold leading-snug text-gray-2 lg:text-lg">
                {project}
              </h3>
              <p className="text-sm leading-relaxed font-normal text-gray-3 lg:text-base">
                {context}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
