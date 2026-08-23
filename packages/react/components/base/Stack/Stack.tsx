import {
  forwardRef,
  type HTMLAttributes
} from "react";

import {
  classNames
} from "../../../core";

export type StackSpacing = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  spacing?: StackSpacing;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    className,
    direction = "vertical",
    spacing = "4",
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-stack",
        `aui-stack--${direction}`,
        `aui-stack--spacing-${spacing}`,
        className
      )}
    />
  );
});
