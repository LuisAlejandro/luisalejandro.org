import type { Metadata } from "next";

import { config } from "@constants/constants";

import WheelTheWorldWhy from "@assets/images/wheeltheworld-why.svg";

import {
  CaseStudyBars,
  CaseStudyHero,
} from "@components/common/Site/CaseStudyMedia";
import { preview } from "@lib/metadata";

import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { PageEnd } from "@components/common/Site/PageEnd";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

// The study's own screenshot, absolutely addressed so it survives any host.
const pageImage = preview({
  url: `${config.url}/images/case-studies/wheeltheworld-hero.png`,
  alt: "Wheel The World CI/CD pipeline",
});

export const metadata: Metadata = {
  title: "CI/CD rebuild at Wheel The World | Luis Alejandro",
  description:
    "Rebuilding Wheel The World's CI/CD pipeline with Docker and GitHub Actions: deploys from 40 to 10 minutes, tests from 20 to 5 minutes, images from 1.5GB to 200MB.",
  keywords: [
    "Wheel the World",
    "accessible travel",
    "disability inclusion",
    "travel technology",
    "accessibility",
    "inclusive design",
    "web development",
    "case study",
    "Luis Alejandro",
    "social impact",
    "assistive technology",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/wheeltheworld`,
    types: {
      "text/markdown": [
        { url: "/case-studies/wheeltheworld.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    type: "article",
    images: pageImage.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    images: pageImage.twitter,
  },
};

export default function WheelTheWorldPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2022}
        subtitle="Wheel The World"
        title="A faster, stronger pipeline"
        description="Wheel The World had a problem: their CI/CD pipeline was slow, unreproducible and unreliable. I helped them build a new one from scratch, using Github Actions and Docker."
        team={[
          "Luis Alejandro Martínez",
          "Fede Carossino",
          "Gonzalo Rodríguez",
          "Sebastián Vinci",
        ]}
        deliverables={["Github Actions CI/CD"]}
        links={[]}
      />

      <CaseStudyHero
        src="/images/case-studies/wheeltheworld-hero.png"
        alt="Wheel The World engineering team"
      />

      <CaseStudySection index="01" label="Problem">
        <div className="site-case-figure">
          <WheelTheWorldWhy aria-hidden="true" />
        </div>
        <p>
          On 2022, I joined Wheel The World as a software engineer as part of a
          reestructuring of the company. They needed to scale up the team to
          deliver new features continuosly and reliably. I quickly noticed that
          the current CI/CD schema was going to be a bottleneck for the team, so
          I proposed to redesign it by dropping what wasnt working and build on
          top of that. Luckily, the CTO was thinking the same thing, so we
          started working on it right away.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          Wheel the world used to have a CI/CD pipeline based on Google Cloud
          Build. This pipeline was slow, unreliable and hard to maintain. It was
          also hard to reproduce locally, which made it hard to debug.
          Furthermore, the results of the testing were not connected to the
          deploy trigger, which meant that a failed test would not stop the
          deploy automatically. This led to a lot of manual work and a lot of
          time wasted.
        </p>
        <p>
          To complicate things even more, wheel the world was not using Docker
          at all. This meant that the environment in which the code was tested
          was not the same as the one in which it was deployed. This led to a
          lot of bugs that were hard to reproduce and fix.
        </p>
        <p>
          The Google Cloud Build pipeline wasnt able to provide parallelization,
          caching or more complex workflows, limiting the capacity to improve
          the overall CI/CD process.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          The first thing I did was to dockerize all the services and the tests
          of the most important applications. This allowed the team to have a
          consistent environment for testing and development, regardless of the
          operating system or local library versions. Next was to deprecate the
          old pipeline based on Google Cloud Build and replace it with a new one
          based on Github Actions. This allowed us to have a more flexible and
          powerful pipeline, with parallelization, caching and more complex
          workflows.
        </p>
        <p>
          Implementing the branch and merge workflow proposed by the CTO, I was
          able to reduce the time to deploy significantly and do interesting
          things like automatically deploy the master branch to production when
          all the tests pass. On a second iteration, by reducing the size of the
          docker images using multistage builds and dividing the tests in
          different jobs, I was able to reduce the time to deploy even more.
        </p>
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          The new pipeline is faster, more reliable and easier to maintain.
          Taking only the website as an example, the total weight of the docker
          image went from 1.5GB to 200MB, the time to deploy went from 40
          minutes to 10 minutes and the time to run the tests went from 20
          minutes to 5 minutes.
        </p>

        <CaseStudyBars
          title="Image size"
          unit="MB"
          points={[
            { label: "Original pipeline", value: 1500 },
            { label: "First iteration", value: 400 },
            { label: "Second iteration", value: 200 },
          ]}
        />
        <CaseStudyBars
          title="Time to deploy"
          unit="minutes"
          points={[
            { label: "Original pipeline", value: 40 },
            { label: "First iteration", value: 20 },
            { label: "Second iteration", value: 10 },
          ]}
        />

        <p>
          By reducing the aount of time it takes to deploy and the weight of the
          images, we were reducing the maintenance cost of the pipeline, which
          was a big win for the company. For example, for the website frontend,
          estimating a cost of 0.008 USD per minute of deployment, and 5
          pipeline runs per day (which is a conservative estimation), we were
          able to reduce the cost of the pipeline from 32 USD per month to 8 USD
          per month (75% reduction), just for one application.
        </p>

        <CaseStudyStats
          items={[
            {
              value: "4×",
              lines: ["faster deploys,", "40 to 10 minutes"],
            },
            { value: "7.5×", lines: ["smaller images,", "1.5 GB to 200 MB"] },
          ]}
        />
      </CaseStudySection>
      <PageEnd
        num="05"
        note="30 minutes"
        lines={["A problem", "like this one?"]}
        primary={{ label: "Let's talk", href: "/contact" }}
        secondary={{ label: "More work", href: "/portfolio" }}
      />
    </SiteShell>
  );
}
