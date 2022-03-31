import Acomplishments from '@/components/Acomplishments/Acomplishments';
import BackgroundAnimation from '@/components/BackgroundAnimation/BackgroundAnimation';
import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import Technologies from '@/components/Technologies/Technologies';
import Timeline from '@/components/TimeLine/TimeLine';
import { Layout } from '@/components/PortfolioLayout/Layout';
import { Section } from '@/styles/GlobalComponents';


const Portfolio = () => {
  return (
    <Layout>
      <Section grid overflowVisible>
        <Hero />
        <BackgroundAnimation />
      </Section>
      <Technologies />
      <Projects />
      <Timeline />
      <Acomplishments />
    </Layout>
  );
};

export default Portfolio;
