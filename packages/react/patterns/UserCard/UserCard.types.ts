import type { HTMLAttributes, ReactNode } from "react";

export interface UserCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  description?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  badge?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}
