export const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isBeforeDay = (a: Date, b: Date): boolean =>
  new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() <
  new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

export const isAfterDay = (a: Date, b: Date): boolean =>
  new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() >
  new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

export const getLocaleWeekStart = (locale?: string): number => {
  if (typeof Intl.Locale !== "function") {
    return 0;
  }

  const resolvedLocale =
    locale ?? new Intl.DateTimeFormat().resolvedOptions().locale;
  const localeInfo = new Intl.Locale(resolvedLocale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  const firstDay =
    localeInfo.getWeekInfo?.().firstDay ?? localeInfo.weekInfo?.firstDay ?? 7;

  return firstDay % 7;
};

export const getCalendarDays = (month: Date, locale?: string): Date[] => {
  const firstDay = startOfMonth(month);
  const startOffset =
    (firstDay.getDay() - getLocaleWeekStart(locale) + 7) % 7;

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

export const formatMonth = (date: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);

export const formatCalendarDate = (date: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

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

export const getLocalizedWeekdays = (locale?: string) => {
  const weekStart = getLocaleWeekStart(locale);
  const firstDay = new Date(2023, 0, 1 + weekStart);
  const shortFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const longFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" });

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);

    return {
      short: shortFormatter.format(date),
      long: longFormatter.format(date),
    };
  });
};

export const addCalendarDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addCalendarMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();

  result.setDate(Math.min(date.getDate(), lastDay));
  return result;
};
