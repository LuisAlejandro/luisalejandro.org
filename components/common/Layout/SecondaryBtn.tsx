import cn from "classnames";
import React from "react";

interface SecondaryBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SecondaryBtn = React.forwardRef<
  HTMLButtonElement,
  SecondaryBtnProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "button",
    {
      ...props,
      ref,
      className: cn(
        "text-white bg-transparent border border-white/33 box-border rounded-full px-6 py-4 font-semibold text-lg leading-4 w-fit mt-8 mb-20 cursor-pointer transition-all duration-400 ease-in-out focus:outline-none",
        "hover:text-gray-900 hover:bg-white hover:border-white",
        "active:bg-gray-200 active:border-gray-600 active:shadow-[inset_0px_2px_1px_rgba(46,49,55,0.15),inset_0px_0px_4px_rgba(20,20,55,0.3)]",
        "md:mt-6 md:mb-16 md:px-6 md:py-4 md:w-fit md:text-xl md:leading-5",
        "sm:mt-4 sm:mb-10 sm:px-4 sm:py-2 sm:w-full sm:text-sm sm:leading-4",
        className
      ),
    },
    children
  );
});

SecondaryBtn.displayName = "SecondaryBtn";
