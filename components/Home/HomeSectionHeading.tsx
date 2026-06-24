import cn from "classnames";
import React from "react";

interface HomeSectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export function HomeSectionHeading({
  children,
  className = "",
  ...props
}: HomeSectionHeadingProps) {
  return (
    <h2
      {...props}
      className={cn(
        "font-main font-normal text-justify mt-10 mb-4 mx-auto w-full text-2xl leading-9 text-gray-1",
        "lg:font-light lg:w-175 lg:text-3xl lg:leading-10",
        className
      )}
    >
      {children}
    </h2>
  );
}
