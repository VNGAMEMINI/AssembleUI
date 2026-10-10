import {
  forwardRef,
  useId,
} from "react";
import { classNames } from "../../../core/utils";
import { createAccessibilityMetadata } from "../../../core/utils/accessibility";
import type { DatePickerProps } from "./DatePicker.types";

export const DatePicker = forwardRef<
  HTMLInputElement,
  DatePickerProps
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
      idPrefix: "date-picker",
      description,
      error,
    });

    return (
      <div
        className={classNames(
          "aui-date-picker-field",
          error != null && "aui-date-picker-field--invalid",
          disabled === true && "aui-date-picker-field--disabled",
        )}
      >
        {label != null && (
          <label
            htmlFor={inputId}
            className="aui-date-picker-field__label"
          >
            {label}
            {required && (
              <span
                className="aui-date-picker-field__required"
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
          type="date"
          disabled={disabled}
          required={required}
          aria-invalid={metadata.ariaInvalid}
          aria-describedby={metadata.describedBy}
          className={classNames(
            "aui-date-picker",
            className,
          )}
        />

        {description != null && !error && (
          <div
            id={metadata.descriptionId}
            className="aui-date-picker-field__description"
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            id={metadata.errorId}
            className="aui-date-picker-field__error"
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
