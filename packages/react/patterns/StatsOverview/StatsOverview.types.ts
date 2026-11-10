import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import type {
  StatTrend,
} from "../../components";

export interface StatsOverviewItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  trend?: StatTrend;
}

export interface StatsOverviewProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "title"
  > {
  title?: ReactNode;
  description?: ReactNode;
  items: StatsOverviewItem[];
}
