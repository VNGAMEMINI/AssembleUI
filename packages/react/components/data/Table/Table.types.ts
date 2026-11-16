import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type TableVariant =
  | "default"
  | "striped";

export type TableDensity =
  | "comfortable"
  | "compact";

export interface TableProps
  extends Omit<
    TableHTMLAttributes<HTMLTableElement>,
    "title"
  > {
  title?: ReactNode;
  variant?: TableVariant;
  density?: TableDensity;
  bordered?: boolean;
  hoverable?: boolean;
  wrapperClassName?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement> & {
    [key: `data-${string}`]: string | number | undefined;
  };
}

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement> {}

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement> {}

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {}
