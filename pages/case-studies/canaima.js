import { Controller, Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

import DockershelfWhy from "@assets/images/dockershelf-why.svg";
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

ChartJS.register(LinearScale, CategoryScale, BarElement);
ChartJS.defaults.font.family = "Roboto, sans-serif";
ChartJS.defaults.font.size = 16;
ChartJS.defaults.font.weight = "300";

const Soleit = () => {
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
                  that is based on the Debian architecture. It was created in
                  2004 by the Centro Nacional de Tecnologías de Información
                  (CNTI) of the Venezuelan government as a solution to cover the
                  needs of the Venezuelan Government as a response to
                  presidential decree 3,390 that prioritizes the use of free and
                  open source technologies in the public administration.
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
                  text: "Github",
                  url: "https://github.com/Dockershelf/dockershelf",
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
              Title={() => "The Motivation"}
              Content={() => (
                <>
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                </>
              )}
              ImageComponent={(props) => <DockershelfWhy {...props} />}
              ImageUseEffect={() => {
                const monitorPos = { x: 0, y: 0 };
                const personPos = { x: 0, y: 0 };
                const whalesPos = { x: 0, y: 0 };

                const moveMonitor = function (x, y) {
                  const el = document.querySelector("#why-monitor");
                  if (!el) return;
                  monitorPos.x = (x / window.innerWidth).toFixed(2);
                  monitorPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${10 * monitorPos.x + 0}px, ${
                    10 * monitorPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const movePerson = function (x, y) {
                  const el = document.querySelector("#why-person");
                  if (!el) return;
                  personPos.x = (x / window.innerWidth).toFixed(2);
                  personPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${30 * personPos.x - 0}px, ${
                    30 * personPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const moveWhales = function (x, y) {
                  const el = document.querySelector("#why-whales");
                  if (!el) return;
                  whalesPos.x = (x / window.innerWidth).toFixed(2);
                  whalesPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${-10 * whalesPos.x - 0}px, ${
                    -10 * whalesPos.y - 0
                  }px) rotateZ(0deg)`;
                };

                const mousemoveCallback = (e) => {
                  moveMonitor(e.clientX, e.clientY);
                  movePerson(e.clientX, e.clientY);
                  moveWhales(e.clientX, e.clientY);
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
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                </>
              )}
              imgUrl="/images/case-studies/canaima-challenge.png"
            />
            <Product
              Title={() => "The Product"}
              Content={() => (
                <>
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                  <p className="py-5"></p>
                </>
              )}
              videoUrl="/images/case-studies/canaima-product.mp4"
            />
            <Results
              Title={() => "The Results"}
              Content={() => (
                <>
                  <p className="py-5"></p>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        220K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        debian images
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        294K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        python images
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        55K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        downloads on
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        node images
                      </div>
                    </div>
                  </div>
                  <p className="py-5"></p>
                  <div className="flex">
                    <div className="w-1/2 p-16 m-8 rounded-3xl bg-white">
                      <Bar
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                        data={{
                          labels: ["dockerhub node", "dockershelf node"],
                          datasets: [
                            {
                              label: "Debian",
                              data: [367.93, 82.43],
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                              ],
                              borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className="w-1/2 p-16 m-8 rounded-3xl bg-white">
                      <Bar
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                        data={{
                          labels: ["dockerhub python", "dockershelf python"],
                          datasets: [
                            {
                              label: "Python",
                              data: [360.46, 100.09],
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                              ],
                              borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                  <p className="py-5"></p>
                </>
              )}
              links={[
                {
                  text: "Github",
                  url: "https://github.com/Dockershelf/dockershelf",
                },
                {
                  text: "Dockerhub",
                  url: "https://hub.docker.com/u/dockershelf",
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
