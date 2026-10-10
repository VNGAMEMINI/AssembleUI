import { useMemo, useState } from "react";

import { classNames } from "../../../core/utils";
import type { CalendarProps } from "./Calendar.types";

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBeforeDay = (a: Date, b: Date) =>
  new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() <
  new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

const isAfterDay = (a: Date, b: Date) =>
  new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() >
  new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

const getCalendarDays = (month: Date) => {
  const firstDay = startOfMonth(month);
  const startOffset = firstDay.getDay();
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

const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(date);

export const Calendar = ({
  value,
  defaultValue,
  month,
  defaultMonth,
  minDate,
  maxDate,
  onChange,
  onMonthChange,
  className,
}: CalendarProps) => {
  const initialMonth = startOfMonth(
    month ?? defaultMonth ?? value ?? defaultValue ?? new Date(),
  );

  const [internalMonth, setInternalMonth] = useState(initialMonth);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );

  const isMonthControlled = month !== undefined;
  const isValueControlled = value !== undefined;

  const currentMonth = isMonthControlled ? startOfMonth(month) : internalMonth;
  const currentValue = isValueControlled ? value : internalValue;

  const days = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth],
  );

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + offset,
      1,
    );

    if (!isMonthControlled) {
      setInternalMonth(nextMonth);
    }

    onMonthChange?.(nextMonth);
  };

  const selectDate = (date: Date) => {
    if (
      (minDate && isBeforeDay(date, minDate)) ||
      (maxDate && isAfterDay(date, maxDate))
    ) {
      return;
    }

    if (!isValueControlled) {
      setInternalValue(date);
    }

    onChange?.(date);
  };

  return (
    <div
      className={classNames("aui-calendar", className)}
      data-testid="calendar"
    >
      <div className="aui-calendar__header">
        <button
          type="button"
          className="aui-calendar__nav"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        >
          ‹
        </button>

        <div
          className="aui-calendar__month"
          aria-live="polite"
        >
          {formatMonth(currentMonth)}
        </div>

        <button
          type="button"
          className="aui-calendar__nav"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        >
          ›
        </button>
      </div>

      <div
        className="aui-calendar__weekdays"
        aria-hidden="true"
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <span key={day}>{day}</span>
          ),
        )}
      </div>

      <div
        className="aui-calendar__grid"
        role="grid"
        aria-label={formatMonth(currentMonth)}
      >
        {days.map((date) => {
          const outsideMonth =
            date.getMonth() !== currentMonth.getMonth();

          const disabled =
            (minDate && isBeforeDay(date, minDate)) ||
            (maxDate && isAfterDay(date, maxDate));

          const selected =
            currentValue !== undefined &&
            isSameDay(date, currentValue);

          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              aria-selected={selected}
              aria-label={date.toLocaleDateString()}
              disabled={Boolean(disabled)}
              className={classNames(
                "aui-calendar__day",
                outsideMonth && "aui-calendar__day--outside",
                selected && "aui-calendar__day--selected",
              )}
              onClick={() => selectDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
