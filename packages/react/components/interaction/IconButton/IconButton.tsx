import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import { Icon } from "../Icon";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(
  (
    {
      icon,
      label,
      size = "md",
      className,
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
        aria-label={label}
        className={classNames(
          "aui-icon-button",
          `aui-icon-button--${size}`,
          className,
        )}
      >
        <Icon size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}>
          {icon}
        </Icon>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
