import type { HTMLAttributes } from "react";

export type DividerOrientation =
  | "horizontal"
  | "vertical";

export interface DividerProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children"
  > {
  orientation?: DividerOrientation;
}
