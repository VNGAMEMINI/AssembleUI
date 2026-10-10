import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { classNames } from "../../../core/utils";
import type { FileInputProps } from "./FileInput.types";

export const FileInput = forwardRef<
  HTMLInputElement,
  FileInputProps
>(
  (
    {
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      onChange?.(event.target.files, event);
    };

    return (
      <input
        {...props}
        ref={ref}
        type="file"
        onChange={handleChange}
        className={classNames(
          "aui-file-input",
          className,
        )}
      />
    );
  },
);

FileInput.displayName = "FileInput";
