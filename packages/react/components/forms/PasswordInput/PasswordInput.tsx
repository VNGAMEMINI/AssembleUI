import { forwardRef, useState } from "react";
import { classNames } from "../../../core/utils";
import type { PasswordInputProps } from "./PasswordInput.types";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      defaultVisible = false,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(defaultVisible);

    return (
      <div className="aui-password-input">
        <input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          className={classNames(
            "aui-password-input__input",
            className,
          )}
        />

        <button
          type="button"
          className="aui-password-input__toggle"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
