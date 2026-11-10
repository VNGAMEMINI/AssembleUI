import { useLayoutEffect, useState } from "react";

import type { RefObject } from "react";

import { calculatePosition } from "../../../../core/utils";

import type { MenuProps } from "../Menu.types";

type MenuPosition = ReturnType<typeof calculatePosition>;
type MenuPlacement = NonNullable<MenuProps["placement"]>;

interface UseMenuPositionOptions {
  enabled: boolean;
  placement: MenuPlacement;
  itemsCount: number;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
}

function useMenuPosition({
  enabled,
  placement,
  itemsCount,
  triggerRef,
  menuRef,
}: UseMenuPositionOptions): MenuPosition {
  const [position, setPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const updatePosition = () => {
      const triggerElement = triggerRef.current;
      const menuElement = menuRef.current;

      if (!triggerElement || !menuElement) {
        return;
      }

      setPosition(
        calculatePosition(
          triggerElement.getBoundingClientRect(),
          menuElement.getBoundingClientRect(),
          {
            placement,
            offset: { y: 8 },
          },
        ),
      );
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [
    enabled,
    placement,
    itemsCount,
    triggerRef,
    menuRef,
  ]);

  return position;
}

export { useMenuPosition };
