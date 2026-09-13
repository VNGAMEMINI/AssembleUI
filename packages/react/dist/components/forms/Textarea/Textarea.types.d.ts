import type { ReactNode, TextareaHTMLAttributes } from "react";
import type { AUIComponentProps } from "../../../types";
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">, AUIComponentProps {
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
}
