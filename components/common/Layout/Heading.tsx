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
      "font-thin font-main text-justify mt-15 mb-7.5 mx-auto w-full text-6xl leading-11 text-gray-1",
      "lg:w-175 lg:text-2.375xl",
      className
    )}
  >
    {children}
  </h1>
);
