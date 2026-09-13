import {
  forwardRef,
  type KeyboardEvent,
} from "react";

import type { ChipProps } from "./Chip.types";

import { classNames } from "../../../core/utils";

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      children,
      variant = "neutral",
      size = "md",
      removable = false,
      onRemove,
      className,
      ...props
    },
    ref,
  ) => {
    const handleRemoveKeyDown = (
      event: KeyboardEvent<HTMLButtonElement>,
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onRemove?.();
      }
    };

    return (
      <span
        {...props}
        ref={ref}
        className={classNames(
          "aui-chip",
          `aui-chip--${variant}`,
          `aui-chip--${size}`,
          className,
        )}
      >
        <span className="aui-chip__content">
          {children}
        </span>

        {removable && (
          <button
            type="button"
            className="aui-chip__remove"
            aria-label="Remove"
            onClick={onRemove}
            onKeyDown={handleRemoveKeyDown}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";

export { Chip };
