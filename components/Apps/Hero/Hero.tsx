import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";
import { Button1 } from "@components/Portfolio/Hero/Button1";
import { LeftSection } from "@components/Portfolio/Hero/LeftSection";
import { ResumeLink } from "@components/Portfolio/Hero/ResumeLink";

const Hero = () => (
  <>
    <LeftSection>
      <SectionTitle main>
        Agoras <br />
        for TikTok
      </SectionTitle>
      <SectionText>
        A commandline desktop app to publish short videos on TikTok.
      </SectionText>
      <div className="flex flex-row gap-2">
        <Button1>
          <ResumeLink rel="tag nofollow noreferrer" href="/apps/agoras/privacy">
            Privacy
          </ResumeLink>
        </Button1>
        <Button1>
          <ResumeLink rel="tag nofollow noreferrer" href="/apps/agoras/terms">
            Terms
          </ResumeLink>
        </Button1>
      </div>
      {/* <SectionText>
        <h2>Installation</h2>A commandline desktop app to publish short videos
        on TikTok.
      </SectionText> */}
      <SectionText>&nbsp;</SectionText>
    </LeftSection>
  </>
);

export default Hero;
