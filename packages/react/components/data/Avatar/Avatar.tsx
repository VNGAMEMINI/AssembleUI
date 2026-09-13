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
    const [imageError, setImageError] = useState(false);

    const showImage = Boolean(src) && !imageError;

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
            onError={() => setImageError(true)}
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
