import type {
  HTMLAttributes,
} from "react";

export type StatChangeVariant =
  | "positive"
  | "negative"
  | "neutral";

export interface StatProps
  extends HTMLAttributes<HTMLElement> {}

export interface StatLabelProps
  extends HTMLAttributes<HTMLDivElement> {}

export interface StatValueProps
  extends HTMLAttributes<HTMLDivElement> {}

export interface StatDescriptionProps
  extends HTMLAttributes<HTMLDivElement> {}

export interface StatChangeProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatChangeVariant;
}
