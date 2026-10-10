import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface MenuItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  items: MenuItem[];

  defaultActiveId?: string;

  loopFocus?: boolean;

  onItemSelect?: (
    item: MenuItem,
  ) => void;
}
