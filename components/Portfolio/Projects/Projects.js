import { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import Link from 'next/link'

import { Section, SectionDivider, SectionTitle, SectionText } from 'styles/GlobalComponents';
import { ProjectList } from 'constants/constants';
import About from 'assets/images/about.svg'
import {
  BlogCard,
  CardInfo,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  Img
} from './ProjectsStyles';


const Projects = () => {

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".vanillatilt"), {
      glare: true,
      max: 5,
      reset: true,
      'max-glare': 0.3
    });
  }, []);
  
  return (
    <Section id="projects">
      <About className="container-about" />
      <SectionTitle main>Case studies</SectionTitle>
      <SectionText>
        These are my preferred technologies when it comes to implementing your solutions.
      </SectionText>
      <GridContainer>
        {ProjectList.map((p, i) => {
          return (
            <BlogCard className="vanillatilt" key={i}>
              <Img src={p.image} />
              <HeaderThree title={p.title}>
                <Link href={p.visit}>
                  {p.title}
                </Link>
              </HeaderThree>
              <Hr />
              <CardInfo className="card-info">{p.description}</CardInfo>
              <div>
                <TagList>
                  {p.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
                </TagList>
              </div>
            </BlogCard>
          );
        })}
      </GridContainer>
      <SectionDivider />
    </Section>
  );
};

export default Projects;