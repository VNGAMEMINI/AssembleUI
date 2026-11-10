import type { AnchorHTMLAttributes } from "react";

export type LinkUnderline = "always" | "hover" | "none";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: LinkUnderline;
  external?: boolean;
}
