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
          "font-normal text-sm tracking-[0.02em] text-gray-800/75 leading-[14px]",
          "lg:text-[18px] lg:leading-[24px]",
          "md:text-base md:leading-5",
          className
        ),
      },
      children
    );
  }
);

BoxText.displayName = "BoxText";
