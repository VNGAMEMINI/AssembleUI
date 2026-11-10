import type { ChangeEvent, InputHTMLAttributes } from "react";

export interface FileInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  onChange?: (
    files: FileList | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}
