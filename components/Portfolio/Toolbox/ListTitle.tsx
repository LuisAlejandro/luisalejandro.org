import cn from "classnames";
import React from "react";

interface ListTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const ListTitle = React.forwardRef<HTMLHeadingElement, ListTitleProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "h4",
      {
        ...props,
        ref,
        className: cn(
          "font-extrabold tracking-wide text-gray-800",
          "lg:text-3xl lg:leading-8 lg:mb-2",
          "md:text-2xl md:leading-7",
          "sm:text-xl sm:leading-7 sm:mb-1",
          className
        ),
      },
      children
    );
  }
);

ListTitle.displayName = "ListTitle";

export default ListTitle;
