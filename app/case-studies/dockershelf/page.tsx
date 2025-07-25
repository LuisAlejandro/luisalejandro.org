"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Controller, Scene } from "react-scrollmagic";

import DockershelfWhy from "@assets/images/dockershelf-why.svg";

import Challenge from "@components/CaseStudies/Challenge";
import HeroIntro from "@components/CaseStudies/HeroIntro";
import Product from "@components/CaseStudies/Product";
import Results from "@components/CaseStudies/Results";
import ScrollTween from "@components/CaseStudies/ScrollTween";
import Why from "@components/CaseStudies/Why";
import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

ChartJS.register(LinearScale, CategoryScale, BarElement);
ChartJS.defaults.font.family = "Roboto, sans-serif";
ChartJS.defaults.font.size = 16;

ChartJS.defaults.font.weight = 300;

const DockershelfPage = () => {
  return (
    <div className="w-full">
      <main>
        <div id="cases" className="bg-accent-7 text-gray-2">
          <Header variant="case-studies" />
          <Controller>
            <div className="cases-content w-full text-lg font-main">
              <HeroIntro
                Subtitle={() => "Dockershelf"}
                Title={() => "Reliable docker images"}
                Description={() => (
                  <>
                    Dockershelf is a repository that serves as a collector for
                    docker recipes that are universal, efficient and slim. We
                    keep adding &quot;shelves&quot;, which are holders for the
                    different versions of a popular language or application.
                    Images are updated, tested and published weekly via a Github
                    Actions workflow.
                  </>
                )}
                team={["Luis Martínez"]}
                deliverables={[
                  "Debian images",
                  "Python images",
                  "Node images",
                  "Latex images",
                ]}
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
                year={2016}
              />
              <Scene
                triggerElement="#why"
                duration="100%"
                triggerHook="1"
                offset={-100}
              >
                {(progress: any) => (
                  <ScrollTween
                    to={{
                      top: "-300px",
                      backgroundPositionY: "100%",
                    }}
                    from={{
                      top: "0px",
                      backgroundPositionY: "0%",
                    }}
                    ease="Expo.EaseIn"
                    totalProgress={progress}
                    paused
                    className="w-full page-hero bg-case-studies-dockershelf-hero relative"
                  >
                    <svg viewBox="0 0 1920 100">
                      <path fill="#333" d="M960,50l960-50H0L960,50z" />
                    </svg>

                    <div className="h-96" />

                    <svg viewBox="0 0 1920 100">
                      <path fill="#333" d="M1920,0v100H0V0l960,50L1920,0z" />
                    </svg>
                  </ScrollTween>
                )}
              </Scene>
              <Why
                Title={() => "The Problem"}
                Content={() => (
                  <>
                    <p className="py-5">
                      As <b className="font-black">software engineer</b>, I was
                      always looking for a way to{" "}
                      <b className="font-black">be more efficient</b> with my
                      time. One of the challenges that I faced was the need to
                      have a reliable and fast way to build and deploy my
                      applications. I started using{" "}
                      <b className="font-black">docker</b>, but at the time all
                      docker images were based on debian stable or ubuntu. The
                      first had legacy software, and the latter was too unstable
                      to be used in production. I needed at least a{" "}
                      <b className="font-black">debian testing or sid</b> image,
                      but there were none available. So I decided to build my
                      own.
                    </p>

                    <p className="py-5">
                      Soon, I started to unit test{" "}
                      <b className="font-black">python apps</b> and needed
                      docker images for different versions. I also needed to
                      build node apps, and latex documents. I started to build
                      my own images for all of them, and I realized that I could
                      share them with the community. That&apos;s how{" "}
                      <b className="font-black">Dockershelf</b> was born.
                    </p>
                  </>
                )}
                ImageComponent={(props: any) => <DockershelfWhy {...props} />}
                ImageUseEffect={() => {
                  const monitorPos = { x: 0, y: 0 };
                  const personPos = { x: 0, y: 0 };
                  const whalesPos = { x: 0, y: 0 };

                  const moveMonitor = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-monitor"
                    ) as HTMLElement;
                    if (!el) return;

                    monitorPos.x = Number((x / window.innerWidth).toFixed(2));

                    monitorPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${5 * monitorPos.x + 0}px, ${
                      5 * monitorPos.y + 0
                    }px) rotateZ(0deg)`;
                  };

                  const movePerson = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-person"
                    ) as HTMLElement;
                    if (!el) return;

                    personPos.x = Number((x / window.innerWidth).toFixed(2));

                    personPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${10 * personPos.x - 0}px, ${
                      10 * personPos.y + 0
                    }px) rotateZ(0deg)`;
                  };

                  const moveWhales = function (x: any, y: any) {
                    const el = document.querySelector(
                      "#why-whales"
                    ) as HTMLElement;
                    if (!el) return;

                    whalesPos.x = Number((x / window.innerWidth).toFixed(2));

                    whalesPos.y = Number((y / window.innerHeight).toFixed(2));

                    el.style.transform = `translate(${-10 * whalesPos.x - 0}px, ${
                      -10 * whalesPos.y - 0
                    }px) rotateZ(0deg)`;
                  };

                  const mousemoveCallback = (e: any) => {
                    moveMonitor(e.clientX, e.clientY);
                    movePerson(e.clientX, e.clientY);
                    moveWhales(e.clientX, e.clientY);
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
                      I wanted the project to be{" "}
                      <b className="font-black">sustainable</b> and completely{" "}
                      <b className="font-black">open source</b>. This meant that
                      I needed to use services that were free and publicly
                      accessible. Also, I wanted it to be completely
                      unmantained, or at least the mantainance to be as minimal
                      as possible. This meant that I needed to{" "}
                      <b className="font-black">automate everything</b>, from
                      the build process to the publishing of images.
                    </p>

                    <p className="py-5">
                      The automation presented a problem, because I could
                      inadvertently publish a broken image. I needed a way to{" "}
                      <b className="font-black">test the images</b> before
                      publishing them.
                    </p>

                    <p className="py-5">
                      I also wanted to use the debian packaging system to
                      install the needed software, because for example official
                      python and node images were built from source and that
                      made them{" "}
                      <b className="font-black">
                        prone to errors and inconsistencies
                      </b>
                      . This also meant that I needed to build the images from{" "}
                      <b className="font-black">scratch</b>, and not use any of
                      the existing images as a base.
                    </p>
                  </>
                )}
                bgImgClass="lg:bg-case-studies-dockershelf-challenge"
              />
              <Product
                Title={() => "The Product"}
                Content={() => (
                  <>
                    <p className="py-5">
                      I came up with a way to automate the build process using
                      Travis CI. I created templates for the pipeline
                      configuration, which would create the actual configuration
                      containing the list of images to build. I could control
                      the specific versions of python or node to build,
                      depending on its popularity and availability of the
                      software in the debian repositories. I experienced a
                      setback when Travis CI became a paid service, so I had to
                      migrate to Github Actions.
                    </p>

                    <p className="py-5">
                      I decided to focus on the images I was going to need for
                      my projects: Debian, Python and Node. I also added a Latex
                      one to write my CV. I needed them to be based on debian
                      sid for development purposes but I later added a Debian
                      stable version for production. Initially they were all
                      amd64 images but I later added arm64 for mac users.
                    </p>

                    <p className="py-5">
                      I created a test suite for the images, which would run on
                      every build. The test suite would check that the images
                      were built correctly and that the software was installed
                      and working. The builds are run weekly, and the images are
                      published to Dockerhub if the tests pass.
                    </p>
                  </>
                )}
                videoUrl="/images/case-studies/dockershelf-product.mov"
              />
              <Results
                Title={() => "The Results"}
                Content={() => (
                  <>
                    <p className="py-5">
                      My intention with dockershelf was to be a personal
                      project, but it turned out to be something more. Several
                      people started using the images and I started to receive
                      feedback and contributions. The project has also been
                      featured in the awesome-docker repository, and it has been
                      starred more than 60 times.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div className="flex flex-col w-50 lg:w-80 p-8 m-8 rounded-3xl bg-white">
                        <div className="font-display font-black text-7xl lg:text-9xl leading-none text-center">
                          220K
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-3 text-center">
                          downloads on
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-relaxed text-center">
                          debian images
                        </div>
                      </div>

                      <div className="flex flex-col w-50 lg:w-80 p-8 m-8 rounded-3xl bg-white">
                        <div className="font-display font-black text-7xl lg:text-9xl leading-none text-center">
                          294K
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-3 text-center">
                          downloads on
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-relaxed text-center">
                          python images
                        </div>
                      </div>

                      <div className="flex flex-col w-50 lg:w-80 p-8 m-8 rounded-3xl bg-white">
                        <div className="font-display font-black text-7xl lg:text-9xl leading-none text-center">
                          55K
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-3 text-center">
                          downloads on
                        </div>

                        <div className="font-main font-light tracking-tighter text-xl lg:text-3xl leading-relaxed text-center">
                          node images
                        </div>
                      </div>
                    </div>

                    <p className="py-5">
                      The difference in size between the official images and the
                      dockershelf ones are significant. The Python and Node
                      images are 4 times smaller, making them faster to download
                      and use. Although not as small as Alpine, they are still a
                      good alternative for those who need a Debian based image.
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
                            labels: ["dockerhub node", "dockershelf node"],
                            datasets: [
                              {
                                label: "Debian images (MB)",
                                data: [367.93, 82.43],
                                backgroundColor: [
                                  "rgba(255, 99, 132, 0.2)",
                                  // "rgba(255, 159, 64, 0.2)",
                                ],
                                borderColor: [
                                  "rgb(255, 99, 132)",
                                  // "rgb(255, 159, 64)",
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
                            labels: ["dockerhub python", "dockershelf python"],
                            datasets: [
                              {
                                label: "Python images (MB)",
                                data: [360.46, 100.09],
                                backgroundColor: [
                                  "rgba(255, 99, 132, 0.2)",
                                  // "rgba(255, 159, 64, 0.2)",
                                ],
                                borderColor: [
                                  "rgb(255, 99, 132)",
                                  // "rgb(255, 159, 64)",
                                ],
                                borderWidth: 1,
                              },
                            ],
                          }}
                        />
                      </div>
                    </div>

                    <p className="py-5">
                      The project is still active and I keep adding new images
                      and arquitectures when possible. You can checkout the
                      project on Github or contact me for more information.
                    </p>
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
          <Contact dark />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default DockershelfPage;
