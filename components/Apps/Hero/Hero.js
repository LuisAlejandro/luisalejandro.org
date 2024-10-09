import { SectionText, SectionTitle } from "@styles/GlobalComponents";
import { LeftSection } from "./HeroStyles";

const Hero = () => (
  <>
    <LeftSection>
      <SectionTitle main center>
        Agoras <br />
        for TikTok
      </SectionTitle>
      <SectionText>
        A commandline desktop app to publish short videos on TikTok.
      </SectionText>
      <span className="button1">
        <a rel="tag nofollow noreferrer" href="/apps/agoras/privacy">
          Privacy
        </a>
      </span>
      <span className="button1">
        <a rel="tag nofollow noreferrer" href="/apps/agoras/terms">
          Terms
        </a>
      </span>
      <SectionText>
        <h2>Installation</h2>
        A commandline desktop app to publish short videos on TikTok.
      </SectionText>
    </LeftSection>
  </>
);

export default Hero;
