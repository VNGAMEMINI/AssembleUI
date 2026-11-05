import type { HTMLAttributes } from "react";

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  ariaLabel?: string;
}
