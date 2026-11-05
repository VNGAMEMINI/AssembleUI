import type { HTMLAttributes, ReactNode } from "react";

export interface DataGridColumn<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (value: unknown, row: T, index: number) => ReactNode;
}

export interface DataGridProps<T extends Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  columns: DataGridColumn<T>[];
  rows: T[];
  rowKey?: keyof T | ((row: T, index: number) => string);
  emptyState?: ReactNode;
}
