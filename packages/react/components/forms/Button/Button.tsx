import { forwardRef } from "react";

import type { ButtonProps } from "./Button.types";

import { classNames } from "../../../core/utils";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
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
