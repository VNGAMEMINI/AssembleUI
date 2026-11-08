import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { classNames } from "../../../core/utils";
import type { CalendarProps } from "./Calendar.types";
import {
  addCalendarDays,
  addCalendarMonths,
  formatCalendarDate,
  formatMonth,
  formatNavigationLabel,
  getCalendarDays,
  getLocalizedWeekdays,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  startOfMonth,
} from "./module/_calendar.date";
import { CALENDAR_DAY_COUNT } from "./module/_calendar.constants";

const getDateKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const Calendar = ({
  value,
  defaultValue,
  month,
  defaultMonth,
  minDate,
  maxDate,
  locale,
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
  const [focusedDate, setFocusedDate] = useState<Date>();
  const focusTargets = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocusDate = useRef<Date | null>(null);
  const previousValue = useRef(value);

  const isMonthControlled = month !== undefined;
  const isValueControlled = value !== undefined;

  const currentMonth = isMonthControlled ? startOfMonth(month) : internalMonth;
  const currentValue = isValueControlled ? value : internalValue;

  useEffect(() => {
    const priorValue = previousValue.current;
    previousValue.current = value;

    if (
      !isMonthControlled &&
      value &&
      (!priorValue || !isSameDay(value, priorValue))
    ) {
      setInternalMonth((current) => {
        if (
          current.getFullYear() === value.getFullYear() &&
          current.getMonth() === value.getMonth()
        ) {
          return current;
        }

        return startOfMonth(value);
      });
    }
  }, [isMonthControlled, value]);

  const days = useMemo(() => getCalendarDays(currentMonth, locale), [currentMonth, locale]);
  const weekdays = useMemo(() => getLocalizedWeekdays(locale), [locale]);

  useEffect(() => {
    const pendingDate = pendingFocusDate.current;
    if (
      !pendingDate ||
      pendingDate.getFullYear() !== currentMonth.getFullYear() ||
      pendingDate.getMonth() !== currentMonth.getMonth()
    ) {
      return;
    }

    const target = focusTargets.current.get(getDateKey(pendingDate));
    if (!target) {
      return;
    }

    target.focus();
    pendingFocusDate.current = null;
  }, [focusedDate, currentMonth]);

  const isDisabled = (date: Date): boolean =>
    Boolean(
      (minDate && isBeforeDay(date, minDate)) ||
        (maxDate && isAfterDay(date, maxDate)),
    );

  const enabledDays = days.filter((date) => !isDisabled(date));
  const activeDate =
    (focusedDate &&
      focusedDate.getFullYear() === currentMonth.getFullYear() &&
      focusedDate.getMonth() === currentMonth.getMonth() &&
      enabledDays.find((date) => isSameDay(date, focusedDate))) ||
    (currentValue &&
      enabledDays.find((date) => isSameDay(date, currentValue))) ||
    enabledDays.find((date) => date.getMonth() === currentMonth.getMonth()) ||
    enabledDays[0];

  const changeMonth = (offset: number) => {
    const nextMonth = addCalendarMonths(currentMonth, offset);

    if (!isMonthControlled) {
      setInternalMonth(nextMonth);
    }

    onMonthChange?.(nextMonth);
  };

  const selectDate = (date: Date) => {
    if (isDisabled(date)) {
      return;
    }

    setFocusedDate(date);

    if (!isValueControlled) {
      setInternalValue(date);
    }

    onChange?.(date);
  };

  const moveFocus = (date: Date, direction: number) => {
    let targetDate = date;

    for (let attempt = 0; attempt < 366 && isDisabled(targetDate); attempt += 1) {
      targetDate = addCalendarDays(targetDate, direction || 1);
    }

    if (isDisabled(targetDate)) {
      return;
    }

    const nextMonth = startOfMonth(targetDate);
    if (
      nextMonth.getFullYear() !== currentMonth.getFullYear() ||
      nextMonth.getMonth() !== currentMonth.getMonth()
    ) {
      if (!isMonthControlled) {
        setInternalMonth(nextMonth);
      }
      onMonthChange?.(nextMonth);
    }

    pendingFocusDate.current = targetDate;
    setFocusedDate(targetDate);
  };

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    const dayIndex = days.findIndex((day) => isSameDay(day, date));
    let targetDate: Date | undefined;
    let direction = 0;

    switch (event.key) {
      case "ArrowLeft":
        targetDate = addCalendarDays(date, -1);
        direction = -1;
        break;
      case "ArrowRight":
        targetDate = addCalendarDays(date, 1);
        direction = 1;
        break;
      case "ArrowUp":
        targetDate = addCalendarDays(date, -7);
        direction = -1;
        break;
      case "ArrowDown":
        targetDate = addCalendarDays(date, 7);
        direction = 1;
        break;
      case "Home":
        targetDate = days[dayIndex - (dayIndex % 7)];
        direction = 1;
        break;
      case "End":
        targetDate = days[dayIndex + (6 - (dayIndex % 7))];
        direction = -1;
        break;
      case "PageUp":
        targetDate = addCalendarMonths(date, event.shiftKey ? -12 : -1);
        direction = -1;
        break;
      case "PageDown":
        targetDate = addCalendarMonths(date, event.shiftKey ? 12 : 1);
        direction = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (targetDate) {
      moveFocus(targetDate, direction);
    }
  };

  const previousMonth = addCalendarMonths(currentMonth, -1);
  const nextMonth = addCalendarMonths(currentMonth, 1);

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
          aria-label={formatNavigationLabel(previousMonth, -1, locale)}
          onClick={() => changeMonth(-1)}
        >
          ‹
        </button>

        <div
          className="aui-calendar__month"
          aria-live="polite"
        >
          {formatMonth(currentMonth, locale)}
        </div>

        <button
          type="button"
          className="aui-calendar__nav"
          aria-label={formatNavigationLabel(nextMonth, 1, locale)}
          onClick={() => changeMonth(1)}
        >
          ›
        </button>
      </div>

      <div
        className="aui-calendar__grid"
        role="grid"
        aria-label={formatMonth(currentMonth, locale)}
      >
        <div
          className="aui-calendar__weekdays"
          role="row"
          style={{
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          }}
        >
          {weekdays.map((day) => (
            <span key={day.long} role="columnheader" aria-label={day.long}>
              {day.short}
            </span>
          ))}
        </div>

        {Array.from({ length: 6 }, (_, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            role="row"
            style={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            }}
          >
            {days
              .slice(
                weekIndex * 7,
                Math.min((weekIndex + 1) * 7, CALENDAR_DAY_COUNT),
              )
              .map((date) => {
                const outsideMonth =
                  date.getMonth() !== currentMonth.getMonth();
                const disabled = isDisabled(date);
                const selected =
                  currentValue !== undefined &&
                  isSameDay(date, currentValue);
                const isActive =
                  activeDate !== undefined && isSameDay(date, activeDate);

                return (
                  <div
                    key={date.toISOString()}
                    role="gridcell"
                    aria-label={formatCalendarDate(date, locale)}
                    aria-selected={selected}
                    aria-disabled={disabled || undefined}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      ref={(element) => {
                        if (element) {
                          focusTargets.current.set(getDateKey(date), element);
                        } else {
                          focusTargets.current.delete(getDateKey(date));
                        }
                      }}
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      aria-label={formatCalendarDate(date, locale)}
                      disabled={disabled}
                      className={classNames(
                        "aui-calendar__day",
                        outsideMonth && "aui-calendar__day--outside",
                        selected && "aui-calendar__day--selected",
                      )}
                      onClick={() => selectDate(date)}
                      onKeyDown={(event) => handleDayKeyDown(event, date)}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};
