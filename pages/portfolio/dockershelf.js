import { Controller, Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";

import HeroIntro from "@components/CaseStudies/HeroIntro";
import Why from "@components/CaseStudies/Why";
import Challenge from "@components/CaseStudies/Challenge";
import Product from "@components/CaseStudies/Product";
import Results from "@components/CaseStudies/Results";
import Header from "@components/CaseStudies/Header";
import Footer from "@components/CaseStudies/Footer";
import { Layout } from "@components/CaseStudies/Layout";
import { CaseStudiesDetailsStyles } from "@styles/globals";

const Dockershelf = () => {
  return (
    <Layout>
      <CaseStudiesDetailsStyles />
      <div id="cases" style={{ background: "#333" }}>
        <Header bg="#303030" />
        <Controller>
          <div className="cases-content">
            <HeroIntro
              Subtitle={() => "Dockershelf"}
              Title={() => "Reliable dockerfiles"}
              Description={() =>
                "I had a need for debian based dockerfiles that were small, without sacrificing"
              }
              team={["Luis Martínez"]}
              deliverables={[
                "Debian images",
                "Python images",
                "Ruby images",
                "Node images",
                "MongoDB images",
                "Postgres images",
                "Odoo images",
              ]}
            />
            <Scene triggerElement="#why" duration="80%" triggerHook="1">
              {(progress) => (
                <Tween
                  to={{
                    top: "-100px",
                    backgroundPosition: "center 20%",
                  }}
                  ease="Expo.EaseIn"
                  totalProgress={progress}
                  paused
                >
                  <div
                    className="w-full page-hero"
                    style={{
                      backgroundImage: "url(/images/hero-dockershelf.jpg)",
                    }}
                  >
                    <svg viewBox="0 0 1920 100">
                      <path fill="#333" d="M960,50l960-50H0L960,50z" />
                    </svg>
                    <div className="h-96" />
                    <svg viewBox="0 0 1920 100">
                      <path fill="#333" d="M1920,0v100H0V0l960,50L1920,0z" />
                    </svg>
                  </div>
                </Tween>
              )}
            </Scene>
            <Why
              Title={() => "The Motivation"}
              Content={() =>
                "I had a need for debian based dockerfiles that were small, without sacrificing"
              }
            />
            <Challenge
              Title={() => "The Challenge"}
              Content={() =>
                "I had a need for debian based dockerfiles that were small, without sacrificing"
              }
            />
            <Product
              Title={() => "The Product"}
              Content={() =>
                "I had a need for debian based dockerfiles that were small, without sacrificing"
              }
            />
            <Results
              Title={() => "The Results"}
              Content={() =>
                "I had a need for debian based dockerfiles that were small, without sacrificing"
              }
            />
          </div>
        </Controller>
        <Footer />
      </div>
    </Layout>
  );
};

export default Dockershelf;
