import cn from "classnames";
import Image from "next/image";
import React from "react";

interface ImgProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Img: React.FC<ImgProps> = ({
  className,
  src = "",
  alt = "",
  width = 400,
  height = 300,
  style,
}) => {
  return React.createElement(Image, {
    src,
    alt,
    width,
    height,
    className: cn("w-full h-full object-cover overflow-hidden", className),
    style,
  });
};

Img.displayName = "Img";
