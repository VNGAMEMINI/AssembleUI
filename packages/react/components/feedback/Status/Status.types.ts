import type { HTMLAttributes, ReactNode } from "react";

export type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
  children?: ReactNode;
}
