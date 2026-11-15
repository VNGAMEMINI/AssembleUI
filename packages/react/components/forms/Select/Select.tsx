import { forwardRef, useId } from "react";

import type { SelectProps } from "./Select.types";

import {
  classNames,
  createAccessibilityMetadataFromId,
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
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const {
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadataFromId({
      id: selectId,
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

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

        {description != null && error == null && (
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
