import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ComboboxOption {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  options: ComboboxOption[];

  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  placeholder?: string;
  disabled?: boolean;
  required?: boolean;

  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;

  noResultsText?: ReactNode;
}
