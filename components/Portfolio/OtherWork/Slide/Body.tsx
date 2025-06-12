import cn from "classnames";
import React from "react";

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  year?: string;
}

export const Body = React.forwardRef<HTMLDivElement, BodyProps>(
  ({ children, className, year, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "relative w-full p-0",
          "lg:pb-16.75 lg:pl-28.75 lg:w-1/2",
          className
        ),
        // Handle the year pseudo-element using a data attribute
        "data-year": year,
      },
      // Create a pseudo-element replacement for the year display
      year &&
        React.createElement(
          "div",
          {
            className: cn(
              "absolute font-bold text-white/30 right-4 z-1 leading-none text-custom-12rem tracking-neg-0_5rem -top-20",
              "lg:text-custom-22rem lg:-top-40 lg:tracking-neg-1_8rem",
              "sm:text-custom-15rem sm:tracking-neg-1rem sm:-top-32",
              "md:text-custom-12_5rem md:right-auto md:left-0 md:-top-24",
              className
            ),
            style: { pointerEvents: "none" },
          },
          year
        ),
      children
    );
  }
);

Body.displayName = "Body";
