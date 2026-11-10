import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { SkeletonProps } from "./Skeleton.types";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      className,
      style,
      "aria-hidden": ariaHidden = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        aria-hidden={ariaHidden}
        className={classNames(
          "aui-skeleton",
          `aui-skeleton--${variant}`,
          className,
        )}
        style={{
          ...style,
          ...(width !== undefined ? { width } : {}),
          ...(height !== undefined ? { height } : {}),
        }}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
