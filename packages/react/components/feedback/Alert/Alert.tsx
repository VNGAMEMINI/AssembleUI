import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { AlertProps } from "./Alert.types";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      heading,
      className,
      children,
      role = "alert",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        role={role}
        className={classNames(
          "aui-alert",
          `aui-alert--${variant}`,
          className,
        )}
      >
        {heading != null && (
          <div className="aui-alert__heading">
            {heading}
          </div>
        )}

        {children != null && (
          <div className="aui-alert__content">
            {children}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";
