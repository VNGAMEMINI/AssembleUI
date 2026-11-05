import type { HTMLAttributes } from "react";

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "value" | "defaultValue" | "onChange"> {
  "data-testid"?: string;
  value?: Date;
  defaultValue?: Date;
  month?: Date;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date) => void;
  onMonthChange?: (month: Date) => void;
}
