import type { ImgHTMLAttributes } from "react";

export type ImageFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";

export type ImageRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "full";

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  fit?: ImageFit;
  radius?: ImageRadius;
}
