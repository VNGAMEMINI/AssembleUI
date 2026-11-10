import { forwardRef } from "react";

import type { ChipProps } from "./Chip.types";

import { classNames } from "../../../core/utils";

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      children,
      variant = "neutral",
      size = "md",
      removable = false,
      removeLabel = "Remove",
      onRemove,
      className,
      ...props
    },
    ref,
  ) => {
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
            aria-label={removeLabel}
            onClick={onRemove}
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
