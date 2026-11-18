import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type MarqueeDirection =
  | "left"
  | "right";

export interface MarqueeProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  gap?: number | string;
  direction?: MarqueeDirection;
  pauseOnHover?: boolean;
}
