import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import type { BreadcrumbItem } from "../../components";

export interface ContentHeaderProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}
