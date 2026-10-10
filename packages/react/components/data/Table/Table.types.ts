import type {
  TableHTMLAttributes,
} from "react";

export type TableVariant =
  | "default"
  | "striped";

export type TableDensity =
  | "comfortable"
  | "compact";

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  density?: TableDensity;
  bordered?: boolean;
}
