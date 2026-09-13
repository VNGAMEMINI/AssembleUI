import { forwardRef } from "react";

import type { BadgeProps } from "./Badge.types";

import { classNames } from "../../../core/utils";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "neutral",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        {...props}
        ref={ref}
        className={classNames(
          "aui-badge",
          `aui-badge--${variant}`,
          `aui-badge--${size}`,
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
