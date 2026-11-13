import Link from "next/link";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import { WorkArtwork } from "@components/Home/WorkArtwork";
import { ProjectList } from "@constants/constants";
import {
  sectionNotes,
  sectionTitles,
  workIntro,
} from "@constants/homepageContent";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 02 — the five case studies as a grid. Each card carries its drawing at rest;
 * hovering or focusing the card replays the drawing's story. The pinned,
 * scroll-driven version lives on the portfolio.
 */
export function WorkGrid() {
  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="02"
        label={sectionTitles.work}
        note={sectionNotes.work}
        id="work"
      />

      <Reveal>
        <p className="site-lead-type text-ink mb-10 max-w-[46ch]">
          {workIntro}
        </p>
      </Reveal>

      <ol className="site-wgrid" role="list">
        {ProjectList.map((project, index) => (
          <li key={project.visit}>
            <Link href={project.visit} className="site-wcard">
              <div className="site-wcard__art">
                <span
                  className="site-project-card__number site-note"
                  aria-hidden="true"
                >
                  /{pad(index + 1)}
                </span>
                <WorkArtwork slug={project.visit} play="hover" />
              </div>
              <div className="site-wcard__head">
                <h3 className="site-wcard__title">{project.title}</h3>
                <span className="site-note site-wcard__more">
                  Case study <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="site-wgrid__more">
        <SiteButton href="/portfolio#case-studies" variant="ghost" arrow>
          The full stories, in the portfolio
        </SiteButton>
      </div>
    </section>
  );
}
