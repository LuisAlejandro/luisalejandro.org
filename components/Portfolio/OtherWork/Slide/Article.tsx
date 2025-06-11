import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface ArticleProps extends React.ComponentProps<typeof motion.article> {}

export const Article = React.forwardRef<HTMLElement, ArticleProps>(
  ({ children, className, ...props }, ref) => {
    const MotionArticle = motion.article;
    return React.createElement(
      MotionArticle,
      {
        ...props,
        ref,
        className: cn(
          "py-6 mx-auto max-w-full flex flex-row mr-6 items-start",
          className
        ),
      },
      children as any
    );
  }
);

Article.displayName = "Article";
