import Link from "next/link";
import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

import { Section, SectionTitle, SectionText } from "@styles/GlobalComponents";
import { ProjectList } from "@constants/constants";
import About from "@assets/images/about.svg";
import {
  BlogCard,
  CardInfo,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  Img,
} from "./ProjectsStyles";

const Projects = () => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".vanillatilt"), {
      glare: true,
      max: 5,
      reset: true,
      "max-glare": 0.3,
    });
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
        <About className="container-about" />
        <SectionTitle main>Case studies</SectionTitle>
        <SectionText>
          Here I list some of the most complex and multidisciplinary projects
          that I&apos;ve been a part of.
        </SectionText>
        <GridContainer>
          {ProjectList.map((p, i) => (
            <Link legacyBehavior passHref key={i} href={p.visit}>
              <a>
                <BlogCard className="vanillatilt">
                  <Img
                    src={p.image}
                    layout="fill"
                    style={{
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <HeaderThree title={p.title}>{p.title}</HeaderThree>
                  <Hr />
                  <CardInfo className="card-info">{p.description}</CardInfo>
                  <div>
                    <TagList>
                      {p.tags.map((t, i) => (
                        <Tag key={i}>{t}</Tag>
                      ))}
                    </TagList>
                  </div>
                </BlogCard>
              </a>
            </Link>
          ))}
        </GridContainer>
      </Section>
      <svg viewBox="0 0 1920 100">
        <path fill="#f8d983" d="M960,50l960-50H0L960,50z" />
      </svg>
    </>
  );
};

export default Projects;
