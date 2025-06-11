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
      "flex justify-center items-center my-12 mx-auto flex-col gap-4",
      "xs:flex-row xs:gap-0",
      className
    )}
  >
    {children}
  </div>
);
