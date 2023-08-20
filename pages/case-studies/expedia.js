import { Controller, Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";

import ExpediaWhy from "@assets/images/expedia-why.svg";
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

const Expedia = () => {
  return (
    <Layout>
      <CaseStudiesDetailsStyles />
      <div id="cases" style={{ background: "#333" }}>
        <Header bg="#303030" />
        <Controller>
          <div className="cases-content">
            <HeroIntro
              Subtitle={() => "Expedia API integration"}
              Title={() => "A larger hotel database to book from"}
              Description={() => (
                <>
                  On 2022, Wheel the World pursued a commercial agreement with
                  Expedia to integrate their hotel database booking and shopping
                  features. I was in charge of developing several components to
                  make this integration possible.
                </>
              )}
              team={["Luis Martínez"]}
              deliverables={[
                "An expedia content indexer",
                "A booking module",
                "A shopping module",
                "A matching algorithm",
              ]}
              links={[]}
              year={2022}
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
                        "url(/images/case-studies/expedia-hero.png)",
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
                    Wheel the World needed to increase their sales significantly
                    if they wanted to keep growing. They had a great product,
                    but they needed to reach more people. One of the main
                    problems was that they had a very limited hotel database,
                    which made it difficult for users to find a hotel that
                    suited their needs. They had an integration with Hotelbeds,
                    but the available inventory was very limited.
                  </p>
                  <p className="py-5">
                    The majority of hotels in the wheel The World inventory were
                    bookable through a request to quote system, but this meant
                    that users had to wait for a response from the Wheel the
                    World team, which was not scalable. Also, pricing was not
                    transparent or instant, which made it difficult for users to
                    make a decision.
                  </p>
                </>
              )}
              ImageComponent={(props) => <ExpediaWhy {...props} />}
              ImageUseEffect={() => {
                const whiteboardPos = { x: 0, y: 0 };
                const manPos = { x: 0, y: 0 };
                const tablePos = { x: 0, y: 0 };

                const moveWhiteboard = function (x, y) {
                  const el = document.querySelector("#why-whiteboard");
                  if (!el) return;
                  whiteboardPos.x = (x / window.innerWidth).toFixed(2);
                  whiteboardPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${
                    10 * whiteboardPos.x + 0
                  }px, ${10 * whiteboardPos.y + 0}px) rotateZ(0deg)`;
                };

                const moveMan = function (x, y) {
                  const el = document.querySelector("#why-man");
                  if (!el) return;
                  manPos.x = (x / window.innerWidth).toFixed(2);
                  manPos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${30 * manPos.x - 0}px, ${
                    30 * manPos.y + 0
                  }px) rotateZ(0deg)`;
                };

                const moveTable = function (x, y) {
                  const el = document.querySelector("#why-table");
                  if (!el) return;
                  tablePos.x = (x / window.innerWidth).toFixed(2);
                  tablePos.y = (y / window.innerHeight).toFixed(2);
                  el.style.transform = `translate(${-10 * tablePos.x - 0}px, ${
                    -10 * tablePos.y - 0
                  }px) rotateZ(0deg)`;
                };

                const mousemoveCallback = (e) => {
                  moveWhiteboard(e.clientX, e.clientY);
                  moveMan(e.clientX, e.clientY);
                  moveTable(e.clientX, e.clientY);
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
                    There was already a request to quote system and a
                    booking/pricing integration with Hotelbeds in place. One of
                    the challenges was to integrate the Expedia hotel database
                    with a new booking/pricing system, and to make it work with
                    the existing request to quote system. Rewriting or moving
                    components of the system design was not an option, so the
                    new system had to be compatible with the existing one.
                  </p>
                  <p className="py-5">
                    One of the components needed to index all of the Expedia
                    content database and make it searchable. This component had
                    to be able to index the content in a reasonable amount of
                    time, and it had to be able to update the index on a weekly
                    basis. What made this challenging was that there were more
                    tha 600k records in the database, with a total of 28GB of
                    data.
                  </p>
                  <p className="py-5">
                    The matching system was also a headeache. It had to be able
                    to match the Expedia content with the Wheel the World
                    content, but also allowing to match with Hotelbeds content.
                  </p>
                </>
              )}
              bgImgClass="lg:bg-case-studies-expedia-challenge"
            />
            <Product
              Title={() => "The Product"}
              Content={() => (
                <>
                  <p className="py-5">
                    The integration consisted first on a Golang application that
                    downloaded, parsed and saved the Expedia content database
                    (28GB of data) into a Postgres database and a Redis cache.
                    This application was able to download and parse the whole
                    database in less than 2 hours, and it was able to update the
                    database on a weekly basis in less than 2 minutes.
                  </p>
                  <p className="py-5">
                    The second part of the integration was a to add a Pricing
                    and a Shopping provider for Expedia in the website backend.
                    The backend was built with Express and TypeORM (Typescript),
                    and it was deployed on Google Clour Run. The pricing
                    provider was able to get the availability and price of a
                    hotel room for a given date, and the booking provider was
                    able to book a hotel room.
                  </p>
                  <p className="py-5">
                    The third part of the integration was to add a matching
                    algorithm that was able to match the Expedia content with
                    the Wheel the World content, but also allowing to match with
                    Hotelbeds content. This was a very complex algorithm that
                    had to take into account the location, the accessibility
                    features, the hotel amenities, the room amenities, the room
                    type, the room accessibility features and other factors. It
                    used the indexed data from the first part of the integration
                    to make the matching process faster.
                  </p>
                </>
              )}
              videoUrl="/images/case-studies/expedia-product.mov"
            />
            <Results
              Title={() => "The Results"}
              Content={() => (
                <>
                  <p className="py-5">
                    The integration was a success. Expedia quickly certified the
                    integration and allowed Wheel the World to increase their
                    hotel database from a couple of thousand hotels to more than
                    600k hotels. This allowed Wheel the World to increase their
                    sales by 39% on the first quarter of 2023.
                  </p>
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        600K
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        hotels to
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        choose from
                      </div>
                    </div>
                    <div className="flex flex-col w-[320px] p-8 m-8 rounded-3xl bg-white">
                      <div className="font-display font-black text-12xl leading-none text-center">
                        39%
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-3 text-center">
                        increase in
                      </div>
                      <div className="font-main font-extralight tracking-tighter text-6xl leading-relaxed text-center">
                        bookings
                      </div>
                    </div>
                  </div>
                </>
              )}
              links={[]}
            />
          </div>
        </Controller>
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
};

export default Expedia;
