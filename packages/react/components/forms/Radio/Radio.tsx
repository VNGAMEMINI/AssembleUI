import { forwardRef } from "react";
import type { RadioProps } from "./Radio.types";

import {
  classNames,
  createAccessibilityMetadata,
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
    const {
      id: radioId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-radio",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

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

        {description != null && error == null && (
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
