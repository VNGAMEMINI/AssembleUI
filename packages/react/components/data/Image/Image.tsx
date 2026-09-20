import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { ImageProps } from "./Image.types";

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      fit = "cover",
      radius = "none",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <img
        {...props}
        ref={ref}
        className={classNames(
          "aui-image",
          `aui-image--fit-${fit}`,
          `aui-image--radius-${radius}`,
          className,
        )}
      />
    );
  },
);

Image.displayName = "Image";
