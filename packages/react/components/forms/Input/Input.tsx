import { forwardRef, type InputHTMLAttributes } from "react";

import { classNames } from "../../../core";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    disabled = false,
    isDisabled = false,
    isInvalid = false,
    size = "md",
    type = "text",
    ...props
  },
  ref,
) {
  const finalDisabled = disabled || isDisabled;

  return (
    <input
      {...props}
      ref={ref}
      type={type}
      className={classNames(
        "aui-input",
        `aui-input--${size}`,
        isInvalid && "aui-input--invalid",
        className,
      )}
      disabled={finalDisabled}
      aria-invalid={isInvalid || undefined}
      aria-disabled={finalDisabled || undefined}
    />
  );
});
