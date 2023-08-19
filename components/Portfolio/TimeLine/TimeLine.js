import { Section, SectionText, SectionTitle } from "@styles/GlobalComponents";
import { TimeLineData } from "@constants/constants";
import Clients from "@assets/images/clients.svg";
import {
  CarouselContainer,
  CarouselItem,
  CarouselItemText,
  CarouselItemTitle,
} from "./TimeLineStyles";

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
      <Section id="about" accent1>
        <Clients className="container-clients" />
        <SectionTitle>My Journey</SectionTitle>
        <SectionText>
          I&apos;ve worked with very interesting people along the years. Every
          client had its particular set of challenges and requirements which
          made me bring the best of me to the table.
        </SectionText>
        <CarouselContainer>
          {TimeLineData.map((item, index) => (
            <CarouselItem key={index} id={`carousel__item-${index}`}>
              <CarouselItemTitle>{`${item.year}`}</CarouselItemTitle>
              <CarouselItemText>{item.text}</CarouselItemText>
            </CarouselItem>
          ))}
        </CarouselContainer>
      </Section>
    </>
  );
};

export default Timeline;
