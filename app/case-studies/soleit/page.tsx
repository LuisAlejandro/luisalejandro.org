import type { Metadata } from "next";

import { config } from "@constants/constants";

import SoleitWhy from "@assets/images/soleit-why.svg";

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
  "/images/case-studies/soleit-gallery-1.png",
  "/images/case-studies/soleit-gallery-2.png",
  "/images/case-studies/soleit-gallery-3.png",
  "/images/case-studies/soleit-gallery-4.png",
  "/images/case-studies/soleit-gallery-5.png",
  "/images/case-studies/soleit-gallery-6.png",
  "/images/case-studies/soleit-gallery-7.png",
  "/images/case-studies/soleit-gallery-8.png",
  "/images/case-studies/soleit-gallery-9.png",
];

export const metadata: Metadata = {
  title: "Soleit desktop app | Luis Alejandro",
  description:
    "An Electron and Ionic React desktop app for biomechanical diagnosis: REST API, hardware driver, and 3D insole modelling for the Soleit startup.",
  keywords: [
    "Soleit",
    "kinesiology",
    "biomechanics",
    "Electron",
    "Ionic React",
    "hardware integration",
    "foot diagnosis",
    "desktop app",
    "case study",
    "Luis Alejandro",
    "Python",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/soleit`,
    types: {
      "text/markdown": [
        { url: "/case-studies/soleit.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    type: "article",
    images: [
      {
        url: "/images/case-studies/soleit-hero.png",
        alt: "Soleit desktop app",
      },
    ],
  },
};

export default function SoleitPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2021}
        subtitle="Soleit"
        title="A desktop app for kinesiology"
        description="The first automated biomechanical design software. An easier, more accurate, faster process to generate motion analysis and personalized insole 3D model."
        team={["Luis Martínez", "Saraí Santiago", "Israel Lugo", "Sergi Prats"]}
        deliverables={["A REST api", "A desktop app", "A hardware driver"]}
        links={[
          { text: "Client site", url: "https://soleit.app/en/how-it-works/" },
        ]}
      />

      <CaseStudyHero
        src="/images/case-studies/soleit-hero.png"
        alt="Soleit desktop application"
      />

      <CaseStudySection index="01" label="Problem">
        <div className="site-case-figure">
          <SoleitWhy aria-hidden="true" />
        </div>
        <p>
          This client had plans for growing its current portfolio in Chile and
          expanding to the United States with a Series B round of investors. To
          achieve those important goals, they needed to get rid of many of their
          manual processes and automate them. Also, many of these algorithms
          were scattered in different places and needed to be unified in a
          single app.
        </p>
        <p>
          As the diagnosis of feet is a very important part of the product, the
          client needed a way to connect the hardware to the app. The hardware
          was a 3D scanner that was connected to a computer via USB. The app
          needed to be able to communicate with the hardware and receive the
          data from the scanner.
        </p>
        <p>
          The client had a very clear idea of what they wanted to achieve, but
          they needed help to make it happen. They needed a team that could help
          them with the architecture, the development, and the deployment of the
          app.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          The application needed to be a desktop app as part of the bussiness
          model was to sell the access as a subscription. The client wanted to
          avoid the possibility of the users to share their credentials with
          other people. To achieve this, the app needed to be a desktop app that
          could be installed in the user&apos;s computer. This way, the app
          could be used only by the person that bought the subscription.
        </p>
        <p>
          The app needed to be able to communicate with the hardware. We only
          had a low level driver from the manufactirer that allowed us to make
          very basic operations on the scanner, so a lot of work was needed to
          make the scanner work as expected. The fact that it was a closed
          source driver made the process even harder.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          The app was developed using <b>Electron</b>, a framework that allows
          to create desktop apps using web technologies. As a frontend language
          we selected <b>Ionic React</b>, so that the client could build the
          application for mobile devices in the future. The backend was
          developed using <b>Node.js</b> and <b>Express.js</b>. The database was
          a <b>PostgreSQL database</b> hosted in <b>AWS</b>. It also had
          connections with the propietary software that made the diagnosis of
          the feet, which was accessed through <b>DynamoDB</b>, and it was also
          integrated with the S3 bucket where the auxiliary files were stored.
        </p>
        <p>
          The hardware driver was embedded in the electron window and was
          written in python. It exposed a couple of endpoints that allowed the
          app to communicate with the hardware.
        </p>
        <p>
          The app allows Soleit to make new foot diagnoses, but also, manage
          users, doctors, materials, directions and more.
        </p>
        <CaseStudyVideo
          src="/images/case-studies/soleit-product.mov"
          label="Soleit app walkthrough"
        />
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          Soleit is now able to make diagnoses in a <b>more efficient way</b>,
          allowing them to grow their business and expand to new markets. They
          have made a <b>lot of sales</b> and are now looking to improve some of
          the features of the app.
        </p>
        <CaseStudyStats
          items={[
            { value: "1000", lines: ["more than", "diagnosed patients"] },
            { value: "20", lines: ["more than", "sold subscriptions"] },
          ]}
        />
        <p>Here are some of the screenshots of the app:</p>
        <CaseStudyGallery images={gallery} name="Soleit" />
      </CaseStudySection>
    </SiteShell>
  );
}
