import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type AvatarSize =
  | "sm"
  | "md"
  | "lg";

export type AvatarShape =
  | "circle"
  | "square";

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  children?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
}
