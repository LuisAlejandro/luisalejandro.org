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
      "font-main font-normal text-justify mt-15 mb-7.5 mx-auto w-full text-3xl leading-11 text-gray-1",
      "lg:font-light lg:w-175 lg:text-4xl",
      className
    )}
  >
    {children}
  </h1>
);
