import {
  forwardRef,
  useState,
} from "react";
import type {
  ForwardedRef,
  MouseEvent,
} from "react";

import { classNames } from "../../../core/utils";
import type { ToggleProps } from "./Toggle.types";

export const Toggle = forwardRef<
  HTMLButtonElement,
  ToggleProps
>(
  (
    {
      className,
      pressed,
      defaultPressed = false,
      onPressedChange,
      children,
      onClick,
      "aria-pressed": ariaPressed,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [internalPressed, setInternalPressed] =
      useState(defaultPressed);

    const isControlled = pressed !== undefined;
    const currentPressed = isControlled
      ? pressed
      : internalPressed;

    const handleClick = (
      event: MouseEvent<HTMLButtonElement>,
    ) => {
      const nextPressed = !currentPressed;

      if (!isControlled) {
        setInternalPressed(nextPressed);
      }

      onPressedChange?.(nextPressed);
      onClick?.(event);
    };

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        className={classNames(
          "aui-toggle",
          currentPressed && "aui-toggle--pressed",
          className,
        )}
        aria-pressed={
          ariaPressed ?? currentPressed
        }
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
