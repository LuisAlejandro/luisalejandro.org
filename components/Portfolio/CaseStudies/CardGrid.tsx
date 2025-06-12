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
          "flex flex-col py-8 pb-6 gap-x-4 gap-y-4 mb-40",
          "lg:grid lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] lg:pt-12 lg:pb-12 lg:place-items-center lg:gap-x-12 lg:gap-y-12",
          className
        ),
      },
      children
    );
  }
);

CardGrid.displayName = "CardGrid";
