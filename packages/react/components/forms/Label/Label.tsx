import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { LabelProps } from "./Label.types";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required = false, className, ...props }, ref) => {
    return (
      <label
        {...props}
        ref={ref}
        className={classNames("aui-label", className)}
      >
        {children}
        {required && (
          <span
            className="aui-label__required"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";
