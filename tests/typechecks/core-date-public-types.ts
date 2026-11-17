import {
  addCalendarDays,
  addCalendarMonths,
  formatCalendarDate,
  formatMonth,
  getLocaleWeekStart,
  getLocalizedWeekdays,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  startOfMonth,
} from "@assemble-ui/react/core";

const date = new Date(2026, 10, 11);

const monthStart: Date = startOfMonth(date);
const sameDay: boolean = isSameDay(date, monthStart);
const beforeDay: boolean = isBeforeDay(date, monthStart);
const afterDay: boolean = isAfterDay(date, monthStart);

const weekStart: number = getLocaleWeekStart("vi-VN");
const monthLabel: string = formatMonth(date, "vi-VN");
const dateLabel: string = formatCalendarDate(date, "vi-VN");

const weekdays: { short: string; long: string }[] =
  getLocalizedWeekdays("vi-VN");

const nextDay: Date = addCalendarDays(date, 1);
const nextMonth: Date = addCalendarMonths(date, 1);

void [
  monthStart,
  sameDay,
  beforeDay,
  afterDay,
  weekStart,
  monthLabel,
  dateLabel,
  weekdays,
  nextDay,
  nextMonth,
];
