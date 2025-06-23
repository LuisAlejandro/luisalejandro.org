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
      "hidden justify-center items-center my-7.5 mx-auto w-full",
      "lg:w-175",
      "sm:flex",
      className
    )}
  >
    {children}
  </div>
);
