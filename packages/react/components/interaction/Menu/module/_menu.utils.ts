import type { MenuItem } from "../Menu.types";

export type MenuDirection = 1 | -1;
export type MenuBoundary = "first" | "last";

export const getEnabledMenuItems = (
  items: MenuItem[],
): MenuItem[] => items.filter((item) => !item.disabled);

export const getInitialActiveId = (
  enabledItems: MenuItem[],
  defaultActiveId?: string,
): string | undefined => {
  if (
    defaultActiveId &&
    enabledItems.some((item) => item.id === defaultActiveId)
  ) {
    return defaultActiveId;
  }

  return enabledItems[0]?.id;
};

export const getAdjacentMenuItem = (
  items: MenuItem[],
  currentIndex: number,
  direction: MenuDirection,
  loopFocus: boolean,
): MenuItem | undefined => {
  if (!items.length) {
    return undefined;
  }

  if (direction === 1) {
    if (currentIndex >= items.length - 1) {
      return loopFocus ? items[0] : undefined;
    }

    return items[currentIndex + 1];
  }

  if (currentIndex <= 0) {
    return loopFocus ? items[items.length - 1] : undefined;
  }

  return items[currentIndex - 1];
};

export const getBoundaryMenuItem = (
  items: MenuItem[],
  boundary: MenuBoundary,
): MenuItem | undefined => {
  if (boundary === "first") {
    return items[0];
  }

  return items[items.length - 1];
};
