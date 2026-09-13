import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

import {
  classNames,
  generateId,
} from "../../../core/utils";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      error,
      id,
      className,
      disabled,
      required,
      "aria-describedby": externalDescribedBy,
      "aria-invalid": externalInvalid,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? generateId("aui-input");

    const descriptionId = description
      ? `${inputId}-description`
      : undefined;

    const errorId = error
      ? `${inputId}-error`
      : undefined;

    const generatedDescribedBy = [
      description && !error ? descriptionId : undefined,
      errorId,
    ]
      .filter(Boolean)
      .join(" ");

    const describedBy = [
      externalDescribedBy,
      generatedDescribedBy,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const invalid = Boolean(error);

    const ariaInvalid =
      error != null
        ? true
        : externalInvalid;

    return (
      <div className="aui-input-field">
        {label != null && (
          <label
            className="aui-input-field__label"
            htmlFor={inputId}
          >
            {label}
            {required && (
              <span aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <input
          {...props}
          ref={ref}
          id={inputId}
          className={classNames(
            "aui-input",
            invalid && "aui-input--invalid",
            className,
          )}
          disabled={disabled}
          required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
        />

        {description != null && !error && (
          <div
            className="aui-input-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-input-field__error"
            id={errorId}
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
