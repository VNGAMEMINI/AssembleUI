import type { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}
