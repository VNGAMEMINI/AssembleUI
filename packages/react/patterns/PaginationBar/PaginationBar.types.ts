import type { HTMLAttributes, ReactNode } from "react";

export interface PaginationBarProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  summary?: ReactNode;
}
