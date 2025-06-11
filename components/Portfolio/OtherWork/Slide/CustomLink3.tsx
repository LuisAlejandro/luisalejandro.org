import cn from "classnames";
import React from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  accent?: boolean;
}

export const CustomLink3 = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, className, accent, ...props }, ref) => {
    const marginTop = accent ? "mt-16" : "mt-0";
    const background = accent
      ? "bg-white/70 hover:bg-white"
      : "bg-white/30 hover:bg-white/60";

    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "font-main font-thin text-4xl text-black mb-5",
          marginTop,
          "w-full p-4 flex cursor-pointer transition-all duration-300 ease-in-out justify-end relative left-0 hover:left-1.5",
          background,
          className
        ),
      },
      children
    );
  }
);

CustomLink3.displayName = "CustomLink3";
