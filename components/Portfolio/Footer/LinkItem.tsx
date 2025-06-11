import cn from "classnames";
import React from "react";

interface LinkItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const LinkItem = React.forwardRef<HTMLAnchorElement, LinkItemProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "text-[15px] leading-[14px] flex items-center mb-2 text-white/60 transition-all duration-300 ease-in-out relative left-0 hover:text-white hover:left-1.5",
          "lg:text-[18px] lg:leading-[30px] lg:mb-[16px]",
          "md:text-[17px] md:leading-7 md:flex",
          className
        ),
      },
      children
    );
  }
);

LinkItem.displayName = "LinkItem";
