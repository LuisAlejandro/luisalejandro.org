import cn from "classnames";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  grid?: boolean;
  row?: boolean;
  nopadding?: boolean;
  accent1?: boolean;
  accent2?: boolean;
  color?: string;
  wide?: boolean;
  overflowVisible?: boolean;
  oneColumn?: boolean;
  nomargin?: boolean;
  fullwidth?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      grid,
      row,
      nopadding,
      accent1,
      accent2,
      color,
      wide,
      overflowVisible,
      oneColumn,
      nomargin,
      fullwidth,
      ...props
    },
    ref
  ) => {
    const displayClasses = grid ? "grid" : "flex";
    const flexDirection = row ? "flex-row" : "flex-col";

    const padding = nopadding
      ? "p-0"
      : accent1 || accent2
        ? "px-[calc((100%-1040px)/2)] py-8"
        : "px-[48px] pt-[32px] pb-0";

    const margin = nomargin ? "m-0" : "m-auto";

    const background = accent1
      ? "bg-[#f8d983]"
      : accent2
        ? "bg-[#da8244]"
        : color
          ? `bg-[${color}]`
          : "bg-transparent";

    const maxWidth = wide
      ? "max-w-[80%]"
      : fullwidth
        ? "max-w-full"
        : "max-w-[1040px]";

    const overflow = overflowVisible ? "overflow-visible" : "overflow-hidden";

    const gridCols = oneColumn ? "grid-cols-1" : "grid-cols-2";

    // const responsiveClasses =
    //   "xs:flex xs:flex-col xs:max-w-[calc(100%-64px)] xs:px-8 xs:pt-6 sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-col";

    // xs:px-8 xs:pt-6 xs:pb-0 sm:px-8 sm:pt-6 sm:pb-0 md:px-8 md:pt-6 md:pb-0 lg:px-8 lg:pt-6 lg:pb-0
    // xs:max-w-[calc(100%-64px)] sm:max-w-[calc(100%-64px)] md:max-w-[calc(100%-64px)] lg:max-w-[calc(100%-64px)]

    return React.createElement(
      "section",
      {
        ...props,
        ref,
        className: cn(
          "w-full relative box-content",
          displayClasses,
          flexDirection,
          padding,
          background,
          maxWidth,
          overflow,
          gridCols,
          margin,
          className
        ),
      },
      children
    );
  }
);

Section.displayName = "Section";
