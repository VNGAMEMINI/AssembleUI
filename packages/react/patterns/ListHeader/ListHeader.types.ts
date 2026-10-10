import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ListHeaderProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  count?: ReactNode;
  actions?: ReactNode;
}
