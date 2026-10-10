import type { HTMLAttributes, ReactNode } from "react";

export type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
  children?: ReactNode;
}
