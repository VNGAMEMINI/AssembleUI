import type { AccordionItem } from "../Accordion.types";

/**
 * Removes IDs that do not belong to enabled items.
 * In single mode, preserves only the first valid ID.
 */
export function normalizeOpenIds(
  items: AccordionItem[],
  openIds: string[],
  multiple: boolean,
): string[] {
  const validIds = new Set(
    items
      .filter((item) => !item.disabled)
      .map((item) => item.id),
  );

  const normalizedIds = openIds.filter((id) =>
    validIds.has(id),
  );

  return multiple
    ? normalizedIds
    : normalizedIds.slice(0, 1);
}

/**
 * Returns enabled items in their original order.
 */
export function getEnabledItems(
  items: AccordionItem[],
): AccordionItem[] {
  return items.filter((item) => !item.disabled);
}

/**
 * Returns the next or previous enabled item.
 * Navigation wraps around at both ends.
 */
export function getAdjacentEnabledItem(
  items: AccordionItem[],
  currentItemId: string,
  direction: 1 | -1,
): AccordionItem | undefined {
  const enabledItems = getEnabledItems(items);

  if (enabledItems.length === 0) {
    return undefined;
  }

  const currentIndex = enabledItems.findIndex(
    (item) => item.id === currentItemId,
  );

  const nextIndex =
    currentIndex === -1
      ? direction === 1
        ? 0
        : enabledItems.length - 1
      : (
          currentIndex +
          direction +
          enabledItems.length
        ) % enabledItems.length;

  return enabledItems[nextIndex];
}

/**
 * Returns the first or last enabled item.
 */
export function getBoundaryEnabledItem(
  items: AccordionItem[],
  boundary: "start" | "end",
): AccordionItem | undefined {
  const enabledItems = getEnabledItems(items);

  if (enabledItems.length === 0) {
    return undefined;
  }

  return boundary === "start"
    ? enabledItems[0]
    : enabledItems[enabledItems.length - 1];
}
