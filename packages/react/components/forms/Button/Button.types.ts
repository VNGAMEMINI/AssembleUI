import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { AUIComponentProps } from "../../types";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    AUIComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}
