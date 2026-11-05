import type { HTMLAttributes, ReactNode } from "react";

export interface DescriptionListItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps extends Omit<HTMLAttributes<HTMLDListElement>, "children"> {
  items: DescriptionListItem[];
  columns?: 1 | 2 | 3;
}
