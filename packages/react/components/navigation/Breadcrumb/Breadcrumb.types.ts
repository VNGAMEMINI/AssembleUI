import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}
