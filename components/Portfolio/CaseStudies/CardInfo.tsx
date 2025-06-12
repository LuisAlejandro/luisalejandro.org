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
          "w-full text-gray-800 text-base leading-6 text-center mt-8 px-1",
          "lg:px-12.5",
          className
        ),
      },
      children
    );
  }
);

CardInfo.displayName = "CardInfo";
