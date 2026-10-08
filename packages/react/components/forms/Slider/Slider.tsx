import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { classNames } from "../../../core/utils";
import type { SliderProps } from "./Slider.types";

export const Slider = forwardRef<
  HTMLInputElement,
  SliderProps
>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      onChange?.(Number(event.target.value), event);
    };

    const inputProps =
      value !== undefined
        ? {
            value,
          }
        : defaultValue !== undefined
          ? {
              defaultValue,
            }
          : {};

    return (
      <input
        {...props}
        {...inputProps}
        ref={ref}
        type="range"
        onChange={handleChange}
        className={classNames(
          "aui-slider",
          className,
        )}
      />
    );
  },
);

Slider.displayName = "Slider";
