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
      "inline-block align-top font-light font-main leading-[20px] uppercase h-[33px] px-[10px] pt-[3px] pb-[7px] mb-6 bg-[rgb(242,217,160)] text-[rgb(90,90,90)] transition-all duration-200 ease-in rounded-none hover:bg-[rgb(237,228,206)] hover:text-black active:mt-1 active:mb-5 active:py-[3px] active:px-[10px] active:bg-[rgb(237,228,206)] active:text-black max-[450px]:rounded-[5px] max-[450px]:block max-[450px]:w-full max-[450px]:text-center max-[450px]:my-0 max-[450px]:mb-1 max-[450px]:h-[63px] max-[450px]:active:mt-1 max-[450px]:active:mb-0 social-icons-custom",
      className
    )}
  >
    <Icon className="text-[20px] inline-block max-[450px]:text-[54px]" />
    {text && <SocialIconLabel>{text}</SocialIconLabel>}
  </a>
);
