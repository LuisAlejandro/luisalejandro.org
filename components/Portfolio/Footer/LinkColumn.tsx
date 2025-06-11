import cn from "classnames";
import React from "react";

interface LinkColumnProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const LinkColumn = React.forwardRef<HTMLLIElement, LinkColumnProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "li",
      {
        ...props,
        ref,
        className: cn("flex flex-col max-w-[220px] w-full", className),
      },
      children
    );
  }
);

LinkColumn.displayName = "LinkColumn";
