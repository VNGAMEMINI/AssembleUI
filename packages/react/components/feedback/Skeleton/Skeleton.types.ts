import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}
