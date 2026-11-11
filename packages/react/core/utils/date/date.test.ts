import { describe, expect, it } from "vitest";

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
} from "./date";

describe("startOfMonth", () => {
  it("returns the first day of the month", () => {
    expect(startOfMonth(new Date(2026, 10, 11))).toEqual(
      new Date(2026, 10, 1),
    );
  });
});

describe("day comparison", () => {
  const first = new Date(2026, 10, 11, 8);
  const sameDay = new Date(2026, 10, 11, 20);
  const previousDay = new Date(2026, 10, 10);
  const nextDay = new Date(2026, 10, 12);

  it("compares calendar days regardless of time", () => {
    expect(isSameDay(first, sameDay)).toBe(true);
  });

  it("detects a date before another date", () => {
    expect(isBeforeDay(previousDay, first)).toBe(true);
  });

  it("detects a date after another date", () => {
    expect(isAfterDay(nextDay, first)).toBe(true);
  });

  it("does not consider the same day before or after itself", () => {
    expect(isBeforeDay(first, sameDay)).toBe(false);
    expect(isAfterDay(first, sameDay)).toBe(false);
  });
});

describe("getLocaleWeekStart", () => {
  it("returns a valid weekday index", () => {
    const result = getLocaleWeekStart("en-US");

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(6);
  });

  it("normalizes Sunday to index zero", () => {
    expect(getLocaleWeekStart("en-US")).toBe(0);
  });

  it("returns Monday as index one", () => {
    expect(getLocaleWeekStart("vi-VN")).toBe(1);
  });
});

describe("formatting", () => {
  const date = new Date(2026, 10, 11);

  it("formats a month and year", () => {
    expect(formatMonth(date, "en-US")).toBe("November 2026");
  });

  it("formats a complete calendar date", () => {
    expect(formatCalendarDate(date, "en-US")).toContain("November");
    expect(formatCalendarDate(date, "en-US")).toContain("2026");
  });

  it("returns seven localized weekdays", () => {
    const weekdays = getLocalizedWeekdays("en-US");

    expect(weekdays).toHaveLength(7);

    for (const weekday of weekdays) {
      expect(weekday.short).toBeTruthy();
      expect(weekday.long).toBeTruthy();
    }
  });

  it("starts localized weekdays according to the locale", () => {
    const usWeekdays = getLocalizedWeekdays("en-US");
    const vietnameseWeekdays = getLocalizedWeekdays("vi-VN");

    expect(usWeekdays[0].long).toBe("Sunday");
    expect(vietnameseWeekdays[0].long).toBe("Thứ Hai");
  });
});

describe("addCalendarDays", () => {
  it("adds days without mutating the original date", () => {
    const original = new Date(2026, 0, 31);
    const result = addCalendarDays(original, 1);

    expect(result).toEqual(new Date(2026, 1, 1));
    expect(original).toEqual(new Date(2026, 0, 31));
  });

  it("supports negative offsets and year boundaries", () => {
    expect(addCalendarDays(new Date(2026, 0, 1), -1)).toEqual(
      new Date(2025, 11, 31),
    );
  });
});

describe("addCalendarMonths", () => {
  it("clamps the day when the target month is shorter", () => {
    expect(addCalendarMonths(new Date(2025, 0, 31), 1)).toEqual(
      new Date(2025, 1, 28),
    );
  });

  it("supports leap years", () => {
    expect(addCalendarMonths(new Date(2024, 0, 31), 1)).toEqual(
      new Date(2024, 1, 29),
    );
  });

  it("supports negative month offsets", () => {
    expect(addCalendarMonths(new Date(2026, 2, 31), -1)).toEqual(
      new Date(2026, 1, 28),
    );
  });

  it("does not mutate the original date", () => {
    const original = new Date(2026, 0, 31);

    addCalendarMonths(original, 1);

    expect(original).toEqual(new Date(2026, 0, 31));
  });

  it("supports year boundaries", () => {
    expect(addCalendarMonths(new Date(2026, 11, 15), 1)).toEqual(
      new Date(2027, 0, 15),
    );
  });

  it("preserves the date when the month offset is zero", () => {
    expect(addCalendarMonths(new Date(2026, 10, 11), 0)).toEqual(
      new Date(2026, 10, 11),
    );
  });
});
