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
          "w-full max-w-260 m-0 box-content bg-accent-7",
          "px-0 pt-40 pb-10",
          "lg:px-[calc((100%-1040px)/2)] lg:pt-80 lg:pb-10",
          className
        ),
      },
      children
    );
  }
);

FooterWrapper.displayName = "FooterWrapper";
