import cn from "classnames";
import React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "bg-white/20 text-gray-800 rounded-xl h-36 p-6",
          "lg:h-52.5",
          "md:h-33.75 md:p-4",
          "sm:h-27.5 sm:p-3 sm:[&:nth-child(2n)]:row-start-2",
          "max-[450px]:my-3",
          className
        ),
      },
      children
    );
  }
);

Box.displayName = "Box";
