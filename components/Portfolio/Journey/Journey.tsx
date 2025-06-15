import { TimeLineData } from "@constants/constants";

import Clients from "@assets/images/clients.svg";

import { Section } from "@components/common/Layout/Section";
import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

import TimelineChart from "./TimelineChart";

const Timeline = () => {
  return (
    <>
      <svg viewBox="0 0 1920 100">
        <path
          fill="#f8d983"
          fillOpacity="0.5"
          d="M0,100l960-50l960,50V0L960,50L0,0V100z"
        />
        <path fill="#f8d983" d="M0,100h1920L960,50L0,100z" />
      </svg>
      <Section id="about" className="pt-25" accent1 smallpadding>
        <Clients
          className="container-clients"
          style={{
            height: "250px",
            width: "250px",
            position: "absolute",
            top: "0px",
            right: "calc(((100% - 1040px) / 2) - 20px)",
            opacity: "0.5",
            transform: "rotateZ(30deg)",
          }}
        />
        <SectionTitle>My Journey</SectionTitle>
        <SectionText>
          I&apos;ve worked with very interesting people along the years. Every
          client had its particular set of challenges and requirements which
          made me bring the best of me to the table.
        </SectionText>
        <TimelineChart data={TimeLineData} />
      </Section>
    </>
  );
};

export default Timeline;
