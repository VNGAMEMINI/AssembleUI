import { forwardRef } from "react";
import type { ElementType } from "react";
import { classNames } from "../../../core/utils";
import type { HeadingProps } from "./Heading.types";

const levelMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, className, children, ...props }, ref) => {
    const Tag = levelMap[level] as ElementType;

    return (
      <Tag
        {...props}
        ref={ref}
        className={classNames(
          "aui-heading",
          `aui-heading--level-${level}`,
          size && `aui-heading--${size}`,
          className,
        )}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";
