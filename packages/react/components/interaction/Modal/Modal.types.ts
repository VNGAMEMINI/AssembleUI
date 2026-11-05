import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;

  children?: ReactNode;
}

export interface ModalContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  closeLabel?: string;
}
