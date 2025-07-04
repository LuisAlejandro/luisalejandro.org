import cn from "classnames";
import React from "react";

interface ResumeLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const ResumeLink = React.forwardRef<HTMLAnchorElement, ResumeLinkProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "flex items-center justify-center text-4xl font-light h-16 leading-5 mb-20 pt-1 px-1.5 pb-2 text-gray-3 bg-blue-gray rounded-2xl transition-colors duration-400 ease-out hover:bg-blue-gray-light active:pt-1 active:px-1.5 active:mt-1 active:mb-19 simple-3d-button-gradient",
          className
        ),
      },
      children
    );
  }
);

ResumeLink.displayName = "ResumeLink";
