import { createElement } from "react";
import { describe, expect, it } from "vitest";

import type { ComboboxOption } from "../Combobox.types";
import {
  filterComboboxOptions,
  findSelectedOption,
  getBoundaryEnabledIndex,
  getEnabledOptionIndexes,
  getNextEnabledIndex,
  getOptionLabel,
} from "./_combobox.utils";

const options: ComboboxOption[] = [
  { id: "first", label: "First" },
  { id: "disabled", label: "Disabled", disabled: true },
  { id: "last", label: "Last" },
];

describe("Combobox utilities", () => {
  it("returns only string labels for text matching", () => {
    expect(getOptionLabel(options[0])).toBe("First");
    expect(
      getOptionLabel({
        id: "rich",
        label: createElement("strong", null, "Rich"),
      }),
    ).toBe("");
    expect(getOptionLabel(undefined)).toBe("");
  });

  it("finds the selected option by id", () => {
    expect(findSelectedOption(options, "last")).toBe(options[2]);
    expect(findSelectedOption(options, "missing")).toBeUndefined();
  });

  it("filters using a trimmed, case-insensitive query", () => {
    expect(filterComboboxOptions(options, "  fIrSt ")).toEqual([options[0]]);
    expect(filterComboboxOptions(options, " ")).toBe(options);
  });

  it("returns enabled option indexes and wraps navigation", () => {
    const enabledIndexes = getEnabledOptionIndexes(options);

    expect(enabledIndexes).toEqual([0, 2]);
    expect(getNextEnabledIndex(enabledIndexes, 0, 1)).toBe(2);
    expect(getNextEnabledIndex(enabledIndexes, 2, 1)).toBe(0);
    expect(getNextEnabledIndex(enabledIndexes, 0, -1)).toBe(2);
    expect(getNextEnabledIndex(enabledIndexes, 1, 1)).toBe(0);
    expect(getNextEnabledIndex([], 1, 1)).toBe(1);
  });

  it("returns the first or last enabled index", () => {
    const enabledIndexes = getEnabledOptionIndexes(options);

    expect(getBoundaryEnabledIndex(enabledIndexes, "start")).toBe(0);
    expect(getBoundaryEnabledIndex(enabledIndexes, "end")).toBe(2);
    expect(getBoundaryEnabledIndex([], "start")).toBe(-1);
  });
});