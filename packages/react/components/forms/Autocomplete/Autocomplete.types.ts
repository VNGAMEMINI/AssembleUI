import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface AutocompleteOption<T = string> {
  value: T;
  label: ReactNode;
}

export interface AutocompleteProps<T = string>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  options: AutocompleteOption<T>[];
  value?: string;
  defaultValue?: string;
  onChange?: (
    value: string,
    option: AutocompleteOption<T> | undefined,
  ) => void;
}
