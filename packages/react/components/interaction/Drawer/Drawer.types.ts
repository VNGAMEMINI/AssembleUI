import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";

export type DrawerPlacement =
  | "left"
  | "right"
  | "top"
  | "bottom";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;

  children?: ReactNode;
}

export interface DrawerContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  closeLabel?: string;

  placement?: DrawerPlacement;
  columns?: number | string;
  gap?: CSSProperties["gap"];
}

export type DrawerItemProps =
  HTMLAttributes<HTMLDivElement>;
