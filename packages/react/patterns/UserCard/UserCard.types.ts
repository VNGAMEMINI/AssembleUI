import type { HTMLAttributes, ReactNode } from "react";

export interface UserCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  description?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
}
