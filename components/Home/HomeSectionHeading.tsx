import cn from "classnames";
import React from "react";

interface HomeSectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export function HomeSectionHeading({
  children,
  className = "",
  ...props
}: HomeSectionHeadingProps) {
  return (
    <h2
      {...props}
      className={cn(
        "font-title font-black text-4xl leading-tight tracking-tight mb-7 mx-auto w-full",
        "bg-gradient-to-br from-gray-900 to-gray-800/60 bg-clip-text text-transparent",
        "lg:text-5xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
