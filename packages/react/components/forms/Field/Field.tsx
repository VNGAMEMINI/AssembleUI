import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { FieldProps } from "./Field.types";

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      description,
      error,
      htmlFor,
      required = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames("aui-field", className)}
      >
        {label !== undefined && (
          <label
            className="aui-field__label"
            htmlFor={htmlFor}
          >
            <span>{label}</span>

            {required && (
              <span
                className="aui-field__required"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <div className="aui-field__control">
          {children}
        </div>

        {description !== undefined && (
          <div className="aui-field__description">
            {description}
          </div>
        )}

        {error !== undefined && (
          <div
            className="aui-field__error"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";
