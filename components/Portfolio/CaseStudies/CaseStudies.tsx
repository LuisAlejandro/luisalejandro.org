import Link from "next/link";

import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

import { ProjectList } from "@constants/constants";

import { Section } from "@components/common/Layout/Section";
import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

import About from "@assets/images/about.svg";

import { Card } from "./Card";
import { CardGrid } from "./CardGrid";
import { CardInfo } from "./CardInfo";
import { CardTitle } from "./CardTitle";
import { Hr } from "./Hr";
import { Img } from "./Img";
import { Tag } from "./Tag";
import { TagList } from "./TagList";

const CaseStudies = () => {
  useEffect(() => {
    VanillaTilt.init(
      Array.from(document.querySelectorAll(".vanillatilt")) as HTMLElement[],
      {
        glare: true,
        max: 5,
        reset: true,
        "max-glare": 0.3,
      }
    );
  }, []);

  return (
    <>
      <svg viewBox="0 0 1920 100">
        <path
          fill="#f8d983"
          fillOpacity="0.5"
          d="M0,100l960-50l960,50V0L960,50L0,0V100z"
        />
        <path fill="#f8d983" d="M0,100h1920L960,50L0,100z" />
      </svg>
      <Section id="projects" accent1>
        <About
          style={{
            height: "300px",
            width: "300px",
            position: "absolute",
            top: "0",
            right: "calc(((100% - 1040px) / 2) - 40px)",
            opacity: "0.5",
            transform: "rotateZ(30deg)",
          }}
        />
        <SectionTitle main>Case studies</SectionTitle>
        <SectionText>
          Here I list some of the most complex and multidisciplinary projects
          that I&apos;ve been a part of.
        </SectionText>
        <CardGrid>
          {ProjectList.map((p, i) => (
            <Link key={i} href={p.visit} className="w-full">
              <Card className="vanillatilt">
                <Img
                  src={p.image}
                  style={{
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <CardTitle>{p.title}</CardTitle>
                <Hr />
                <CardInfo>{p.description}</CardInfo>
                <TagList>
                  {p.tags.map((t, i) => (
                    <Tag key={i}>{t}</Tag>
                  ))}
                </TagList>
              </Card>
            </Link>
          ))}
        </CardGrid>
      </Section>
      <svg viewBox="0 0 1920 100">
        <path fill="#f8d983" d="M960,50l960-50H0L960,50z" />
      </svg>
    </>
  );
};

export default CaseStudies;
