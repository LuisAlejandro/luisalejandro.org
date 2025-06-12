import cn from "classnames";
import React from "react";

interface ListParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListParagraph = React.forwardRef<HTMLDivElement, ListParagraphProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "font-light text-gray-800",
          "lg:text-lg lg:leading-7_5",
          "md:text-base md:leading-7",
          "sm:text-sm sm:leading-5_5",
          className
        ),
      },
      children
    );
  }
);

ListParagraph.displayName = "ListParagraph";

export default ListParagraph;
