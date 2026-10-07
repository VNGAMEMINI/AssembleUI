import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface DataToolbarProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "title"
  > {
  title?: ReactNode;
  description?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
}
