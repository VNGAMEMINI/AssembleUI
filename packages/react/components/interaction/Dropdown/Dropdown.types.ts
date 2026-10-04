import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface DropdownItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  trigger: ReactNode;
  items: DropdownItem[];

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  placement?: "top" | "right" | "bottom" | "left";

  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}
