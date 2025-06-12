"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Tween } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";

import WheelTheWorldWhy from "@assets/images/wheeltheworld-why.svg";

import Challenge from "@components/CaseStudies/Challenge";
import HeroIntro from "@components/CaseStudies/HeroIntro";
import Product from "@components/CaseStudies/Product";
import Results from "@components/CaseStudies/Results";
import Why from "@components/CaseStudies/Why";
import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

ChartJS.register(LinearScale, CategoryScale, BarElement);
ChartJS.defaults.font.family = "Roboto, sans-serif";
ChartJS.defaults.font.size = 16;

ChartJS.defaults.font.weight = 300;

const WheelTheWorldPage = () => {
  return (
    <div className="w-full">
      <main>
        <style jsx global>{`
          body {
            font-family: var(--font-roboto), sans-serif;
            font-size: 1.6rem;
            color: #222222;
            cursor: default;
            overflow-x: hidden;
          }
        `}</style>
        <div id="cases" style={{ background: "#333" }}>
          <Header variant="case-studies" />
          <Controller>
            <div className="cases-content">
              <HeroIntro
                Subtitle={() => "Wheel The World"}
                Title={() => "A faster, stronger pipeline"}
                Description={() => (
                  <>
                    Wheel The World had a problem: their CI/CD pipeline was
                    slow, unreproducible and unreliable. I helped them build a
                    new one from scratch, using Github Actions and Docker.
                  </>
                )}
                team={[
                  "Luis Martínez",
                  "Fede Carossino",
                  "Gonzalo Rodríguez",
                  "Sebastián Vinci",
                ]}
                deliverables={["Github Actions CI/CD"]}
                links={[]}
                year={2022}
              />
              <Scene triggerElement="#why" duration="80%" triggerHook="1">
                {(progress: any) => (
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
                          "url(/images/case-studies/wheeltheworld-hero.png)",
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
                      On 2022, I joined Wheel The World as a software engineer
                      as part of a reestructuring of the company. They needed to
                      scale up the team to deliver new features continuosly and
                      reliably. I quickly noticed that the current CI/CD schema
                      was going to be a bottleneck for the team, so I proposed
                      to redesign it by dropping what wasnt working and build on
                      top of that. Luckily, the CTO was thinking the same thing,
                      so we started working on it right away.
                    </p>
                  </>
                )}
                ImageComponent={(props: any) => <WheelTheWorldWhy {...props} />}
                ImageUseEffect={() => {
                  const rocketPos = { x: 0, y: 0 };
                  const chartPos = { x: 0, y: 0 };
                  const manPos = { x: 0, y: 0 };

                  const moveRocket = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-rocket"
                    ) as HTMLElement;
                    if (!el) return;

                    rocketPos.x = Number((x / window.innerWidth).toFixed(2));

                    rocketPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${10 * rocketPos.x + 0}px, ${
                      10 * rocketPos.y + 0
                    }px) rotateZ(0deg)`;
                  };

                  const moveChart = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-chart"
                    ) as HTMLElement;
                    if (!el) return;

                    chartPos.x = Number((x / window.innerWidth).toFixed(2));

                    chartPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${30 * chartPos.x - 0}px, ${
                      30 * chartPos.y + 0
                    }px) rotateZ(0deg)`;
                  };

                  const moveMan = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-man"
                    ) as HTMLElement;
                    if (!el) return;

                    manPos.x = Number((x / window.innerWidth).toFixed(2));

                    manPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${-10 * manPos.x - 0}px, ${
                      -10 * manPos.y - 0
                    }px) rotateZ(0deg)`;
                  };

                  const mousemoveCallback = (e: any) => {
                    moveRocket(e.clientX, e.clientY);
                    moveChart(e.clientX, e.clientY);
                    moveMan(e.clientX, e.clientY);
                  };

                  document.addEventListener("mousemove", mousemoveCallback);

                  return () => {
                    document.removeEventListener(
                      "mousemove",
                      mousemoveCallback
                    );
                  };
                }}
              />
              <Challenge
                Title={() => "The Challenge"}
                Content={() => (
                  <>
                    <p className="py-5">
                      Wheel the world used to have a CI/CD pipeline based on
                      Google Cloud Build. This pipeline was slow, unreliable and
                      hard to maintain. It was also hard to reproduce locally,
                      which made it hard to debug. Furthermore, the results of
                      the testing were not connected to the deploy trigger,
                      which meant that a failed test would not stop the deploy
                      automatically. This led to a lot of manual work and a lot
                      of time wasted.
                    </p>

                    <p className="py-5">
                      To complicate things even more, wheel the world was not
                      using Docker at all. This meant that the environment in
                      which the code was tested was not the same as the one in
                      which it was deployed. This led to a lot of bugs that were
                      hard to reproduce and fix.
                    </p>

                    <p className="py-5">
                      The Google Cloud Build pipeline wasnt able to provide
                      parallelization, caching or more complex workflows,
                      limiting the capacity to improve the overall CI/CD
                      process.
                    </p>
                  </>
                )}
              />
              <Product
                Title={() => "The Product"}
                Content={() => (
                  <>
                    <p className="py-5">
                      The first thing I did was to dockerize all the services
                      and the tests of the most important applications. This
                      allowed the team to have a consistent environment for
                      testing and development, regardless of the operating
                      system or local library versions. Next was to deprecate
                      the old pipeline based on Google Cloud Build and replace
                      it with a new one based on Github Actions. This allowed us
                      to have a more flexible and powerful pipeline, with
                      parallelization, caching and more complex workflows.
                    </p>

                    <p className="py-5">
                      Implementing the branch and merge workflow proposed by the
                      CTO, I was able to reduce the time to deploy significantly
                      and do interesting things like automatically deploy the
                      master branch to production when all the tests pass. On a
                      second iteration, by reducing the size of the docker
                      images using multistage builds and dividing the tests in
                      different jobs, I was able to reduce the time to deploy
                      even more.
                    </p>
                  </>
                )}
              />
              <Results
                Title={() => "The Results"}
                Content={() => (
                  <>
                    <p className="py-5">
                      The new pipeline is faster, more reliable and easier to
                      maintain. Taking only the website as an example, the total
                      weight of the docker image went from 1.5GB to 200MB, the
                      time to deploy went from 40 minutes to 10 minutes and the
                      time to run the tests went from 20 minutes to 5 minutes.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div className="w-full md:w-1/2 p-16 m-8 rounded-3xl bg-white">
                        <Bar
                          options={{
                            scales: {
                              y: {
                                beginAtZero: true,
                              },
                            },
                          }}
                          data={{
                            labels: [
                              "original pipeline",
                              "first iteration",
                              "second iteration",
                            ],
                            datasets: [
                              {
                                label: "Python",
                                data: [1500, 400, 200],
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

                      <div className="w-full md:w-1/2 p-16 m-8 rounded-3xl bg-white">
                        <Bar
                          options={{
                            scales: {
                              y: {
                                beginAtZero: true,
                              },
                            },
                          }}
                          data={{
                            labels: [
                              "original pipeline",
                              "first iteration",
                              "second iteration",
                            ],
                            datasets: [
                              {
                                label: "Python",
                                data: [40, 20, 10],
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

                    <p className="py-5">
                      By reducing the aount of time it takes to deploy and the
                      weight of the images, we were reducing the maintenance
                      cost of the pipeline, which was a big win for the company.
                      For example, for the website frontend, estimating a cost
                      of 0.008 USD per minute of deployment, and 5 pipeline runs
                      per day (which is a conservative estimation), we were able
                      to reduce the cost of the pipeline from 32 USD per month
                      to 8 USD per month (75% reduction), just for one
                      application.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div className="flex flex-col w-70 md:w-80 p-8 m-8 rounded-3xl bg-white">
                        <div className="font-display font-black text-12xl leading-none text-center">
                          ~75%
                        </div>

                        <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                          reduction in costs
                        </div>

                        <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                          for github actions
                        </div>
                      </div>

                      <div className="flex flex-col w-70 md:w-80 p-8 m-8 rounded-3xl bg-white">
                        <div className="font-display font-black text-12xl leading-none text-center">
                          ~86%
                        </div>

                        <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                          reduction in
                        </div>

                        <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                          image size
                        </div>
                      </div>
                    </div>
                  </>
                )}
                links={[]}
              />
            </div>
          </Controller>
          <Contact dark />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default WheelTheWorldPage;
