import Link from "next/link";

import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import { WorkArtwork } from "@components/Home/WorkArtwork";
import { Arrow } from "@components/common/Site/Arrow";
import { RecentProjectList } from "@constants/constants";
import {
  recentWorkIntro,
  sectionNotes,
  sectionTitles,
} from "@constants/homepageContent";

const pad = (value: number) => String(value).padStart(2, "0");

/** One cell's contents: the drawing with its number, then the name row. */
function WorkCell({
  slug,
  num,
  title,
  copy = false,
}: {
  slug: string;
  num: string;
  title: string;
  /** The inverted copy carries no heading, so the name is announced once. */
  copy?: boolean;
}) {
  const Title = copy ? "p" : "h3";
  return (
    <>
      <div className="site-wcard__art">
        <span
          className="site-project-card__number site-note"
          aria-hidden="true"
        >
          /{num}
        </span>
        <WorkArtwork slug={slug} play="hover" />
      </div>
      <div className="site-wcard__head">
        <Title className="site-wcard__title">{title}</Title>
        <span className="site-note site-wcard__more">
          Case study <Arrow size="sm" />
        </span>
      </div>
    </>
  );
}

/** The sheet is three cells wide; a short last row is padded with kept cells. */
const COLUMNS = 3;

type WorkProject = { title: string; visit: string };

type WorkGridProps = {
  num?: string;
  label?: string;
  id?: string;
  projects?: readonly WorkProject[];
  intro?: string;
  note?: string;
  /** The home page links on to the portfolio; the portfolio itself does not. */
  more?: boolean;
};

/**
 * Case studies as a sheet of cells sharing one set of hairlines, like a
 * spreadsheet: drawing, name and link all sit inside the cell. Each card
 * carries its drawing at rest; hovering or focusing the card sweeps an ink
 * curtain across it and replays the drawing's story. The home page shows the
 * six newest; the portfolio follows its pinned stage with the earlier five.
 */
export function WorkGrid({
  num = "02",
  label = sectionTitles.work,
  id = "work",
  projects = RecentProjectList,
  intro = recentWorkIntro,
  note = sectionNotes.recentWork,
  more = true,
}: WorkGridProps) {
  const empty = (COLUMNS - (projects.length % COLUMNS)) % COLUMNS;
  return (
    <section className="site-section site-wrap">
      <SectionHeader num={num} label={label} note={note} id={id} />

      <p
        className="site-lead-type text-ink mb-10 max-w-[46ch]"
        data-reveal="up"
      >
        {intro}
      </p>

      <ol className="site-wgrid" role="list">
        {projects.map((project, index) => (
          <li key={project.visit} data-reveal="up">
            <Link href={project.visit} className="site-wcard">
              <WorkCell
                slug={project.visit}
                num={pad(index + 1)}
                title={project.title}
              />
              {/* The ink copy the curtain reveals: the same cell inverted,
                  uncovered from the left so the flip follows the sweep. */}
              <div className="site-wcard__ink" aria-hidden="true" inert>
                <WorkCell
                  slug={project.visit}
                  num={pad(index + 1)}
                  title={project.title}
                  copy
                />
              </div>
            </Link>
          </li>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <li
            key={`empty-${i}`}
            className="site-wgrid__empty"
            aria-hidden="true"
          >
            <span className="site-project-card__number site-note">
              /{pad(projects.length + i + 1)}
            </span>
          </li>
        ))}
      </ol>

      {more && (
        <div className="site-wgrid__more">
          <SiteButton href="/portfolio#case-studies" variant="ghost" arrow>
            The full stories, in the portfolio
          </SiteButton>
        </div>
      )}
    </section>
  );
}
