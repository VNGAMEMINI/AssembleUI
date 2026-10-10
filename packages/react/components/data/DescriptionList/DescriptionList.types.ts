import type { ReactNode } from "react";

export interface DescriptionListItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionListItem[];
  columns?: 1 | 2 | 3;
  className?: string;
}
