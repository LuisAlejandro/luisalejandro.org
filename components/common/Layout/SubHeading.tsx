import cn from "classnames";
import React from "react";

interface DivProps {
  children: React.ReactNode;
  className?: string;
}

export const SubHeading: React.FC<DivProps> = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "text-2xl font-normal leading-relaxed text-justify my-7.5 mx-auto w-full text-gray-1",
      "lg:font-light lg:w-175 lg:text-xl",
      className
    )}
  >
    {children}
  </div>
);
