import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { IconProps } from "./Icon.types";

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      children,
      size = "md",
      label,
      className,
      role,
      "aria-hidden": ariaHidden,
      ...props
    },
    ref,
  ) => {
    const decorative = label === undefined;

    return (
      <span
        {...props}
        ref={ref}
        role={role ?? (decorative ? undefined : "img")}
        aria-label={label}
        aria-hidden={
          ariaHidden ?? (decorative ? true : undefined)
        }
        className={classNames(
          "aui-icon",
          `aui-icon--${size}`,
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

Icon.displayName = "Icon";
