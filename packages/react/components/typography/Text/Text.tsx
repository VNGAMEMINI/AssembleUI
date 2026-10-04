import { forwardRef } from "react";
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
    const Tag = elementMap[as];

    const setRef = (node: HTMLElement | null) => {
      if (typeof ref === "function") {
        ref(node);
        return;
      }

      if (ref) {
        ref.current = node;
      }
    };

    return (
      <Tag
        {...props}
        ref={setRef}
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
