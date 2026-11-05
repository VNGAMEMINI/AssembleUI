import type { HTMLAttributes, ReactNode } from "react";

export interface TimelineItem {
  id: string;
  title: ReactNode;
  content?: ReactNode;
  time?: ReactNode;
  icon?: ReactNode;
  status?: "default" | "success" | "warning" | "error";
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  items: TimelineItem[];
}
