import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { DividerProps } from "./Divider.types";

export const Divider = forwardRef<HTMLElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          {...props}
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={classNames(
            "aui-divider",
            "aui-divider--vertical",
            className,
          )}
        />
      );
    }

    return (
      <hr
        {...props}
        ref={ref as React.Ref<HTMLHRElement>}
        className={classNames(
          "aui-divider",
          "aui-divider--horizontal",
          className,
        )}
      />
    );
  },
);

Divider.displayName = "Divider";
