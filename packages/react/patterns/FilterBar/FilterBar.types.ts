import type {
  FormHTMLAttributes,
  ReactNode,
} from "react";

export interface FilterBarField {
  id: string;
  label?: ReactNode;
  control: ReactNode;
}

export interface FilterBarProps
  extends Omit<
    FormHTMLAttributes<HTMLFormElement>,
    "children"
  > {
  fields: FilterBarField[];
  submitLabel?: ReactNode;
  resetLabel?: ReactNode;
  onReset?: () => void;
}
