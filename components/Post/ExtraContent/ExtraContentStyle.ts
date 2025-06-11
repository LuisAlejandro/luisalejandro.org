import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface Div1Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface Div2Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface Div3Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className:
          `max-w-5xl w-full mx-auto mb-8 grid grid-cols-3 grid-rows-1 gap-8 ${className || ""}`.trim(),
      },
      children
    );
  }
);

export const Div1 = React.forwardRef<HTMLDivElement, Div1Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className:
          `col-start-1 col-end-2 row-start-1 row-end-2 flex flex-row content-center ${className || ""}`.trim(),
      },
      children
    );
  }
);

export const Div2 = React.forwardRef<HTMLDivElement, Div2Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className:
          `col-start-2 col-end-3 row-start-1 row-end-2 flex justify-end ${className || ""}`.trim(),
      },
      children
    );
  }
);

export const Div3 = React.forwardRef<HTMLDivElement, Div3Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className:
          `col-start-3 col-end-4 row-start-1 row-end-2 flex justify-between items-center ${className || ""}`.trim(),
      },
      children
    );
  }
);

Container.displayName = "Container";
Div1.displayName = "Div1";
Div2.displayName = "Div2";
Div3.displayName = "Div3";
