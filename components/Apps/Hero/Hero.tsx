import Link from "next/link";
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
        <Link legacyBehavior rel="tag nofollow noreferrer" href="/apps/agoras/privacy">
          Privacy
        </Link>
      
      </span>
      
      <span className="button1">
        <Link legacyBehavior rel="tag nofollow noreferrer" href="/apps/agoras/terms">
          Terms
        </Link>
      
      </span>
      <SectionText>
        
        <h2>Installation</h2>
        A commandline desktop app to publish short videos on TikTok.
      </SectionText>
    </LeftSection>
  </>
);

export default Hero;
