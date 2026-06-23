import { proofPoints, sectionTitles } from "@constants/homepageContent";

import HighlightText from "@components/common/HighlightText";
import { HomeSectionHeading } from "@components/Home/HomeSectionHeading";

export function ProofBlock() {
  return (
    <section aria-labelledby="home-proof-heading">
      <HomeSectionHeading id="home-proof-heading">
        {sectionTitles.proof}
      </HomeSectionHeading>
      <div className="text-xl font-normal leading-relaxed text-justify my-4 mx-auto w-full text-gray-1 space-y-4 lg:font-light lg:w-175 lg:text-lg">
        {proofPoints.map(({ metric, project, context }) => (
          <p key={project}>
            <HighlightText>{metric}</HighlightText> on {project} {context}
          </p>
        ))}
      </div>
    </section>
  );
}
