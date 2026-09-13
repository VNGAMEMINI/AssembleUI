import type {
  SelectHTMLAttributes,
  ReactNode,
} from "react";

import type { AUIComponentProps } from "../../../types";

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "className"
  >,
    AUIComponentProps {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}
