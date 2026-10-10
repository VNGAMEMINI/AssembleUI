import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export type PopoverPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left";

export interface PopoverProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  trigger: ReactElement;

  children?: ReactNode;

  placement?: PopoverPlacement;

  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}
