import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

import type { AUIComponentProps } from "../../../types";

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "type"
  >,
    AUIComponentProps {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}
