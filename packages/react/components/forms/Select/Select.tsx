import { forwardRef } from "react";

import type { SelectProps } from "./Select.types";

import {
  classNames,
  generateId,
} from "../../../core/utils";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
    const selectId = id ?? generateId("aui-select");

    const descriptionId = description
      ? `${selectId}-description`
      : undefined;

    const errorId = error
      ? `${selectId}-error`
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
      <div className="aui-select-field">
        {label != null && (
          <label
            className="aui-select-field__label"
            htmlFor={selectId}
          >
            {label}
            {required && (
              <span aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <select
          {...props}
          ref={ref}
          id={selectId}
          className={classNames(
            "aui-select",
            invalid && "aui-select--invalid",
            className,
          )}
          disabled={disabled}
          required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
        />

        {description != null && !error && (
          <div
            className="aui-select-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-select-field__error"
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

Select.displayName = "Select";

export { Select };
