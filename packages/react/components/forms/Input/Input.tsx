import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

import {
  classNames,
  createAccessibilityMetadata,
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
    const {
      id: inputId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-input",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

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

        {description != null && error == null && (
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
