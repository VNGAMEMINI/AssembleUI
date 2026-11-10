import type { HTMLAttributes, ReactNode } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  children: ReactNode;
  size?: IconSize;
  label?: string;
}
