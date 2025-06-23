"use client";

import Acomplishments from "@components/Portfolio/Acomplishments/Acomplishments";
import BackgroundAnimation from "@components/Portfolio/BackgroundAnimation/BackgroundAnimation";
import CaseStudies from "@components/Portfolio/CaseStudies/CaseStudies";
import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import Hero from "@components/Portfolio/Hero/Hero";
import Journey from "@components/Portfolio/Journey/Journey";
import OtherWork from "@components/Portfolio/OtherWork/OtherWork";
import Toolbox from "@components/Portfolio/Toolbox/Toolbox";
import { Section } from "@components/common/Layout/Section";

const Portfolio = () => {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main>
        <Section grid overflowVisible>
          <Hero />
          <BackgroundAnimation />
        </Section>
        <Toolbox />
        <CaseStudies />
        <OtherWork />
        <Journey />
        <Acomplishments />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
