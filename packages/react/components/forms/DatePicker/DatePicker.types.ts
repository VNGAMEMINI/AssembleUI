import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface DatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "children"
  > {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}
