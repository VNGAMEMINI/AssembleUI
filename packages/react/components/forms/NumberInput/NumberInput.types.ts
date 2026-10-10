import type {
  ChangeEvent,
  InputHTMLAttributes,
} from "react";

export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  value?: number | null;
  defaultValue?: number;
  onChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}
