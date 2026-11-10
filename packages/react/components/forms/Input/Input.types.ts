import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}
