import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = "md",
      label = "Loading",
      className,
      role = "status",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        role={role}
        aria-label={label}
        className={classNames(
          "aui-spinner",
          `aui-spinner--${size}`,
          className,
        )}
      />
    );
  },
);

Spinner.displayName = "Spinner";
