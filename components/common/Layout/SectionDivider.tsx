import cn from "classnames";
import React from "react";

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  colorAlt?: boolean;
}

export const SectionDivider = React.forwardRef<
  HTMLDivElement,
  SectionDividerProps
>(({ className, divider, colorAlt, ...props }, ref) => {
  const gradient = colorAlt
    ? "bg-gradient-to-r from-orange-500 to-purple-600"
    : "bg-gradient-to-r from-cyan-400 to-purple-600";

  return React.createElement("div", {
    ...props,
    ref,
    className: cn(
      "w-16 h-1.5 rounded-lg bg-white",
      divider && "my-16",
      gradient,
      "md:w-12 md:h-1",
      "sm:w-8 sm:h-0.5",
      className
    ),
  });
});

SectionDivider.displayName = "SectionDivider";
