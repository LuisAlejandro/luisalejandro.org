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
      "text-3xl font-thin leading-relaxed text-justify my-7.5 mx-auto w-full text-gray-1",
      "lg:w-700px lg:text-1.25xl",
      className
    )}
  >
    {children}
  </div>
);
