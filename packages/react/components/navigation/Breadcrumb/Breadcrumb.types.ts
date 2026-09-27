import type { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}
