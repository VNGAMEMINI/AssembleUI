import {
  forwardRef,
} from "react";

import type {
  SwitchProps,
} from "./Switch.types";

import {
  classNames,
  generateId,
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
    const switchId =
      id ?? generateId("aui-switch");

    const descriptionId = description
      ? `${switchId}-description`
      : undefined;

    const errorId = error
      ? `${switchId}-error`
      : undefined;

    const generatedDescribedBy = [
      description && !error
        ? descriptionId
        : undefined,
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

        {description != null && !error && (
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
