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
          "flex items-center justify-center text-[2em] font-extralight h-[64px] leading-[20px] mb-20 pt-1 px-1.5 pb-2 text-[rgb(90,90,90)] bg-[rgb(171,183,183)] rounded-[15px] transition-colors duration-[400ms] ease-out hover:bg-[rgb(192,206,206)] active:pt-1 active:px-1.5 active:mt-1 active:mb-76px linkard-shadow linkard-gradient",
          className
        ),
      },
      children
    );
  }
);

ResumeLink.displayName = "ResumeLink";
