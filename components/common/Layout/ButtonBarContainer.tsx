import cn from "classnames";
import React from "react";

interface DivProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonBarContainer: React.FC<DivProps> = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "flex flex-col gap-4 justify-center items-center mx-auto",
      "lg:flex-row lg:gap-0",
      className
    )}
  >
    {children}
  </div>
);
