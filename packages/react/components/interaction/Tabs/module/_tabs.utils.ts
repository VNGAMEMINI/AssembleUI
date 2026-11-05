import type { TabsItem } from "../Tabs.types";

export function getEnabledTabs(
  items: readonly TabsItem[],
): TabsItem[] {
  return items.filter((item) => !item.disabled);
}

export function getInitialTabValue(
  enabledItems: readonly TabsItem[],
  defaultValue?: string,
): string | undefined {
  if (
    defaultValue &&
    enabledItems.some((item) => item.id === defaultValue)
  ) {
    return defaultValue;
  }

  return enabledItems[0]?.id;
}

export function isEnabledTab(
  enabledItems: readonly TabsItem[],
  id: string,
): boolean {
  return enabledItems.some((item) => item.id === id);
}

export function getAdjacentTab(
  enabledItems: readonly TabsItem[],
  currentIndex: number,
  direction: 1 | -1,
): TabsItem | undefined {
  const length = enabledItems.length;

  if (length === 0) {
    return undefined;
  }

  const nextIndex =
    direction === 1
      ? currentIndex >= length - 1
        ? 0
        : currentIndex + 1
      : currentIndex <= 0
        ? length - 1
        : currentIndex - 1;

  return enabledItems[nextIndex];
}

export function getBoundaryTab(
  enabledItems: readonly TabsItem[],
  boundary: "first" | "last",
): TabsItem | undefined {
  if (boundary === "first") {
    return enabledItems[0];
  }

  return enabledItems[enabledItems.length - 1];
}
