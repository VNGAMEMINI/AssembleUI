import type { HTMLAttributes } from "react";

import type {
  BreadcrumbItem,
  StatChangeVariant,
} from "../../components";

export interface DashboardPageStatData {
  id: string;
  label: string;
  value: string | number;
  description?: string;
  change?: {
    value: string | number;
    variant?: StatChangeVariant;
  };
}

export interface DashboardPageColumnData {
  key: string;
  header: string;
}

export type DashboardPageCellValue =
  | string
  | number
  | boolean
  | null;

export interface DashboardPageRowData {
  id: string;
  [key: string]: DashboardPageCellValue;
}

export interface DashboardPageToolbarData {
  title?: string;
  description?: string;
}

export interface DashboardPagePaginationData {
  page: number;
  totalPages: number;
  siblingCount?: number;
  summary?: string;
}

export interface DashboardPageData {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  stats?: DashboardPageStatData[];
  toolbar?: DashboardPageToolbarData;
  columns: DashboardPageColumnData[];
  rows: DashboardPageRowData[];
  pagination?: DashboardPagePaginationData;
}

export interface DashboardPageTemplateProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children"
  > {
  data: DashboardPageData;
  onPageChange?: (page: number) => void;
}
