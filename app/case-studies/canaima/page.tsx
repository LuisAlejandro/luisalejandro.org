import type { Metadata } from "next";

import CanaimaWhy from "@assets/images/canaima-why.svg";

import {
  CaseStudyGallery,
  CaseStudyHero,
  CaseStudyVideo,
} from "@components/common/Site/CaseStudyMedia";
import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

const gallery = [
  "/images/case-studies/canaima-gallery-1.png",
  "/images/case-studies/canaima-gallery-2.png",
  "/images/case-studies/canaima-gallery-3.png",
  "/images/case-studies/canaima-gallery-4.png",
  "/images/case-studies/canaima-gallery-5.jpg",
  "/images/case-studies/canaima-gallery-6.jpg",
  "/images/case-studies/canaima-gallery-7.jpg",
  "/images/case-studies/canaima-gallery-8.jpg",
];

export const metadata: Metadata = {
  title: "Canaima GNU/Linux case study | Luis Alejandro",
  description:
    "Leading development of Canaima GNU/Linux, a Debian-based distribution built for Venezuelan public administration, schools and universities.",
  alternates: { canonical: "/case-studies/canaima" },
  openGraph: {
    images: [
      {
        url: "/images/case-studies/canaima-hero.jpg",
        alt: "Canaima GNU/Linux",
      },
    ],
  },
};

export default function CanaimaPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2009}
        subtitle="Canaima GNU/Linux"
        title="A Venezuelan Linux Distribution"
        description="Canaima GNU/Linux is a free and open-source Linux distribution that is based on the Debian architecture."
        team={[
          "Luis Martínez",
          "Carlos Parra",
          "Erick Birbe",
          "Sasha Solano",
          "Francisco Vásquez",
        ]}
        deliverables={[
          "Debian packages",
          "ISO images",
          "Documentation",
          "Artwork",
        ]}
        links={[
          { text: "Homepage", url: "https://canaima.softwarelibre.gob.ve/" },
          { text: "Source code", url: "https://gitlab.com/canaima-gnu-linux" },
        ]}
      />

      <CaseStudyHero
        src="/images/case-studies/canaima-hero.jpg"
        alt="Canaima GNU/Linux desktop"
      />

      <CaseStudySection index="01" label="Problem">
        <div className="site-case-figure">
          <CanaimaWhy aria-hidden="true" />
        </div>
        <p>
          The venezuelan government was looking for a way to migrate their
          infrastructure to a free and open-source operating system. They needed
          a method that could allow them to deploy software in a secure,
          centralized and reliable way to their millions of users across the
          country.
        </p>
        <p>
          Debian as an operating system, provided the stability and security
          that the government was looking for. However, the process of being
          accepted as a maintainer in Debian was long and tedious. The
          government needed to introduce hundreds of packages, without having to
          wait for the Debian maintainers to accept their packages.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          Leading a team of developers to create a Linux distribution is a tough
          job, but in the case of Canaima was even harder because we had to
          reach consensus with the user community while at the same time we had
          to meet the requirements of the government. We had annual events
          called &quot;Cayapas&quot; were we tried to get the community involved
          in the development of the distribution.
        </p>
        <p>
          We had to develop our own infraestructure to support the growing of
          the features we were adding to the distribution. We had to develop our
          own build system, our own package repository, and our own website.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          Canaima GNU/Linux had several components that needed to be functioning
          properly so that the distribution could be used. It had a website, a
          wiki, a forum, a mailing list, a bug tracker, a source code
          repository, a build system, a package repository, a download server,
          and a documentation server. All of these components needed to be
          working together in order to provide a good experience to the users.
        </p>
        <p>
          The build system was based on Debian&apos;s build system. We called it
          &quot;Canaima Semilla&quot;. It was a set of scripts that would build
          the packages and the ISO images. The build system was able to build
          the packages for different architectures, and it was able to build the
          ISO images for different flavors of the distribution.
        </p>
        <p>
          We also made our own web browser, called &quot;Cunaguaro&quot;. It was
          based on Firefox, but it had a different logo and it had some
          customizations that were specific to the distribution.
        </p>
        <CaseStudyVideo
          src="/images/case-studies/canaima-product.mp4"
          label="Canaima GNU/Linux in use"
        />
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          Canaima enjoyed a lot of popularity in Venezuela. It was used in
          schools, universities, government offices, and even in the military.
          On the first month of release of Canaima 3.0, it had 110,000 downloads
          and subsequent releases were also popular.
        </p>

        <CaseStudyStats
          items={[
            { value: "110K", lines: ["downloads on", "Canaima 3.0"] },
            { value: "150K", lines: ["downloads on", "Canaima 3.1"] },
            { value: "220K", lines: ["downloads on", "Canaima 4.0"] },
          ]}
        />

        <p>
          As a Canaima developer, I was able to assist to the 12th annual debian
          developers conference, which was held in Managua, Nicaragua. I was
          able to meet other Debian developers, including the creator of Live
          Build, which was the base for Canaima Semilla.
        </p>

        <CaseStudyGallery images={gallery} name="Canaima GNU/Linux" />
      </CaseStudySection>
    </SiteShell>
  );
}
