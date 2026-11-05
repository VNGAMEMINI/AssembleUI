import { useMemo, useState } from "react";

import { classNames } from "../../../core/utils";
import type { CalendarProps } from "./Calendar.types";
import {
  formatMonth,
  getCalendarDays,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  startOfMonth,
} from "./module/_calendar.date";
import {
  CALENDAR_DAY_COUNT,
  CALENDAR_WEEKDAYS,
} from "./module/_calendar.constants";

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
  style,
  "data-testid": testId = "calendar",
  ...rootProps
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
      {...rootProps}
      className={classNames("aui-calendar", className)}
      style={style}
      data-testid={testId}
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
        {CALENDAR_WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div
        className="aui-calendar__grid"
        role="grid"
        aria-label={formatMonth(currentMonth)}
      >
        {days.slice(0, CALENDAR_DAY_COUNT).map((date) => {
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
