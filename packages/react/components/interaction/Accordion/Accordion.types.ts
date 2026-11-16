import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  openIds?: string[];
  defaultOpenIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
}

export interface AccordionItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  id: string;
  title: ReactNode;
  disabled?: boolean;
}
