import React from "react";

interface HighlightTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <span className={`font-black font-title ${className}`} {...props}>
      {children}
    </span>
  );
};

export default HighlightText;
