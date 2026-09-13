import { forwardRef } from "react";

import type { TextareaProps } from "./Textarea.types";

import {
  classNames,
  generateId,
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
    const textareaId =
      id ?? generateId("aui-textarea");

    const descriptionId = description
      ? `${textareaId}-description`
      : undefined;

    const errorId = error
      ? `${textareaId}-error`
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

        {description != null && !error && (
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
