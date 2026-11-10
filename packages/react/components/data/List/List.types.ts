import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type ListOrientation =
  | "vertical"
  | "horizontal";

export type ListDensity =
  | "comfortable"
  | "compact";

export interface ListProps
  extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ordered?: boolean;
  orientation?: ListOrientation;
  density?: ListDensity;
  divided?: boolean;
}
