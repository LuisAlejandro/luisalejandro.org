import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import {
  impactLead,
  impactRows,
  sectionNotes,
  sectionTitles,
} from "@constants/homepageContent";

/**
 * 01 — three numbers set at heading size, each staggered across the grid, with
 * an outlined ghost beneath the solid copy that clips open on scroll.
 */
export function MetricsSection() {
  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="01"
        label={sectionTitles.metrics}
        note={sectionNotes.metrics}
        id="metrics"
      />

      <div>
        {impactRows.map((row, index) => (
          <Reveal key={row.metric}>
            <div className="site-wf-row" data-i={index}>
              <p className="site-wf-line site-h1">
                <span aria-hidden="true" className="site-outline">
                  {row.metric}
                </span>
                <span className="site-wf-solid">
                  <span className="block">{row.metric}</span>
                </span>
              </p>
              <span className="site-wf-dim site-note">{row.note}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="site-manifesto-body site-grid">
        <p className="site-lead-type text-ink" data-reveal="up">
          {impactLead}
        </p>
      </div>
    </section>
  );
}
