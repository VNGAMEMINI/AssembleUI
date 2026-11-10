import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { StatusProps } from "./Status.types";

export const Status = forwardRef<HTMLSpanElement, StatusProps>(
  (
    {
      variant = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(
        "aui-status",
        `aui-status--${variant}`,
        className,
      )}
    >
      <span className="aui-status__indicator" aria-hidden="true" />
      <span className="aui-status__content">{children}</span>
    </span>
  ),
);

Status.displayName = "Status";
