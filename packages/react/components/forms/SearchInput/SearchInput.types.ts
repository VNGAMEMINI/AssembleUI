import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface SearchInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  icon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}
