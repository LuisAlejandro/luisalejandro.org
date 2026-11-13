import type { ReactNode } from "react";

import { DetailHead } from "@components/common/Site/DetailHead";

type CaseStudyHeadProps = {
  year: number;
  subtitle: string;
  title: string;
  description: ReactNode;
  team: string[];
  deliverables: string[];
  links: { text: string; url: string }[];
};

/** The dossier opening: the shared detail head with the project facts. */
export function CaseStudyHead({
  year,
  subtitle,
  title,
  description,
  team,
  deliverables,
  links,
}: CaseStudyHeadProps) {
  return (
    <section className="site-wrap">
      <DetailHead
        trail={[
          { label: "Portfolio", href: "/portfolio" },
          { label: "Case study" },
        ]}
        index={`[Case study / ${year}]`}
        eyebrow={subtitle}
        title={title}
        lead={description}
      >
        <dl className="site-spec">
          <div>
            <dt className="site-note">Year</dt>
            <dd>{year}</dd>
          </div>
          <div>
            <dt className="site-note">Team</dt>
            <dd>{team.join(", ")}</dd>
          </div>
          <div className="site-spec__wide">
            <dt className="site-note">Deliverables</dt>
            <dd>{deliverables.join(" · ")}</dd>
          </div>
          {links.length > 0 && (
            <div>
              <dt className="site-note">Links</dt>
              <dd className="site-spec__links">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="site-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text} ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </DetailHead>
    </section>
  );
}
