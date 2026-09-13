import { forwardRef } from "react";
import type { CheckboxProps } from "./Checkbox.types";

import {
  classNames,
  generateId,
} from "../../../core/utils";

const Checkbox = forwardRef<
  HTMLInputElement,
  CheckboxProps
>(
  (
    {
      label,
      description,
      error,
      id,
      className,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const checkboxId =
      id ?? generateId("aui-checkbox");

    const descriptionId = description
      ? `${checkboxId}-description`
      : undefined;

    const errorId = error
      ? `${checkboxId}-error`
      : undefined;

    const describedBy =
      [
        description && !error
          ? descriptionId
          : undefined,
        errorId,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const invalid = Boolean(error);

    return (
      <div className="aui-checkbox-field">
        <div className="aui-checkbox-field__control">
          <input
            {...props}
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={classNames(
              "aui-checkbox",
              invalid && "aui-checkbox--invalid",
              className,
            )}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
          />

          {label != null && (
            <label
              className="aui-checkbox-field__label"
              htmlFor={checkboxId}
            >
              {label}
              {required && (
                <span aria-hidden="true"> *</span>
              )}
            </label>
          )}
        </div>

        {description != null && !error && (
          <div
            className="aui-checkbox-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-checkbox-field__error"
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
