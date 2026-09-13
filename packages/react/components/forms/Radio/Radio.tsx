import { forwardRef } from "react";
import type { RadioProps } from "./Radio.types";

import {
  classNames,
  generateId,
} from "../../../core/utils";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    const radioId = id ?? generateId("aui-radio");

    const descriptionId = description
      ? `${radioId}-description`
      : undefined;

    const errorId = error
      ? `${radioId}-error`
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
      <div className="aui-radio-field">
        <div className="aui-radio-field__control">
          <input
            {...props}
            ref={ref}
            id={radioId}
            type="radio"
            className={classNames(
              "aui-radio",
              invalid && "aui-radio--invalid",
              className,
            )}
            disabled={disabled}
            required={required}
            aria-invalid={ariaInvalid}
            aria-describedby={describedBy}
          />

          {label != null && (
            <label
              className="aui-radio-field__label"
              htmlFor={radioId}
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
            className="aui-radio-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-radio-field__error"
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

Radio.displayName = "Radio";

export { Radio };
