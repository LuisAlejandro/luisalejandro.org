import { useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import SoleitWhy from "@assets/images/soleit-why.svg";
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

const Soleit = () => {
  const [index, setIndex] = useState(-1);

  const galleryUrlList = [
    "/images/case-studies/soleit-gallery-1.png",
    "/images/case-studies/soleit-gallery-2.png",
    "/images/case-studies/soleit-gallery-3.png",
    "/images/case-studies/soleit-gallery-4.png",
    "/images/case-studies/soleit-gallery-5.png",
    "/images/case-studies/soleit-gallery-6.png",
    "/images/case-studies/soleit-gallery-7.png",
    "/images/case-studies/soleit-gallery-8.png",
    "/images/case-studies/soleit-gallery-9.png",
  ];

  return (
    <Layout>
      <CaseStudiesDetailsStyles />
      <div id="cases" style={{ background: "#333" }}>
        <Header bg="#303030" />
        <Controller>
          <div className="cases-content">
            <HeroIntro
              Subtitle={() => "Soleit"}
              Title={() => "A desktop app for kinesiology"}
              Description={() => (
                <>
                  The first automated biomechanical design software. An easier,
                  more accurate, faster process to generate motion analysis and
                  personalized insole 3D model.
                </>
              )}
              team={[
                "Luis Martínez",
                "Saraí Santiago",
                "Israel Lugo",
                "Sergi Prats",
              ]}
              deliverables={[
                "A REST api",
                "A desktop app",
                "A hardware driver",
              ]}
              links={[
                {
                  text: "Client site",
                  url: "https://soleit.app/en/how-it-works/",
                },
              ]}
              year={2021}
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
                        "url(/images/case-studies/soleit-hero.png)",
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
                    This client had plans for growing its current portfolio in
                    Chile and expanding to the United States with a Series B
                    round of investors. To achieve those important goals, they
                    needed to get rid of many of their manual processes and
                    automate them. Also, many of these algorithms were scattered
                    in different places and needed to be unified in a single
                    app.
                  </p>
                  <p className="py-5">
                    As the diagnosis of feet is a very important part of the
                    product, the client needed a way to connect the hardware to
                    the app. The hardware was a 3D scanner that was connected to
                    a computer via USB. The app needed to be able to communicate
                    with the hardware and receive the data from the scanner.
                  </p>
                  <p className="py-5">
                    The client had a very clear idea of what they wanted to
                    achieve, but they needed help to make it happen. They needed
                    a team that could help them with the architecture, the
                    development, and the deployment of the app.
                  </p>
                </>
              )}
              ImageComponent={(props) => <SoleitWhy {...props} />}
              ImageUseEffect={() => {
                const backgroundPos = { x: 0, y: 0 };
                const womanPos = { x: 0, y: 0 };
                const cactusPos = { x: 0, y: 0 };
                const manPos = { x: 0, y: 0 };

                const moveBackground = function (x, y) {
                  const el = document.querySelector("#why-background");
                  if (!el) return;
                  backgroundPos.x = (x / window.innerWidth).toFixed(2);
                  backgroundPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${
                    20 * backgroundPos.x + 0
                  }px, ${20 * backgroundPos.y + 0}px) rotateZ(0deg)`;
                };

                const moveWoman = function (x, y) {
                  const el = document.querySelector("#why-woman");
                  if (!el) return;
                  womanPos.x = (x / window.innerWidth).toFixed(2);
                  womanPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${10 * womanPos.x - 0}px, ${
                    10 * womanPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const moveCactus = function (x, y) {
                  const el = document.querySelector("#why-cactus");
                  if (!el) return;
                  cactusPos.x = (x / window.innerWidth).toFixed(2);
                  cactusPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${-10 * cactusPos.x - 0}px, ${
                    -10 * cactusPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const moveMan = function (x, y) {
                  const el = document.querySelector("#why-man");
                  if (!el) return;
                  manPos.x = (x / window.innerWidth).toFixed(2);
                  manPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${-20 * manPos.x + 0}px, ${
                    -20 * manPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const mousemoveCallback = (e) => {
                  moveBackground(e.clientX, e.clientY);
                  moveWoman(e.clientX, e.clientY);
                  moveCactus(e.clientX, e.clientY);
                  moveMan(e.clientX, e.clientY);
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
                    The application needed to be a desktop app as part of the
                    bussiness model was to sell the access as a subscription.
                    The client wanted to avoid the possibility of the users to
                    share their credentials with other people. To achieve this,
                    the app needed to be a desktop app that could be installed
                    in the user&apos;s computer. This way, the app could be used
                    only by the person that bought the subscription.
                  </p>
                  <p className="py-5">
                    The app needed to be able to communicate with the hardware.
                    We only had a low level driver from the manufactirer that
                    allowed us to make very basic operations on the scanner, so
                    a lot of work was needed to make the scanner work as
                    expected. The fact that it was a closed source driver made
                    the process even harder.
                  </p>
                  <p className="py-5"></p>
                </>
              )}
              imgUrl="/images/case-studies/soleit-challenge.png"
            />
            <Product
              Title={() => "The Product"}
              Content={() => (
                <>
                  <p className="py-5">
                    The app was developed using{" "}
                    <b className="font-black">Electron</b>, a framework that
                    allows to create desktop apps using web technologies. As a
                    frontend language we selected{" "}
                    <b className="font-black">Ionic React</b>, so that the
                    client could build the application for mobile devices in the
                    future. The backend was developed using{" "}
                    <b className="font-black">Node.js</b> and{" "}
                    <b className="font-black">Express.js</b>. The database was a{" "}
                    <b className="font-black">PostgreSQL database</b> hosted in{" "}
                    <b className="font-black">AWS</b>. It also had connections
                    with the propietary software that made the diagnosis of the
                    feet, which was accessed through{" "}
                    <b className="font-black">DynamoDB</b>, and it was also
                    integrated with the S3 bucket where the auxiliary files were
                    stored.
                  </p>
                  <p className="py-5">
                    The hardware driver was embedded in the electron window and
                    was written in python. It exposed a couple of endpoints that
                    allowed the app to communicate with the hardware.
                  </p>
                  <p className="py-5">
                    The app allows Soleit to make new foot diagnoses, but also,
                    manage users, doctors, materials, directions and more.
                  </p>
                </>
              )}
              videoUrl="/images/case-studies/soleit-product.mov"
            />
            <Results
              Title={() => "The Results"}
              Content={() => (
                <>
                  <p className="py-5">
                    Soleit is now able to make diagnoses in a{" "}
                    <b className="font-black">more efficient way</b>, allowing
                    them to grow their business and expand to new markets. They
                    have made a <b className="font-black">lot of sales</b> and
                    are now looking to improve some of the features of the app.
                  </p>
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                        more than
                      </div>
                      <div className="font-display font-black text-12xl leading-none text-center">
                        1000
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                        diagnosed
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                        patients
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                        more than
                      </div>
                      <div className="font-display font-black text-12xl leading-none text-center">
                        20
                        <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                          sold
                        </div>
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl text-center">
                        subscriptions
                      </div>
                    </div>
                  </div>
                  <p className="py-5">
                    Here are some of the screenshots of the app:
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
                </>
              )}
              links={[
                {
                  text: "Client site",
                  url: "https://soleit.app/en/how-it-works/",
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

export default Soleit;
