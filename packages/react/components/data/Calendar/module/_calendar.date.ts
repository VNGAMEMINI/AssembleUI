import {
  formatMonth,
  getLocaleWeekStart,
  startOfMonth,
} from "../../../../core/utils";

export const getCalendarDays = (month: Date, locale?: string): Date[] => {
  const firstDay = startOfMonth(month);
  const startOffset = (firstDay.getDay() - getLocaleWeekStart(locale) + 7) % 7;

  const start = new Date(
    month.getFullYear(),
    month.getMonth(),
    1 - startOffset,
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
};

export const formatNavigationLabel = (
  date: Date,
  direction: -1 | 1,
  locale?: string,
): string => {
  const relativeMonth = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  }).format(direction, "month");

  return `${relativeMonth} (${formatMonth(date, locale)})`;
};
