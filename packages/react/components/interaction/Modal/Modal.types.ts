import type { HTMLAttributes, ReactNode } from "react";

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  closeLabel?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}
