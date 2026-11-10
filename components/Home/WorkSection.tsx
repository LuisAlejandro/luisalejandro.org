import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { ProjectList } from "@constants/constants";
import { sectionTitles } from "@constants/homepageContent";

export function WorkSection() {
  return (
    <section className="px-gutter py-section border-b border-rule">
      <SectionHeader
        num="02"
        label={sectionTitles.work}
        note="CASE STUDIES AND DELIVERIES"
        id="work"
      />

      <div className="flex flex-col gap-12 lg:gap-16">
        {ProjectList.map((project, index) => {
          const numStr = String(index + 1).padStart(2, "0");
          const tagsStr = project.tags.join(" · ").toUpperCase();

          return (
            <Reveal
              key={project.visit}
              className="border-b border-rule/60 pb-12 last:border-b-0 last:pb-0 lg:pb-16"
            >
              <article className="group flex flex-col lg:flex-row gap-col-gap items-start justify-between w-full min-w-0">
                {/* Text content */}
                <div className="flex flex-col max-w-xl w-full min-w-0">
                  <div className="flex items-center gap-3 site-note mb-3 w-full min-w-0">
                    <span className="text-signal flex-shrink-0">{numStr}</span>
                    <span className="text-rule-strong flex-shrink-0">/</span>
                    <span className="truncate">{tagsStr}</span>
                  </div>

                  <h3 className="text-step-2 lg:text-step-3 font-medium text-ink tracking-tight mb-3">
                    <Link
                      href={project.visit}
                      className="hover:text-signal transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-step-n1 text-ink-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div>
                    <Link
                      href={project.visit}
                      className="inline-flex items-center gap-1.5 site-note text-ink hover:text-signal transition-colors font-medium"
                    >
                      <span>Read the case study</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Project Image Preview */}
                <div className="w-full lg:w-[45%] flex-shrink-0">
                  <Link
                    href={project.visit}
                    className="block relative aspect-[16/10] w-full rounded-lg border border-rule overflow-hidden bg-paper-raised group-hover:border-rule-strong transition-colors"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
