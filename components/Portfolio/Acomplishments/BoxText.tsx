import cn from "classnames";
import React from "react";

interface BoxTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const BoxText = React.forwardRef<HTMLParagraphElement, BoxTextProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "p",
      {
        ...props,
        ref,
        className: cn(
          "font-normal text-sm tracking-0_02em text-gray-800/75 leading-3.5",
          "lg:text-lg lg:leading-6",
          "md:text-base md:leading-5",
          className
        ),
      },
      children
    );
  }
);

BoxText.displayName = "BoxText";
