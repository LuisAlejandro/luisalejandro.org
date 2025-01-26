import Contact from "@components/Portfolio/Contact/Contact";
import Hero from "@components/Apps/Hero/Hero";
import { Layout } from "@components/Portfolio/Layout/Layout";
import { Section } from "@styles/GlobalComponents";
import { PortfolioStyles } from "@styles/globals";

const Portfolio = () => {
  return (
    
    <Layout>
      <PortfolioStyles />
      <Section grid overflowVisible>
        <Hero />
      </Section>
      <Contact transparentSection />
    </Layout>
  );
};

export default Portfolio;
