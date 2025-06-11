"use client";

import { useEffect, useRef, useState } from "react";

import { GalleryContainer } from "@components/common/Layout/GalleryContainer";

export default function Gallery() {
  const [imagesVisible, setImagesVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const frontList = [
    "/images/home/front-1.png",
    "/images/home/front-6.png",
    "/images/home/front-2.png",
    "/images/home/front-7.png",
    "/images/home/front-4.png",
    "/images/home/front-5.png",
  ];

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
    if (loadedImages.size === frontList.length) {
      setImagesVisible(true);
    }
  }, [loadedImages.size, frontList.length]);

  return (
    <GalleryContainer>
      <ul className="columns-[220px] gap-6 w-full list-none p-0 m-0">
        {frontList.map((imgUrl, index) => (
          <li
            key={index}
            className={`break-inside-avoid mb-5 transition-opacity duration-700 ease-in-out ${
              imagesVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              ref={handleImageRef(index)}
              src={imgUrl}
              alt=""
              onLoad={() => handleImageLoad(index)}
              className="w-full h-auto mb-5 block rounded-lg"
            />
          </li>
        ))}
      </ul>
    </GalleryContainer>
  );
}
