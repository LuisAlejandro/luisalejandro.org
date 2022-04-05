import { Section, SectionText, SectionTitle } from 'styles/GlobalComponents';
import Button from 'styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';


const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Plan. Build. <br/>
          Test. Deploy.<br/>
        </SectionTitle>
        <SectionText>
          I&apos;m passionate 💖 about finding out end user needs and creating beautiful interfaces with sustainable architecture. 
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
