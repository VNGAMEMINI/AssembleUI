import type { ReactNode } from "react";

export interface TimelineItem {
  id: string;
  title: ReactNode;
  content?: ReactNode;
  time?: ReactNode;
  icon?: ReactNode;
  status?: "default" | "success" | "warning" | "error";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}
