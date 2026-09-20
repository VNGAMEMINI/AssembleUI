import { forwardRef } from "react";
import type { ElementType } from "react";
import { classNames } from "../../../core/utils";
import type { TextProps } from "./Text.types";

const elementMap = {
  p: "p",
  span: "span",
  div: "div",
} as const;

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "p",
      size = "md",
      tone = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = elementMap[as] as ElementType;

    return (
      <Tag
        {...props}
        ref={ref}
        className={classNames(
          "aui-text",
          `aui-text--${size}`,
          `aui-text--${tone}`,
          className,
        )}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = "Text";
