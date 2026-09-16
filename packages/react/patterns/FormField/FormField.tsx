import { forwardRef } from "react";

import type { FormFieldProps } from "./FormField.types";

import { classNames } from "../../core/utils";

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps
>(
  (
    {
      label,
      description,
      error,
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
        className={classNames(
          "aui-form-field",
          error != null && "aui-form-field--invalid",
          className,
        )}
      >
        {label != null && (
          <div className="aui-form-field__label">
            {label}

            {required && (
              <span
                className="aui-form-field__required"
                aria-hidden="true"
              >
                {" *"}
              </span>
            )}
          </div>
        )}

        <div className="aui-form-field__control">
          {children}
        </div>

        {error != null ? (
          <div
            className="aui-form-field__error"
            role="alert"
          >
            {error}
          </div>
        ) : (
          description != null && (
            <div className="aui-form-field__description">
              {description}
            </div>
          )
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export { FormField };
