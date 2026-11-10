import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type StatTrend =
  | "positive"
  | "negative"
  | "neutral";

export interface StatProps
  extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  trend?: StatTrend;
}
