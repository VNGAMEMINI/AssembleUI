import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children?: ReactNode;
}
