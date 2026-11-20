import type { Metadata } from "next";

import { config } from "@constants/constants";

import DockershelfWhy from "@assets/images/dockershelf-why.svg";

import {
  CaseStudyBars,
  CaseStudyHero,
  CaseStudyVideo,
} from "@components/common/Site/CaseStudyMedia";
import { type PreviewImage, pageMeta } from "@lib/metadata";

import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { PageEnd } from "@components/common/Site/PageEnd";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

// The study's own screenshot, absolutely addressed so it survives any host.
const pageImage: PreviewImage = {
  url: `${config.url}/images/case-studies/dockershelf-hero.png`,
  alt: "Dockershelf images",
};

export const metadata: Metadata = {
  ...pageMeta({
    title: "Dockershelf | Luis Alejandro",
    description:
      "Dockershelf: Debian-based Docker images built from scratch, tested weekly in GitHub Actions, and roughly four times smaller than the official ones.",
    path: "/case-studies/dockershelf",
    image: pageImage,
    type: "article",
  }),
  keywords: [
    "Dockershelf",
    "Docker images",
    "containerization",
    "DevOps",
    "programming languages",
    "development tools",
    "automation",
    "case study",
    "Luis Alejandro",
    "software architecture",
    "CI/CD",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/dockershelf`,
    types: {
      "text/markdown": [
        { url: "/case-studies/dockershelf.md", title: "Markdown twin" },
      ],
    },
  },
};

export default function DockershelfPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2016}
        subtitle="Dockershelf"
        title="Reliable docker images"
        description="Dockershelf is a repository that serves as a collector for docker recipes that are universal, efficient and slim. We keep adding “shelves”, which are holders for the different versions of a popular language or application. Images are updated, tested and published weekly via a Github Actions workflow."
        team={["Luis Alejandro Martínez"]}
        deliverables={[
          "Debian images",
          "Python images",
          "Node images",
          "Latex images",
        ]}
        links={[
          { text: "Github", url: "https://github.com/Dockershelf/dockershelf" },
          { text: "Dockerhub", url: "https://hub.docker.com/u/dockershelf" },
        ]}
      />

      <CaseStudyHero
        src="/images/case-studies/dockershelf-hero.png"
        alt="Dockershelf image collection"
      />

      <CaseStudySection index="01" label="Problem">
        <div className="site-case-figure">
          <DockershelfWhy aria-hidden="true" />
        </div>
        <p>
          As <b>software engineer</b>, I was always looking for a way to{" "}
          <b>be more efficient</b> with my time. One of the challenges that I
          faced was the need to have a reliable and fast way to build and deploy
          my applications. I started using <b>docker</b>, but at the time all
          docker images were based on debian stable or ubuntu. The first had
          legacy software, and the latter was too unstable to be used in
          production. I needed at least a <b>debian testing or sid</b> image,
          but there were none available. So I decided to build my own.
        </p>
        <p>
          Soon, I started to unit test <b>python apps</b> and needed docker
          images for different versions. I also needed to build node apps, and
          latex documents. I started to build my own images for all of them, and
          I realized that I could share them with the community. That&apos;s how{" "}
          <b>Dockershelf</b> was born.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          I wanted the project to be <b>sustainable</b> and completely{" "}
          <b>open source</b>. This meant that I needed to use services that were
          free and publicly accessible. Also, I wanted it to be completely
          unmantained, or at least the mantainance to be as minimal as possible.
          This meant that I needed to <b>automate everything</b>, from the build
          process to the publishing of images.
        </p>
        <p>
          The automation presented a problem, because I could inadvertently
          publish a broken image. I needed a way to <b>test the images</b>{" "}
          before publishing them.
        </p>
        <p>
          I also wanted to use the debian packaging system to install the needed
          software, because for example official python and node images were
          built from source and that made them{" "}
          <b> prone to errors and inconsistencies </b> . This also meant that I
          needed to build the images from <b>scratch</b>, and not use any of the
          existing images as a base.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          I came up with a way to automate the build process using Travis CI. I
          created templates for the pipeline configuration, which would create
          the actual configuration containing the list of images to build. I
          could control the specific versions of python or node to build,
          depending on its popularity and availability of the software in the
          debian repositories. I experienced a setback when Travis CI became a
          paid service, so I had to migrate to Github Actions.
        </p>
        <p>
          I decided to focus on the images I was going to need for my projects:
          Debian, Python and Node. I also added a Latex one to write my CV. I
          needed them to be based on debian sid for development purposes but I
          later added a Debian stable version for production. Initially they
          were all amd64 images but I later added arm64 for mac users.
        </p>
        <p>
          I created a test suite for the images, which would run on every build.
          The test suite would check that the images were built correctly and
          that the software was installed and working. The builds are run
          weekly, and the images are published to Dockerhub if the tests pass.
        </p>
        <CaseStudyVideo
          src="/images/case-studies/dockershelf-product.mov"
          label="Dockershelf build and test run"
        />
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          My intention with dockershelf was to be a personal project, but it
          turned out to be something more. Several people started using the
          images and I started to receive feedback and contributions. The
          project has also been featured in the awesome-docker repository, and
          it has been starred more than 60 times.
        </p>
        <p>
          The difference in size between the official images and the dockershelf
          ones are significant. The Python and Node images are 4 times smaller,
          making them faster to download and use. Although not as small as
          Alpine, they are still a good alternative for those who need a Debian
          based image.
        </p>

        <CaseStudyBars
          title="Debian images"
          unit="MB"
          points={[
            { label: "dockerhub", value: 367.93 },
            { label: "dockershelf", value: 82.43 },
          ]}
        />
        <CaseStudyBars
          title="Python images"
          unit="MB"
          points={[
            { label: "dockerhub", value: 360.46 },
            { label: "dockershelf", value: 100.09 },
          ]}
        />

        <CaseStudyStats
          items={[
            { value: "569K", lines: ["downloads across", "all images"] },
            { value: "294K", lines: ["downloads on", "python images"] },
            { value: "~4×", lines: ["smaller than the", "official images"] },
          ]}
        />

        <p>
          The project is still active and I keep adding new images and
          arquitectures when possible. You can checkout the project on Github or
          contact me for more information.
        </p>
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
