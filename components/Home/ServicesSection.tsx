import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { sectionTitles, servicesList } from "@constants/homepageContent";

export function ServicesSection() {
  return (
    <section className="px-gutter py-section border-b border-rule">
      <SectionHeader
        num="03"
        label={sectionTitles.services}
        note="CAPABILITIES"
        id="services"
      />

      <div className="flex flex-col divide-y divide-rule/60">
        {servicesList.map((service) => (
          <Reveal key={service.num} className="first:pt-0 last:pb-0">
            <div className="py-8 lg:py-12 flex flex-col md:flex-row md:items-start justify-between gap-6 lg:gap-12">
              {/* Number and Title */}
              <div className="md:w-1/2 flex items-baseline gap-4">
                <span className="site-note text-signal font-medium">
                  {service.num}
                </span>
                <h3 className="text-step-2 lg:text-step-3 font-medium text-ink tracking-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description and tags */}
              <div className="md:w-1/2 flex flex-col gap-4">
                <p className="text-step-n1 text-ink-muted leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="site-note px-2.5 py-1 rounded border border-rule text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
