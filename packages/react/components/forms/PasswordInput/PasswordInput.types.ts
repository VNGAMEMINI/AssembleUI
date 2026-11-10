import type { InputHTMLAttributes } from "react";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  defaultVisible?: boolean;
}
