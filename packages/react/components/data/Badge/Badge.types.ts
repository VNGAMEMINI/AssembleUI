import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BadgeSize =
  | "sm"
  | "md"
  | "lg";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}
