import { useEffect } from "react";

import type { RefObject } from "react";

interface UseMenuDismissOptions {
  enabled: boolean;
  closeOnEscape: boolean;
  closeOnOutsideClick: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

function useMenuDismiss({
  enabled,
  closeOnEscape,
  closeOnOutsideClick,
  triggerRef,
  menuRef,
  onClose,
}: UseMenuDismissOptions): void {
  useEffect(() => {
    if (!enabled || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onClose();
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, closeOnEscape, onClose, triggerRef]);

  useEffect(() => {
    if (!enabled || !closeOnOutsideClick) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [
    enabled,
    closeOnOutsideClick,
    onClose,
    triggerRef,
    menuRef,
  ]);
}

export { useMenuDismiss };
