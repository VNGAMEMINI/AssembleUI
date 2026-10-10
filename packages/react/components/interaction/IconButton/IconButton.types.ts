import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
  > {
  icon: ReactNode;
  label: string;
  size?: IconButtonSize;
}
