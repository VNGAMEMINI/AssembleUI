import type { InputHTMLAttributes, ReactNode } from "react";
import type { AUIComponentProps } from "../../../types";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className">, AUIComponentProps {
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
}
