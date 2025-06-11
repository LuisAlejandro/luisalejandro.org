import cn from "classnames";
import React from "react";

interface CardInfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardInfo = React.forwardRef<HTMLParagraphElement, CardInfoProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "p",
      {
        ...props,
        ref,
        className: cn(
          "w-full text-gray-800 text-[16px] leading-[24px] text-center mt-[2rem] px-1",
          "lg:px-[50px]",
          className
        ),
      },
      children
    );
  }
);

CardInfo.displayName = "CardInfo";
