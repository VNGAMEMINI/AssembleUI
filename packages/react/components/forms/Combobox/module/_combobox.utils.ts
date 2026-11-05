import type { ComboboxOption } from "../Combobox.types";

/**
 * Returns a plain-text label when an option label is a string.
 * Non-string ReactNode labels intentionally return an empty string.
 */
export function getOptionLabel(
  option: ComboboxOption | undefined,
): string {
  return typeof option?.label === "string"
    ? option.label
    : "";
}

/**
 * Finds the currently selected option.
 */
export function findSelectedOption(
  options: ComboboxOption[],
  value: string,
): ComboboxOption | undefined {
  return options.find((option) => option.id === value);
}

/**
 * Filters options using a case-insensitive text query.
 */
export function filterComboboxOptions(
  options: ComboboxOption[],
  inputValue: string,
): ComboboxOption[] {
  const normalizedQuery = inputValue.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  return options.filter((option) =>
    getOptionLabel(option)
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  );
}

/**
 * Returns indexes of options that are not disabled.
 */
export function getEnabledOptionIndexes(
  options: ComboboxOption[],
): number[] {
  return options.reduce<number[]>((indexes, option, index) => {
    if (!option.disabled) {
      indexes.push(index);
    }

    return indexes;
  }, []);
}

/**
 * Moves the active index forward or backward.
 * Navigation wraps around at both ends.
 */
export function getNextEnabledIndex(
  enabledIndexes: number[],
  activeIndex: number,
  direction: 1 | -1,
): number {
  if (enabledIndexes.length === 0) {
    return activeIndex;
  }

  const currentPosition = enabledIndexes.indexOf(activeIndex);

  const nextPosition =
    currentPosition === -1
      ? direction === 1
        ? 0
        : enabledIndexes.length - 1
      : (
          currentPosition +
          direction +
          enabledIndexes.length
        ) % enabledIndexes.length;

  return enabledIndexes[nextPosition];
}

/**
 * Moves the active index to the first or last enabled option.
 */
export function getBoundaryEnabledIndex(
  enabledIndexes: number[],
  boundary: "start" | "end",
): number {
  if (enabledIndexes.length === 0) {
    return -1;
  }

  return boundary === "start"
    ? enabledIndexes[0]
    : enabledIndexes[enabledIndexes.length - 1];
}
