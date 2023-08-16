import Acomplishments from "@components/Portfolio/Acomplishments/Acomplishments";
import Projects from "@components/Portfolio/Projects/Projects";
import Gallery from "@components/Portfolio/Gallery/Gallery";
import Contact from "@components/Portfolio/Contact/Contact";
import BackgroundAnimation from "@components/Portfolio/BackgroundAnimation/BackgroundAnimation";
import Hero from "@components/Portfolio/Hero/Hero";
import Technologies from "@components/Portfolio/Technologies/Technologies";
import Timeline from "@components/Portfolio/TimeLine/TimeLine";
import { Layout } from "@components/Portfolio/Layout/Layout";
import { Section } from "@styles/GlobalComponents";
import { PortfolioStyles } from "@styles/globals";

const Portfolio = () => {
  return (
    <Layout>
      <PortfolioStyles />
      <Section grid overflowVisible>
        <Hero />
        <BackgroundAnimation />
      </Section>
      <Technologies />
      <Projects />
      <Gallery />
      <Timeline />
      <Acomplishments />
      <Contact transparentSection />
    </Layout>
  );
};

export default Portfolio;
