import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import type {
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
} from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function useDrawerFocus(
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>,
) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActiveElement =
      document.activeElement as HTMLElement | null;

    dialogRef.current?.focus();

    return () => {
      previousActiveElement?.focus();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements =
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    },
    [onKeyDown],
  );

  return {
    dialogRef,
    handleKeyDown,
  };
}
