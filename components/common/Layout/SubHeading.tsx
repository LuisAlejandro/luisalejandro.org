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
      "text-3xl font-thin leading-relaxed text-justify my-12 mx-auto w-full text-gray-1",
      "lg:w-2_5xl lg:text-[2rem]",
      className
    )}
  >
    {children}
  </div>
);
