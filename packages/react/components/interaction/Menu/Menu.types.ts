import type {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export interface MenuItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items: MenuItem[];

  /** Optional button that toggles the menu popup. */
  trigger?: ReactElement<ComponentPropsWithRef<"button">>;

  /** Initial active item. */
  defaultActiveId?: string;

  /** Whether keyboard navigation wraps around. */
  loopFocus?: boolean;

  /** Controlled popup state. */
  open?: boolean;

  /** Initial popup state when uncontrolled. */
  defaultOpen?: boolean;

  /** Called when popup state changes. */
  onOpenChange?: (open: boolean) => void;

  /** Popup placement relative to trigger. */
  placement?: "top" | "right" | "bottom" | "left";

  /** Whether Escape closes the popup. */
  closeOnEscape?: boolean;

  /** Whether clicking outside closes the popup. */
  closeOnOutsideClick?: boolean;

  onItemSelect?: (item: MenuItem) => void;
}
