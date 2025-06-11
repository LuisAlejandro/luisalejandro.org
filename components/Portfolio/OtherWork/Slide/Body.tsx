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
          "pb-[4.1875rem] pl-[7.1875rem] relative w-1/2",
          "xs:w-full xs:p-0",
          "sm:w-full sm:p-0",
          "md:w-full md:p-0",
          "lg:w-full lg:p-0",
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
              "absolute font-bold text-white/30 text-[22rem] -top-40 right-4 z-[1] leading-none tracking-[-1.8rem]",
              "xs:text-[12rem] xs:tracking-[-0.5rem] xs:-top-20",
              "sm:text-[15rem] sm:tracking-[-1rem] sm:-top-32",
              "md:text-[12.5rem] md:right-auto md:left-0 md:-top-24",
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
