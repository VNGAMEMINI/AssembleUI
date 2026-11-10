import type { HTMLAttributes } from "react";

export type ContainerSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full";

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}
