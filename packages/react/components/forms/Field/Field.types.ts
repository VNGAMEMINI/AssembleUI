import type { HTMLAttributes, ReactNode } from "react";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  children?: ReactNode;
}
