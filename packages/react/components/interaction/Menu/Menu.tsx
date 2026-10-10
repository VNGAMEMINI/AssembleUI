import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { classNames } from "../../../core/utils";

import type {
  KeyboardEvent,
} from "react";

import type {
  MenuItem,
  MenuProps,
} from "./Menu.types";

const Menu = forwardRef<
  HTMLDivElement,
  MenuProps
>(
  (
    {
      items,
      defaultActiveId,
      loopFocus = true,
      onItemSelect,
      className,
      ...props
    },
    ref,
  ) => {
    const menuRef =
      useRef<HTMLDivElement | null>(null);

    const itemRefs =
      useRef<Record<string, HTMLButtonElement | null>>(
        {},
      );

    const enabledItems = items.filter(
      (item) => !item.disabled,
    );

    const initialActiveId =
      defaultActiveId &&
      enabledItems.some(
        (item) =>
          item.id === defaultActiveId,
      )
        ? defaultActiveId
        : enabledItems[0]?.id;

    const [activeId, setActiveId] =
      useState<string | undefined>(
        initialActiveId,
      );

    const setMenuRef = (
      node: HTMLDivElement | null,
    ) => {
      menuRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const focusItem = (
      item: MenuItem | undefined,
    ) => {
      if (!item || item.disabled) {
        return;
      }

      setActiveId(item.id);

      requestAnimationFrame(() => {
        itemRefs.current[
          item.id
        ]?.focus();
      });
    };

    const getActiveIndex = () => {
      const focusedElement =
        document.activeElement;

      if (
        focusedElement instanceof
        HTMLButtonElement
      ) {
        const focusedId =
          focusedElement.dataset.menuItemId;

        const focusedIndex =
          enabledItems.findIndex(
            (item) =>
              item.id === focusedId,
          );

        if (focusedIndex >= 0) {
          return focusedIndex;
        }
      }

      return enabledItems.findIndex(
        (item) =>
          item.id === activeId,
      );
    };

    const focusNext = () => {
      if (!enabledItems.length) {
        return;
      }

      const currentIndex =
        getActiveIndex();

      if (
        currentIndex ===
        enabledItems.length - 1
      ) {
        if (loopFocus) {
          focusItem(enabledItems[0]);
        }

        return;
      }

      focusItem(
        enabledItems[
          currentIndex + 1
        ],
      );
    };

    const focusPrevious = () => {
      if (!enabledItems.length) {
        return;
      }

      const currentIndex =
        getActiveIndex();

      if (
        currentIndex <= 0
      ) {
        if (loopFocus) {
          focusItem(
            enabledItems[
              enabledItems.length - 1
            ],
          );
        }

        return;
      }

      focusItem(
        enabledItems[
          currentIndex - 1
        ],
      );
    };

    const selectItem = (
      item: MenuItem,
    ) => {
      if (item.disabled) {
        return;
      }

      item.onSelect?.();
      onItemSelect?.(item);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusNext();
          break;

        case "ArrowUp":
          event.preventDefault();
          focusPrevious();
          break;

        case "Home":
          event.preventDefault();
          focusItem(enabledItems[0]);
          break;

        case "End":
          event.preventDefault();
          focusItem(
            enabledItems[
              enabledItems.length - 1
            ],
          );
          break;

        case "Enter":
        case " ":
          if (
            event.target instanceof
            HTMLButtonElement
          ) {
            const itemId =
              event.target.dataset.menuItemId;

            const item = items.find(
              (candidate) =>
                candidate.id === itemId,
            );

            if (item) {
              event.preventDefault();
              selectItem(item);
            }
          }
          break;

        case "Escape":
          event.preventDefault();
          menuRef.current?.focus();
          break;

        default:
          break;
      }
    };

    useEffect(() => {
      if (
        activeId &&
        enabledItems.some(
          (item) =>
            item.id === activeId,
        )
      ) {
        return;
      }

      setActiveId(
        enabledItems[0]?.id,
      );
    }, [activeId, items]);

    return (
      <div
        {...props}
        ref={setMenuRef}
        role="menu"
        tabIndex={-1}
        className={classNames(
          "aui-menu",
          className,
        )}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              itemRefs.current[
                item.id
              ] = node;
            }}
            type="button"
            role="menuitem"
            data-menu-item-id={item.id}
            disabled={item.disabled}
            tabIndex={
              item.id === activeId &&
              !item.disabled
                ? 0
                : -1
            }
            className="aui-menu__item"
            onFocus={() => {
              if (!item.disabled) {
                setActiveId(item.id);
              }
            }}
            onClick={() => {
              selectItem(item);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  },
);

Menu.displayName = "Menu";

export { Menu };
