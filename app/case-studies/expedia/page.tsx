import type { Metadata } from "next";

import { config } from "@constants/constants";

import ExpediaWhy from "@assets/images/expedia-why.svg";

import {
  CaseStudyHero,
  CaseStudyVideo,
} from "@components/common/Site/CaseStudyMedia";
import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

export const metadata: Metadata = {
  title: "Expedia API integration | Luis Alejandro",
  description:
    "Integrating the Expedia hotel database at Wheel The World: a Go content indexer, booking and shopping providers, and a matching algorithm.",
  keywords: [
    "Expedia",
    "travel technology",
    "software engineering",
    "scalable systems",
    "user experience",
    "web development",
    "case study",
    "Luis Alejandro",
    "frontend development",
    "travel industry",
    "performance optimization",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/expedia`,
    types: {
      "text/markdown": [
        { url: "/case-studies/expedia.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    type: "article",
    images: [
      {
        url: "/images/case-studies/expedia-hero.png",
        alt: "Expedia API integration",
      },
    ],
  },
};

export default function ExpediaPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2022}
        subtitle="Expedia API integration"
        title="A larger hotel database to book from"
        description="On 2022, Wheel the World pursued a commercial agreement with Expedia to integrate their hotel database booking and shopping features. I was in charge of developing several components to make this integration possible."
        team={["Luis Martínez"]}
        deliverables={[
          "An expedia content indexer",
          "A booking module",
          "A shopping module",
          "A matching algorithm",
        ]}
        links={[]}
      />

      <CaseStudyHero
        src="/images/case-studies/expedia-hero.png"
        alt="Wheel The World and Expedia integration"
      />

      <CaseStudySection index="01" label="Problem">
        <div className="site-case-figure">
          <ExpediaWhy aria-hidden="true" />
        </div>
        <p>
          Wheel the World needed to increase their sales significantly if they
          wanted to keep growing. They had a great product, but they needed to
          reach more people. One of the main problems was that they had a very
          limited hotel database, which made it difficult for users to find a
          hotel that suited their needs. They had an integration with Hotelbeds,
          but the available inventory was very limited.
        </p>
        <p>
          The majority of hotels in the wheel The World inventory were bookable
          through a request to quote system, but this meant that users had to
          wait for a response from the Wheel the World team, which was not
          scalable. Also, pricing was not transparent or instant, which made it
          difficult for users to make a decision.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          There was already a request to quote system and a booking/pricing
          integration with Hotelbeds in place. One of the challenges was to
          integrate the Expedia hotel database with a new booking/pricing
          system, and to make it work with the existing request to quote system.
          Rewriting or moving components of the system design was not an option,
          so the new system had to be compatible with the existing one.
        </p>
        <p>
          One of the components needed to index all of the Expedia content
          database and make it searchable. This component had to be able to
          index the content in a reasonable amount of time, and it had to be
          able to update the index on a weekly basis. What made this challenging
          was that there were more tha 600k records in the database, with a
          total of 28GB of data.
        </p>
        <p>
          The matching system was also a headeache. It had to be able to match
          the Expedia content with the Wheel the World content, but also
          allowing to match with Hotelbeds content.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          The integration consisted first on a Golang application that
          downloaded, parsed and saved the Expedia content database (28GB of
          data) into a Postgres database and a Redis cache. This application was
          able to download and parse the whole database in less than 2 hours,
          and it was able to update the database on a weekly basis in less than
          2 minutes.
        </p>
        <p>
          The second part of the integration was a to add a Pricing and a
          Shopping provider for Expedia in the website backend. The backend was
          built with Express and TypeORM (Typescript), and it was deployed on
          Google Clour Run. The pricing provider was able to get the
          availability and price of a hotel room for a given date, and the
          booking provider was able to book a hotel room.
        </p>
        <p>
          The third part of the integration was to add a matching algorithm that
          was able to match the Expedia content with the Wheel the World
          content, but also allowing to match with Hotelbeds content. This was a
          very complex algorithm that had to take into account the location, the
          accessibility features, the hotel amenities, the room amenities, the
          room type, the room accessibility features and other factors. It used
          the indexed data from the first part of the integration to make the
          matching process faster.
        </p>
        <CaseStudyVideo
          src="/images/case-studies/expedia-product.mov"
          label="Expedia integration in use"
        />
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          The integration was a success. Expedia quickly certified the
          integration and allowed Wheel the World to increase their hotel
          database from a couple of thousand hotels to more than 600k hotels.
          This allowed Wheel the World to increase their sales by 39% on the
          first quarter of 2023.
        </p>
        <CaseStudyStats
          items={[
            { value: "600K", lines: ["hotels to", "choose from"] },
            { value: "39%", lines: ["increase in", "bookings"] },
          ]}
        />
      </CaseStudySection>
    </SiteShell>
  );
}
