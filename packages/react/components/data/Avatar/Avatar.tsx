import {
  forwardRef,
  useState,
} from "react";

import type { AvatarProps } from "./Avatar.types";

import { classNames } from "../../../core/utils";

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      children,
      size = "md",
      shape = "circle",
      className,
      ...props
    },
    ref,
  ) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    const showImage = Boolean(src) && src !== failedSrc;

    return (
      <span
        {...props}
        ref={ref}
        className={classNames(
          "aui-avatar",
          `aui-avatar--${size}`,
          `aui-avatar--${shape}`,
          className,
        )}
      >
        {showImage ? (
          <img
            className="aui-avatar__image"
            src={src}
            alt={alt}
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          <span
            className="aui-avatar__fallback"
            aria-hidden={alt ? undefined : true}
          >
            {children}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
