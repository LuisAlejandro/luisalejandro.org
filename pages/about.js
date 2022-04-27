import BackgroundAnimation from '@/components/About/BackgroundAnimation/BackgroundAnimation';
import Hero from '@/components/About/Hero/Hero';
import Technologies from '@/components/About/Technologies/Technologies';
import { Layout } from '@/components/About/Layout/Layout';
import { Section } from '@/styles/GlobalComponents';


const About = () => {
  return (
    <Layout>
      <Section grid overflowVisible>
        <Hero />
        <BackgroundAnimation />
      </Section>
      <Technologies />
    </Layout>
  );
};


export default About;
