import {
  forwardRef,
  useId,
} from "react";
import { classNames } from "../../../core/utils";
import { createAccessibilityMetadata } from "../../../core/utils/accessibility";
import type { TimePickerProps } from "./TimePicker.types";

export const TimePicker = forwardRef<
  HTMLInputElement,
  TimePickerProps
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
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const metadata = createAccessibilityMetadata({
      id: inputId,
      idPrefix: "time-picker",
      description,
      error,
    });

    return (
      <div
        className={classNames(
          "aui-time-picker-field",
          error != null && "aui-time-picker-field--invalid",
          disabled === true && "aui-time-picker-field--disabled",
        )}
      >
        {label != null && (
          <label
            htmlFor={inputId}
            className="aui-time-picker-field__label"
          >
            {label}
            {required && (
              <span
                className="aui-time-picker-field__required"
                aria-hidden="true"
              >
                {" "}
                *
              </span>
            )}
          </label>
        )}

        <input
          {...props}
          ref={ref}
          id={metadata.id}
          type="time"
          disabled={disabled}
          required={required}
          aria-invalid={metadata.ariaInvalid}
          aria-describedby={metadata.describedBy}
          className={classNames(
            "aui-time-picker",
            className,
          )}
        />

        {description != null && !error && (
          <div
            id={metadata.descriptionId}
            className="aui-time-picker-field__description"
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            id={metadata.errorId}
            className="aui-time-picker-field__error"
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";
