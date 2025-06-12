import cn from "classnames";
import React from "react";

interface BoxNumProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const BoxNum = React.forwardRef<HTMLHeadingElement, BoxNumProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "h5",
      {
        ...props,
        ref,
        className: cn(
          "normal font-semibold tracking-0_01em text-2xl leading-6_5 text-gray-800",
          "lg:mb-2 lg:text-4xl lg:leading-10",
          "md:text-2_5xl md:leading-8",
          className
        ),
      },
      children
    );
  }
);

BoxNum.displayName = "BoxNum";
