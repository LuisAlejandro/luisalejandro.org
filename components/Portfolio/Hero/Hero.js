import { Section, SectionText, SectionTitle } from "@styles/GlobalComponents";
import { LeftSection } from "./HeroStyles";

const Hero = () => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Plan. Build. <br />
          Test. Deploy.
          <br />
        </SectionTitle>
        <SectionText>
          I&apos;m passionate 💖 about finding out end user needs and creating
          beautiful interfaces with sustainable architecture.
        </SectionText>
        <span className="button1">
          <a
            title='List all posts under the category "Climate"'
            rel="tag nofollow noreferrer"
            href="/files/resume.pdf"
            target="_blank"
          >
            Resume
          </a>
        </span>
      </LeftSection>
    </Section>
  </>
);

export default Hero;
