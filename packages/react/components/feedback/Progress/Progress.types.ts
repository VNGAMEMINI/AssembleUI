import type { HTMLAttributes } from "react";

export type ProgressSize = "sm" | "md" | "lg";

export type ProgressVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger";

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value?: number;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
}
