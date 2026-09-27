import { forwardRef } from "react";

import { classNames } from "../../../core/utils";

import type { ContainerProps } from "./Container.types";

export const Container = forwardRef<
  HTMLDivElement,
  ContainerProps
>(
  (
    {
      size = "lg",
      className,
      ...props
    },
    ref,
  ) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-container",
        `aui-container--${size}`,
        className,
      )}
    />
  ),
);

Container.displayName = "Container";
