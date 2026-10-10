import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { LinkProps } from "./Link.types";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      underline = "hover",
      external = false,
      className,
      target,
      rel,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedTarget = external ? (target ?? "_blank") : target;
    const resolvedRel = external
      ? rel
        ? rel
        : "noopener noreferrer"
      : rel;

    return (
      <a
        {...props}
        ref={ref}
        target={resolvedTarget}
        rel={resolvedRel}
        className={classNames(
          "aui-link",
          `aui-link--underline-${underline}`,
          external && "aui-link--external",
          className,
        )}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = "Link";
