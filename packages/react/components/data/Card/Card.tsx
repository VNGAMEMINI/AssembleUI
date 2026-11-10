import {
  forwardRef,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  CardProps,
} from "./Card.types";

export const Card = forwardRef<
  HTMLElement,
  CardProps
>(
  (
    {
      variant = "default",
      padding = "md",
      elevated = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <article
        {...props}
        ref={ref}
        className={classNames(
          "aui-card",
          `aui-card--${variant}`,
          `aui-card--padding-${padding}`,
          elevated &&
            "aui-card--elevated",
          className,
        )}
      />
    );
  },
);

Card.displayName = "Card";
