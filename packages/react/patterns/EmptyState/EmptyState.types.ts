import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps
  extends HTMLAttributes<HTMLElement> {
  heading: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}
