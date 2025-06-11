import cn from "classnames";
import React from "react";

interface SocialIconsProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  dark?: boolean;
}

export const SocialIcons = React.forwardRef<
  HTMLAnchorElement,
  SocialIconsProps
>(({ children, className, dark, ...props }, ref) => {
  const color = dark
    ? "text-[#aaaaaa] hover:bg-[#555555] hover:text-white"
    : "text-black/75 hover:bg-accent-2 hover:text-black";
  return React.createElement(
    "a",
    {
      ...props,
      ref,
      className: cn(
        "transition-all duration-300 ease-in-out rounded-full p-2 hover:scale-110 hover:cursor-pointer",
        color,
        className
      ),
    },
    children
  );
});

SocialIcons.displayName = "SocialIcons";
