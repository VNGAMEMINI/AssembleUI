import {
  forwardRef,
  type ButtonHTMLAttributes
} from "react";

import {
  classNames
} from "../../../core";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled = false,
    loading = false,
    size = "md",
    type = "button",
    variant = "primary",
    ...props
  },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={classNames(
        "aui-button",
        `aui-button--${variant}`,
        `aui-button--${size}`,
        loading && "aui-button--loading",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  );
});
