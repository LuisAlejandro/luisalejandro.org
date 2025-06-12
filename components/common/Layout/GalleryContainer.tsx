import cn from "classnames";
import React from "react";

interface DivProps {
  children: React.ReactNode;
  className?: string;
}

export const GalleryContainer: React.FC<DivProps> = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "flex justify-center items-center my-12 mx-auto w-full",
      "lg:w-2_5xl",
      className
    )}
  >
    {children}
  </div>
);
