import { useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import CanaimaWhy from "@assets/images/canaima-why.svg";
import HeroIntro from "@components/CaseStudies/HeroIntro";
import Why from "@components/CaseStudies/Why";
import Challenge from "@components/CaseStudies/Challenge";
import Product from "@components/CaseStudies/Product";
import Results from "@components/CaseStudies/Results";
import Header from "@components/CaseStudies/Header";
import Footer from "@components/CaseStudies/Footer";
import Contact from "@components/Portfolio/Contact/Contact";
import { Layout } from "@components/CaseStudies/Layout";
import { CaseStudiesDetailsStyles } from "@styles/globals";

const Canaima = () => {
  const [index, setIndex] = useState(-1);

  const galleryUrlList = [
    "/images/case-studies/canaima-gallery-1.png",
    "/images/case-studies/canaima-gallery-2.png",
    "/images/case-studies/canaima-gallery-3.png",
    "/images/case-studies/canaima-gallery-4.png",
    "/images/case-studies/canaima-gallery-5.jpg",
    "/images/case-studies/canaima-gallery-6.jpg",
    "/images/case-studies/canaima-gallery-7.jpg",
    "/images/case-studies/canaima-gallery-8.jpg",
  ];
  return (
    <Layout>
      <CaseStudiesDetailsStyles />
      <div id="cases" style={{ background: "#333" }}>
        <Header bg="#303030" />
        <Controller>
          <div className="cases-content">
            <HeroIntro
              Subtitle={() => "Canaima GNU/Linux"}
              Title={() => "A Venezuelan Linux Distribution"}
              Description={() => (
                <>
                  Canaima GNU/Linux is a free and open-source Linux distribution
                  that is based on the Debian architecture.
                </>
              )}
              team={[
                "Luis Martínez",
                "Carlos Parra",
                "Erick Birbe",
                "Sasha Solano",
                "Francisco Vásquez",
              ]}
              deliverables={[
                "Debian packages",
                "ISO images",
                "Documentation",
                "Artwork",
              ]}
              links={[
                {
                  text: "Homepage",
                  url: "https://canaima.softwarelibre.gob.ve/",
                },
                {
                  text: "Source code",
                  url: "https://gitlab.com/canaima-gnu-linux",
                },
              ]}
              year={2009}
            />
            <Scene triggerElement="#why" duration="80%" triggerHook="1">
              {(progress) => (
                <Tween
                  to={{
                    top: "-150px",
                    backgroundPosition: "center 20%",
                  }}
                  ease="Expo.EaseIn"
                  totalProgress={progress}
                  paused
                >
                  <div
                    className="w-full page-hero"
                    style={{
                      backgroundImage:
                        "url(/images/case-studies/canaima-hero.jpg)",
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
              Title={() => "The Problem"}
              Content={() => (
                <>
                  <p className="py-5">
                    The venezuelan government was looking for a way to migrate
                    their infrastructure to a free and open-source operating
                    system. They needed a method that could allow them to deploy
                    software in a secure, centralized and reliable way to their
                    millions of users across the country.
                  </p>
                  <p className="py-5">
                    Debian as an operating system, provided the stability and
                    security that the government was looking for. However, the
                    process of being accepted as a maintainer in Debian was long
                    and tedious. The government needed to introduce hundreds of
                    packages, without having to wait for the Debian maintainers
                    to accept their packages.
                  </p>
                </>
              )}
              ImageComponent={(props) => <CanaimaWhy {...props} />}
              ImageUseEffect={() => {
                const whiteboardPos = { x: 0, y: 0 };
                const presenterPos = { x: 0, y: 0 };
                const peoplePos = { x: 0, y: 0 };

                const moveWhiteboard = function (x, y) {
                  const el = document.querySelector("#why-whiteboard");
                  if (!el) return;
                  whiteboardPos.x = (x / window.innerWidth).toFixed(2);
                  whiteboardPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${
                    10 * whiteboardPos.x + 0
                  }px, ${10 * whiteboardPos.y + 0}px) rotateZ(0deg)`;
                };

                const movePresenter = function (x, y) {
                  const el = document.querySelector("#why-presenter");
                  if (!el) return;
                  presenterPos.x = (x / window.innerWidth).toFixed(2);
                  presenterPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${
                    30 * presenterPos.x - 0
                  }px, ${30 * presenterPos.y + 0}px) rotateZ(0deg)`;
                };

                const movePeople = function (x, y) {
                  const el = document.querySelector("#why-people");
                  if (!el) return;
                  peoplePos.x = (x / window.innerWidth).toFixed(2);
                  peoplePos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${-10 * peoplePos.x - 0}px, ${
                    -10 * peoplePos.y - 0
                  }px) rotateZ(0deg)`;
                };

                const mousemoveCallback = (e) => {
                  moveWhiteboard(e.clientX, e.clientY);
                  movePresenter(e.clientX, e.clientY);
                  movePeople(e.clientX, e.clientY);
                };

                document.addEventListener("mousemove", mousemoveCallback);

                return () => {
                  document.removeEventListener("mousemove", mousemoveCallback);
                };
              }}
            />
            <Challenge
              Title={() => "The Challenge"}
              Content={() => (
                <>
                  <p className="py-5">
                    Leading a team of developers to create a Linux distribution
                    is a tough job, but in the case of Canaima was even harder
                    because we had to reach consensus with the user community
                    while at the same time we had to meet the requirements of
                    the government. We had annual events called
                    &quot;Cayapas&quot; were we tried to get the community
                    involved in the development of the distribution.
                  </p>
                  <p className="py-5">
                    We had to develop our own infraestructure to support the
                    growing of the features we were adding to the distribution.
                    We had to develop our own build system, our own package
                    repository, and our own website.
                  </p>
                </>
              )}
              bgImgClass="lg:bg-case-studies-canaima-challenge"
            />
            <Product
              Title={() => "The Product"}
              Content={() => (
                <>
                  <p className="py-5">
                    Canaima GNU/Linux had several components that needed to be
                    functioning properly so that the distribution could be used.
                    It had a website, a wiki, a forum, a mailing list, a bug
                    tracker, a source code repository, a build system, a package
                    repository, a download server, and a documentation server.
                    All of these components needed to be working together in
                    order to provide a good experience to the users.
                  </p>
                  <p className="py-5">
                    The build system was based on Debian&apos;s build system. We
                    called it &quot;Canaima Semilla&quot;. It was a set of
                    scripts that would build the packages and the ISO images.
                    The build system was able to build the packages for
                    different architectures, and it was able to build the ISO
                    images for different flavors of the distribution.
                  </p>
                  <p className="py-5">
                    We also made our own web browser, called
                    &quot;Cunaguaro&quot;. It was based on Firefox, but it had a
                    different logo and it had some customizations that were
                    specific to the distribution.
                  </p>
                </>
              )}
              videoUrl="/images/case-studies/canaima-product.mp4"
            />
            <Results
              Title={() => "The Results"}
              Content={() => (
                <>
                  <p className="py-5">
                    Canaima enjoyed a lot of popularity in Venezuela. It was
                    used in schools, universities, government offices, and even
                    in the military. On the first month of release of Canaima
                    3.0, it had 110,000 downloads and subsequent releases were
                    also popular.
                  </p>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        110K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        Canaima 3.0
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        150K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        Canaima 3.1
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        220K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        Canaima 4.0
                      </div>
                    </div>
                  </div>
                  <p className="py-5">
                    As a Canaima developer, I was able to assist to the 12th
                    annual debian developers conference, which was held in
                    Managua, Nicaragua. I was able to meet other Debian
                    developers, including the creator of Live Build, which was
                    the base for Canaima Semilla.
                  </p>
                  <div className="py-5">
                    <PhotoAlbum
                      photos={galleryUrlList.map((url) => ({
                        src: url,
                        width: 1080,
                        height: 800,
                      }))}
                      layout="rows"
                      targetRowHeight={150}
                      onClick={({ index }) => setIndex(index)}
                    />
                    <Lightbox
                      slides={galleryUrlList.map((url) => ({
                        src: url,
                        width: 1080,
                        height: 800,
                      }))}
                      open={index >= 0}
                      index={index}
                      close={() => setIndex(-1)}
                    />
                  </div>
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                </>
              )}
              links={[
                {
                  text: "Homepage",
                  url: "https://canaima.softwarelibre.gob.ve/",
                },
                {
                  text: "Source code",
                  url: "https://gitlab.com/canaima-gnu-linux",
                },
              ]}
            />
          </div>
        </Controller>
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
};

export default Canaima;
