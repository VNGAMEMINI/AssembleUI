import type { HTMLAttributes } from "react";

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}
