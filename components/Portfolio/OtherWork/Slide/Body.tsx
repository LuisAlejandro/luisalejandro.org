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
          "lg:pb-16 lg:pl-16 lg:w-1/2",
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
              "absolute font-bold font-title text-white/30 right-0 z-1 leading-none ",
              "text-9xl tracking-tighter -top-20",
              "lg:text-14xl lg:tracking-tighter lg:-top-40",
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
