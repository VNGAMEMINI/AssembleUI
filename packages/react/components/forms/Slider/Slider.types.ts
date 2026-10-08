import type {
  ChangeEvent,
  InputHTMLAttributes,
} from "react";

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (
    value: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}
