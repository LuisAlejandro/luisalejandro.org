import Link from "next/link";

import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";
import { LeftSection } from "@components/Portfolio/Hero/LeftSection";

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

      <span className="button1">
        <Link
          legacyBehavior
          rel="tag nofollow noreferrer"
          href="/apps/agoras/privacy"
        >
          Privacy
        </Link>
      </span>

      <span className="button1">
        <Link
          legacyBehavior
          rel="tag nofollow noreferrer"
          href="/apps/agoras/terms"
        >
          Terms
        </Link>
      </span>
      <SectionText>
        <h2>Installation</h2>A commandline desktop app to publish short videos
        on TikTok.
      </SectionText>
    </LeftSection>
  </>
);

export default Hero;
