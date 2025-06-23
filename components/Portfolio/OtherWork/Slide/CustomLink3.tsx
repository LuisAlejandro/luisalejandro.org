import cn from "classnames";
import React from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  accent?: boolean;
}

export const CustomLink3 = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, className, accent, ...props }, ref) => {
    const marginTop = accent ? "mt-10" : "mt-0";
    const background = accent
      ? "bg-white/70 hover:bg-white"
      : "bg-white/30 hover:bg-white/60";

    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "font-main font-thin text-2xl text-black mb-3 p-2",
          marginTop,
          "w-full flex cursor-pointer transition-all duration-300 ease-in-out justify-end items-center relative left-0 hover:left-1.5",
          background,
          className
        ),
      },
      children
    );
  }
);

CustomLink3.displayName = "CustomLink3";
