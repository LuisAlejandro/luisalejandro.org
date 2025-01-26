
import { useState } from "react";
import Masonry from "react-masonry-component";

import { GalleryList } from "@constants/constants";
import { Section, SectionTitle, SectionText } from "@styles/GlobalComponents";
import { cardAnimation, captionAnimation, pageAnimation } from "./Animations";
import {
  GalleryWrapper,
  SlideshowWrapper,
  Caption,
  Figure,
  GalleryCardItem,
} from "./GalleryStyles";
import Slide from "./Slide";

const Gallery = () => {
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
              setCurrentIndex,
              isModalOpen,
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
          <Masonry
            className={"gallery-grid"}
            elementType={"ul"}
            options={{
              transitionDuration: 0.8,
            }}
          >
            {GalleryList.map((work, index) => (
              <GalleryCardItem
                className="gallery-card"
                variants={cardAnimation}
                key={index}
              >
                
                <div
                  onClick={() => {
                    setCurrentIndex(index);
                    setModalOpen(true);
                  }}
                >
                  <Figure>
                    
                    <img src={work.images.thumbnail} alt="" />
                    <Caption variants={captionAnimation}>
                      
                      <h2>{work.year}</h2>
                      
                      <h3>{work.name}</h3>
                      
                      <p>{work.shortDescription}</p>
                    </Caption>
                  </Figure>
                
                </div>
              </GalleryCardItem>
            ))}
          </Masonry>
        </GalleryWrapper>
      )}
    </Section>
  );
};

export default Gallery;
