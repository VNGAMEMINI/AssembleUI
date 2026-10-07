import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type ToastStatus =
  | "info"
  | "success"
  | "warning"
  | "error";

export interface ToastProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "title"
  > {
  open?: boolean;
  title?: ReactNode;
  message?: ReactNode;
  status?: ToastStatus;
  duration?: number;
  onClose?: () => void;
  closeLabel?: string;
}
