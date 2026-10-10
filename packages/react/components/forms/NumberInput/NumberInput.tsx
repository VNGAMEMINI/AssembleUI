import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { classNames } from "../../../core/utils";
import type { NumberInputProps } from "./NumberInput.types";

export const NumberInput = forwardRef<
  HTMLInputElement,
  NumberInputProps
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
      const rawValue = event.target.value;

      onChange?.(
        rawValue === "" ? null : Number(rawValue),
        event,
      );
    };

    const inputProps =
      value !== undefined
        ? {
            value: value === null ? "" : value,
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
        type="number"
        onChange={handleChange}
        className={classNames(
          "aui-number-input",
          className,
        )}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
