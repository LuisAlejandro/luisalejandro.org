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
    const displayClasses = grid ? "flex lg:grid" : "flex";
    const flexDirection = row ? "flex-col lg:flex-row" : "flex-col";

    const padding = nopadding
      ? "lg:p-0 px-8 pt-6 pb-0"
      : accent1 || accent2
        ? "lg:px-[calc((100%-1040px)/2)] lg:py-8 px-8 pt-6 pb-0"
        : "lg:px-12 lg:pt-8 lg:pb-0 px-8 pt-6 pb-0";

    const margin = nomargin ? "m-0" : "m-auto";

    const background = accent1
      ? "bg-custom-gold"
      : accent2
        ? "bg-custom-orange"
        : color
          ? `bg-[${color}]`
          : "bg-transparent";

    const maxWidth = wide
      ? "lg:max-w-[80%] max-w-[calc(100%-64px)]"
      : fullwidth
        ? "lg:max-w-full max-w-[calc(100%-64px)]"
        : "lg:max-w-260 max-w-[calc(100%-64px)]";

    const overflow = overflowVisible ? "overflow-visible" : "overflow-hidden";

    const gridCols = oneColumn ? "grid-cols-1" : "grid-cols-2";

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
