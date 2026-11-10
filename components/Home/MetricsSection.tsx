import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { proofPoints, sectionTitles } from "@constants/homepageContent";

export function MetricsSection() {
  return (
    <section className="px-gutter py-section border-b border-rule">
      <SectionHeader
        num="01"
        label={sectionTitles.metrics}
        note="MEASURED RESULTS"
        id="metrics"
      />

      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-col-gap">
          {proofPoints.map((point, index) => (
            <div
              key={index}
              className="flex flex-col border-t border-rule/60 pt-6"
            >
              <div className="text-step-3 lg:text-step-4 font-medium text-ink tracking-tight leading-none mb-4">
                {point.metric}
              </div>
              <span className="site-note text-signal mb-2">
                {point.project}
              </span>
              <p className="text-step-n1 text-ink-muted leading-relaxed">
                {point.context}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
