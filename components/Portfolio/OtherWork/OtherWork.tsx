import { useState } from "react";

import { GalleryList } from "@constants/constants";

import { Section } from "@components/common/Layout/Section";
import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

import { pageAnimation } from "./Animations";
import Gallery from "./Gallery";
import { GalleryWrapper } from "./Gallery/GalleryWrapper";
import { SlideshowWrapper } from "./Gallery/SlideshowWrapper";
import Slide from "./Slide";

const OtherWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Section id="gallery">
      <SectionTitle main>Other work</SectionTitle>
      <SectionText>
        This is a gallery showing other important work I&apos;ve done along the
        years.
      </SectionText>
      {isModalOpen ? (
        <SlideshowWrapper
          exit="exit"
          variants={pageAnimation}
          initial="hide"
          animate="show"
          aria-live="polite"
        >
          <Slide
            {...{
              currentIndex,
              setModalOpen,
              galleryList: GalleryList,
            }}
          />
        </SlideshowWrapper>
      ) : (
        <GalleryWrapper
          exit="exit"
          variants={pageAnimation}
          initial="hide"
          animate="show"
        >
          <Gallery
            {...{
              setCurrentIndex,
              setModalOpen,
              galleryList: GalleryList,
            }}
          />
        </GalleryWrapper>
      )}
    </Section>
  );
};

export default OtherWork;
