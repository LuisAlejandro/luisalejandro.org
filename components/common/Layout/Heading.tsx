import cn from "classnames";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className = "",
}) => (
  <h1
    className={cn(
      "font-thin font-main text-justify mt-24 mb-12 mx-auto w-full text-6xl leading-[1.15] text-gray-1",
      "lg:w-2_5xl lg:text-[3.8rem]",
      className
    )}
  >
    {children}
  </h1>
);
