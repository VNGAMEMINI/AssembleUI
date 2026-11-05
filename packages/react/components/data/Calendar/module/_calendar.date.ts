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

export const getCalendarDays = (month: Date): Date[] => {
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

export const formatMonth = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(date);
