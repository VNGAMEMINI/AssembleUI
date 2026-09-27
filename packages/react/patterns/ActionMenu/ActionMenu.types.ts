import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ActionMenuLinkItem {
  type: "link";
  label: ReactNode;
  href: string;
  external?: boolean;
}

export interface ActionMenuActionItem
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "type"
  > {
  type: "action";
  label: ReactNode;
}

export type ActionMenuItem =
  | ActionMenuLinkItem
  | ActionMenuActionItem;

export interface ActionMenuProps
  extends HTMLAttributes<HTMLElement> {
  items: ActionMenuItem[];
}
