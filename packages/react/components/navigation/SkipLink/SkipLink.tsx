import { classNames } from "../../../core/utils";
import type { SkipLinkProps } from "./SkipLink.types";

export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
  className,
  ...anchorProps
}: SkipLinkProps) {
  return (
    <a
      {...anchorProps}
      className={classNames(
        "aui-skip-link",
        className,
      )}
      href={href}
    >
      {children}
    </a>
  );
}
