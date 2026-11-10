import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type CardVariant =
  | "default"
  | "outlined";

export type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

export interface CardProps
  extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  elevated?: boolean;
}
