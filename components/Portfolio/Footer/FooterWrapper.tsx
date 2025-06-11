import cn from "classnames";
import React from "react";

interface FooterWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const FooterWrapper = React.forwardRef<HTMLElement, FooterWrapperProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "section",
      {
        ...props,
        ref,
        className: cn(
          "w-full max-w-[1040px] m-0 box-content bg-[#333]",
          "lg:px-[calc((100%-1040px)/2)] lg:pt-80 lg:pb-10",
          "md:px-0 md:pt-40 md:pb-10",
          "sm:px-0 sm:pt-40 sm:pb-10",
          "xs:px-0 xs:pt-40 xs:pb-10",
          className
        ),
      },
      children
    );
  }
);

FooterWrapper.displayName = "FooterWrapper";
