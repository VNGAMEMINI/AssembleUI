import { forwardRef } from "react";

import type { TextareaProps } from "./Textarea.types";

import {
  classNames,
  createAccessibilityMetadata,
} from "../../../core/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
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
      id: textareaId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-textarea",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const invalid = error != null;

    return (
      <div className="aui-textarea-field">
        {label != null && (
          <label
            className="aui-textarea-field__label"
            htmlFor={textareaId}
          >
            {label}
            {required && (
              <span aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <textarea
          {...props}
          ref={ref}
          id={textareaId}
          className={classNames(
            "aui-textarea",
            invalid && "aui-textarea--invalid",
            className,
          )}
          disabled={disabled}
          required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
        />

        {description != null && error == null && (
          <div
            className="aui-textarea-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-textarea-field__error"
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

Textarea.displayName = "Textarea";

export { Textarea };
