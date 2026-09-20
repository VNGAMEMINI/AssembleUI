import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { ProgressProps } from "./Progress.types";

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "primary",
      className,
      role = "progressbar",
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const safeValue = Math.min(Math.max(value, 0), safeMax);
    const percentage = (safeValue / safeMax) * 100;

    return (
      <div
        {...props}
        ref={ref}
        role={role}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        className={classNames(
          "aui-progress",
          `aui-progress--${size}`,
          `aui-progress--${variant}`,
          className,
        )}
      >
        <div
          className="aui-progress__bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";
