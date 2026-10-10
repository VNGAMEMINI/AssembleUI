import type { HTMLAttributes } from "react";

export type TextAs = "p" | "span" | "div";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextTone = "default" | "muted";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  tone?: TextTone;
}
