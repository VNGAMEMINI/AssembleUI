import {
  forwardRef,
} from "react";

import type {
  SwitchProps,
} from "./Switch.types";

import {
  classNames,
  createAccessibilityMetadata,
} from "../../../core/utils";

const Switch = forwardRef<
  HTMLInputElement,
  SwitchProps
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
      id: switchId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-switch",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

    return (
      <div className="aui-switch-field">
        <label
          className="aui-switch-field__label"
          htmlFor={switchId}
        >
          <input
            {...props}
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            className={classNames(
              "aui-switch",
              invalid && "aui-switch--invalid",
              className,
            )}
            disabled={disabled}
            required={required}
            aria-invalid={ariaInvalid}
            aria-describedby={describedBy}
          />

          {label != null && (
            <span className="aui-switch-field__text">
              {label}
              {required && (
                <span aria-hidden="true"> *</span>
              )}
            </span>
          )}
        </label>

        {description != null && error == null && (
          <div
            className="aui-switch-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-switch-field__error"
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

Switch.displayName = "Switch";

export { Switch };
