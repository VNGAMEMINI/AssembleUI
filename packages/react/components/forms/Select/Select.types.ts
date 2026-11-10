import type {
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}
