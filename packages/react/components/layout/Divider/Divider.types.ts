import type { HTMLAttributes } from "react";

export type DividerOrientation =
  | "horizontal"
  | "vertical";

export interface DividerProps
  extends HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
}
