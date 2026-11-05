import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface SkipLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  href?: string;
  children?: ReactNode;
}
