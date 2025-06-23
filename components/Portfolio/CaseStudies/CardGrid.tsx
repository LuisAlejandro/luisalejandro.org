import cn from "classnames";
import React from "react";

interface CardGridProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const CardGrid = React.forwardRef<HTMLElement, CardGridProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "section",
      {
        ...props,
        ref,
        className: cn(
          "flex flex-col py-8 gap-4 mb-40",
          "lg:grid lg:grid-cols-2 lg:py-12 lg:gap-12",
          className
        ),
      },
      children
    );
  }
);

CardGrid.displayName = "CardGrid";
