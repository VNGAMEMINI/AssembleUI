import {
  forwardRef,
  type HTMLAttributes
} from "react";

import {
  classNames
} from "../../../core";

export type FlexAlign = "start" | "center" | "end" | "stretch";
export type FlexDirection = "row" | "column";
export type FlexGap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8";
export type FlexJustify = "start" | "center" | "end" | "between" | "around";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  justify?: FlexJustify;
  wrap?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    align = "stretch",
    className,
    direction = "row",
    gap = "0",
    justify = "start",
    wrap = false,
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-flex",
        `aui-flex--${direction}`,
        `aui-flex--align-${align}`,
        `aui-flex--justify-${justify}`,
        `aui-flex--gap-${gap}`,
        wrap && "aui-flex--wrap",
        className
      )}
    />
  );
});
