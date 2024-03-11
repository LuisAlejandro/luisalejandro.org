import { SectionText, SectionTitle } from "@styles/GlobalComponents";
import { LeftSection } from "./HeroStyles";

const Hero = () => (
  <>
    <LeftSection>
      <SectionTitle main center>
        LuisDevelops <br />
        for TikTok
      </SectionTitle>
      <SectionText>
        An app to publish short videos of my own Twitch stream.
      </SectionText>
      <span className="button1">
        <a
          rel="tag nofollow noreferrer"
          href="https://www.termsfeed.com/live/78193a16-1839-4bc4-b22b-e02ebb933972"
          target="_blank"
        >
          Privacy
        </a>
      </span>
      <span className="button1">
        <a
          rel="tag nofollow noreferrer"
          href="https://www.termsfeed.com/live/18048855-c81b-490f-a9f7-539fc28e1555"
          target="_blank"
        >
          Terms
        </a>
      </span>
    </LeftSection>
  </>
);

export default Hero;
