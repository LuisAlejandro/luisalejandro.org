import cn from "classnames";
import React from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  accent?: boolean;
}

export const CustomLink2 = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, className, accent, ...props }, ref) => {
    const background = accent ? "bg-white/70" : "bg-white/30";

    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "font-main font-thin text-2xl text-black w-full cursor-pointer transition-all duration-300 ease-in-out flex",
          background,
          className
        ),
      },
      children
    );
  }
);

CustomLink2.displayName = "CustomLink2";
