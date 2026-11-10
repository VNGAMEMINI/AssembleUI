import { forwardRef } from "react";

import type { ButtonProps } from "./Button.types";

import { classNames } from "../../../core/utils";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={classNames(
          "aui-button",
          `aui-button--${variant}`,
          `aui-button--${size}`,
          className,
        )}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
