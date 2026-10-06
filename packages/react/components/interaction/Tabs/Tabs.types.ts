import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface TabsItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  items: TabsItem[];

  value?: string;
  defaultValue?: string;

  onValueChange?: (
    value: string,
  ) => void;
}
