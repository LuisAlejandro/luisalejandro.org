import cn from "classnames";
import React from "react";

import SocialIconLabel from "../SocialIconLabel";

interface SocialIconsProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ComponentType<{ className?: string }>;
  text?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  icon: Icon,
  text,
  className = "",
  ...props
}) => (
  <a
    {...props}
    className={cn(
      "w-full rounded-md block text-center align-top font-light font-main leading-5 uppercase px-2.5 pt-1 pb-2 my-0 mb-1 h-15.75 bg-custom-beige text-gray-3 transition-all duration-200 ease-in simple-3d-button",

      // hover
      "hover:bg-custom-beige-light hover:text-black",

      // active
      "active:mt-1 active:mb-0 active:py-1 active:px-2.5 active:bg-custom-beige-light active:text-black",

      // breakpoints
      "lg:w-fit lg:rounded-none lg:inline-block lg:mb-6 lg:h-8.25 lg:active:mb-5",
      className
    )}
  >
    <Icon className={cn("lg:text-2xl align-top inline-block text-5xl")} />
    {text && <SocialIconLabel>{text}</SocialIconLabel>}
  </a>
);
