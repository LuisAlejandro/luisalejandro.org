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
          "normal font-semibold tracking-[0.01em] text-2xl leading-[26px] text-gray-800",
          "lg:mb-[8px] lg:text-[36px] lg:leading-[40px]",
          "md:text-[28px] md:leading-8",
          className
        ),
      },
      children
    );
  }
);

BoxNum.displayName = "BoxNum";
