import React from 'react';

import { Section, SectionText, SectionTitle } from '@/styles/GlobalComponents';
import Button from '@/styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Hello there,
        </SectionTitle>
        <SectionText>
          My name is Luis Ma
        </SectionText>
        <Button onClick={(e) => {
          e.preventDefault();
          window.location.href = '/files/resume.pdf';
        }}>My Resume</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;
