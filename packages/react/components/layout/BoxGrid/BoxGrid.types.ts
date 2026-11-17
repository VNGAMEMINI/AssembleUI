import type { HTMLAttributes } from "react";

export type BoxGridSpacing =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

export type BoxGridFlow = "row" | "column";

export interface BoxGridProps
  extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  minWidth?: string;
  spacing?: BoxGridSpacing;
  autoFlow?: BoxGridFlow;
}
