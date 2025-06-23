import { useEffect, useRef, useState } from "react";

import { captionAnimation, cardAnimation } from "./Animations";
import { Caption } from "./Gallery/Caption";
import { Figure } from "./Gallery/Figure";
import { GalleryCardItem } from "./Gallery/GalleryCardItem";

const Gallery = ({ setCurrentIndex, setModalOpen, galleryList }: any) => {
  const [imagesVisible, setImagesVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const handleImageRef = (index: number) => (ref: HTMLImageElement | null) => {
    imageRefs.current[index] = ref;
  };

  // Check for already loaded images after render
  useEffect(() => {
    imageRefs.current.forEach((ref, index) => {
      if (ref && ref.complete && ref.naturalHeight !== 0) {
        // Use setTimeout to defer the state update to avoid render loop
        setTimeout(() => {
          handleImageLoad(index);
        }, 0);
      }
    });
  }, []); // Run only once after initial render

  useEffect(() => {
    if (loadedImages.size === galleryList.length) {
      setImagesVisible(true);
    }
  }, [loadedImages.size, galleryList.length]);

  return (
    <>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-2 w-full list-none p-0 m-0">
        {galleryList.map((work: any, index: any) => (
          <GalleryCardItem
            variants={cardAnimation}
            key={index}
            className={`break-inside-avoid transition-opacity duration-700 ease-in-out ${
              imagesVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              onClick={() => {
                setCurrentIndex(index);
                setModalOpen(true);
              }}
            >
              <Figure>
                <img
                  ref={handleImageRef(index)}
                  src={work.images.thumbnail}
                  alt=""
                  onLoad={() => handleImageLoad(index)}
                  className="w-full rounded-lg"
                />
                <Caption variants={captionAnimation}>
                  <h2 className="text-6xl font-bold leading-none block font-title">
                    {work.year}
                  </h2>
                  <h3 className="text-xl mb-2 whitespace-pre-line font-bold font-title">
                    {work.name}
                  </h3>
                  <p className="text-base font-thin text-white/75 block">
                    {work.shortDescription}
                  </p>
                </Caption>
              </Figure>
            </div>
          </GalleryCardItem>
        ))}
      </ul>
    </>
  );
};

export default Gallery;
