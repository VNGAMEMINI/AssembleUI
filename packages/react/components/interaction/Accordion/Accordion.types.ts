import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  items: AccordionItem[];

  multiple?: boolean;

  openIds?: string[];
  defaultOpenIds?: string[];

  onOpenChange?: (
    openIds: string[],
  ) => void;
}
