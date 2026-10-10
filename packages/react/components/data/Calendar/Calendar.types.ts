export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  month?: Date;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date) => void;
  onMonthChange?: (month: Date) => void;
  className?: string;
}
