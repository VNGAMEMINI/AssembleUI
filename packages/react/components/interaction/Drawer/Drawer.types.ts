import type { HTMLAttributes, ReactNode } from "react";

export type DrawerSide =
  | "left"
  | "right"
  | "top"
  | "bottom";

export interface DrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  side?: DrawerSide;

  closeLabel?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}
