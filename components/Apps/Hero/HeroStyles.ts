import React from "react";

interface LeftSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LeftSection = React.forwardRef<HTMLDivElement, LeftSectionProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className:
          `max-w-5xl w-full mx-auto flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-col ${className || ""}`.trim(),
      },
      children
    );
  }
);

LeftSection.displayName = "LeftSection";

export const LeftSectionButton1 =
  "inline-block align-top my-1 mx-[1%] w-52 xs:w-full xs:mx-0 xs:my-1";

export const LeftSectionButtonLink = `
  flex items-center justify-center text-3xl font-extralight h-16 leading-5 
  mb-20 px-1 py-1 text-gray-600 
  bg-slate-400 hover:bg-slate-500 active:bg-slate-500
  rounded-2xl transition-colors duration-400 ease-out
  shadow-[inset_0_-6px_0_rgba(255,255,255,0.3),inset_0_-5px_0_rgba(0,0,0,0.3),inset_-1px_0_0_rgba(0,0,0,0.3),inset_1px_1px_0_rgba(0,0,0,0.3)]
  active:shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] active:pt-1 active:mb-[4.75rem]
  bg-gradient-radial from-white/40 to-transparent
`;
