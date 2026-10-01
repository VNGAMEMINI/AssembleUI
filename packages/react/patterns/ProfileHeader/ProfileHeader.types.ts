import type { HTMLAttributes, ReactNode } from "react";

export interface ProfileHeaderProps
  extends HTMLAttributes<HTMLElement> {
  name: string;
  description?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  badge?: ReactNode;
  action?: ReactNode;
}
