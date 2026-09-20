import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type ChipVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type ChipSize =
  | "sm"
  | "md"
  | "lg";

export interface ChipProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  removeLabel?: string;
  onRemove?: () => void;
}
