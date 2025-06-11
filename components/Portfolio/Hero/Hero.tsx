import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

import { Button1 } from "./Button1";
import { LeftSection } from "./LeftSection";
import { ResumeLink } from "./ResumeLink";

const Hero = () => (
  <>
    <LeftSection>
      <SectionTitle main>
        Plan. Build. <br />
        Test. Deploy.
        <br />
      </SectionTitle>
      <SectionText>
        I&apos;m passionate 💖 about finding out end user needs and creating
        beautiful interfaces with sustainable architecture.
      </SectionText>
      <Button1>
        <ResumeLink
          title='List all posts under the category "Climate"'
          rel="tag nofollow noreferrer"
          href="/files/resume.pdf"
          target="_blank"
        >
          Resume
        </ResumeLink>
      </Button1>
    </LeftSection>
  </>
);

export default Hero;
