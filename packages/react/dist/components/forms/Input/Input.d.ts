import { type InputHTMLAttributes, type ReactNode } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
}
declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export { Input };
