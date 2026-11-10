import { forwardRef } from "react";
import type { CheckboxProps } from "./Checkbox.types";

import {
  classNames,
  createAccessibilityMetadata,
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
      "aria-describedby": externalDescribedBy,
      "aria-invalid": externalInvalid,
      ...props
    },
    ref,
  ) => {
    const {
      id: checkboxId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-checkbox",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

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
            aria-invalid={ariaInvalid}
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

        {description != null && error == null && (
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
