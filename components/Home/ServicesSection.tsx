import Link from "next/link";

import { SectionHeader } from "@components/common/Site/SectionHeader";
import { Arrow } from "@components/common/Site/Arrow";
import {
  sectionNotes,
  sectionTitles,
  servicesList,
} from "@constants/homepageContent";

/**
 * 03 — one 12-column row per service. The row carries no card: hovering floods
 * it with ink and swings the arrow round.
 */
export function ServicesSection() {
  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="03"
        label={sectionTitles.services}
        note={
          <Link href="/portfolio" className="site-link">
            {sectionNotes.services} <Arrow size="sm" />
          </Link>
        }
        id="services"
      />

      <ol className="site-services">
        {servicesList.map((service) => (
          <li key={service.num} className="site-service" data-reveal="up">
            <Link href="/portfolio" className="site-service__link">
              <span className="site-service__n site-note">{service.num}</span>

              <h3 className="site-service__title site-h2">{service.title}</h3>

              <p className="site-service__body">{service.description}</p>

              <ul className="site-service__tags">
                {service.tags.map((tag) => (
                  <li key={tag} className="site-note">
                    {tag}
                  </li>
                ))}
              </ul>

              <Arrow
                href="/portfolio"
                size="lg"
                className="site-service__arrow"
              />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
