import type {
  FormHTMLAttributes,
  ReactNode,
} from "react";

import type { ButtonProps } from "../../components/forms/Button";
import type { InputProps } from "../../components/forms/Input";

export interface SearchBarProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "children"> {
  inputProps?: Omit<InputProps, "type">;
  buttonProps?: Omit<ButtonProps, "type">;
  buttonLabel?: ReactNode;
}
