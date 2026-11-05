import {
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  useDisclosure,
} from "../../../core/hooks";

import {
  classNames,
  mergeRefs,
} from "../../../core/utils";

import type {
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

import type {
  MenuItem,
  MenuProps,
} from "./Menu.types";

import {
  getAdjacentMenuItem,
  getBoundaryMenuItem,
  getEnabledMenuItems,
  getInitialActiveId,
} from "./module/_menu.utils";
import { useMenuDismiss } from "./module/_useMenuDismiss";
import { useMenuPosition } from "./module/_useMenuPosition";

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items,
      trigger,
      defaultActiveId,
      loopFocus = true,
      open,
      defaultOpen = false,
      onOpenChange,
      placement = "bottom",
      closeOnEscape = true,
      closeOnOutsideClick = true,
      onItemSelect,
      onKeyDown,
      className,
      id,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const menuId = id ?? `aui-menu-${generatedId.replace(/:/g, "")}`;

    const hasTrigger = trigger != null;

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const pendingFocusRef = useRef<"first" | "last" | null>(null);

    const itemRefs = useRef<
      Record<string, HTMLButtonElement | null>
    >({});

    const {
      isOpen,
      onOpen,
      onClose,
      onToggle,
    } = useDisclosure({
      open: hasTrigger ? open : undefined,
      defaultIsOpen: hasTrigger && defaultOpen,
      onOpenChange,
    });

    useMenuDismiss({
      enabled: hasTrigger && isOpen,
      closeOnEscape,
      closeOnOutsideClick,
      triggerRef,
      menuRef,
      onClose,
    });

    const position = useMenuPosition({
      enabled: hasTrigger && isOpen,
      placement,
      itemsCount: items.length,
      triggerRef,
      menuRef,
    });

    const enabledItems = getEnabledMenuItems(items);

    const initialActiveId = getInitialActiveId(
      enabledItems,
      defaultActiveId,
    );

    const [activeId, setActiveId] = useState<string | undefined>(
      initialActiveId,
    );

    const setMenuRef = (node: HTMLDivElement | null) => {
      menuRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const focusItem = (item: MenuItem | undefined) => {
      if (!item || item.disabled) {
        return;
      }

      setActiveId(item.id);

      requestAnimationFrame(() => {
        itemRefs.current[item.id]?.focus();
      });
    };

    const getActiveIndex = () => {
      const focusedElement = document.activeElement;

      if (focusedElement instanceof HTMLButtonElement) {
        const focusedId = focusedElement.dataset.menuItemId;

        const focusedIndex = enabledItems.findIndex(
          (item) => item.id === focusedId,
        );

        if (focusedIndex >= 0) {
          return focusedIndex;
        }
      }

      return enabledItems.findIndex(
        (item) => item.id === activeId,
      );
    };

    const focusNext = () => {
      focusItem(
        getAdjacentMenuItem(
          enabledItems,
          getActiveIndex(),
          1,
          loopFocus,
        ),
      );
    };

    const focusPrevious = () => {
      focusItem(
        getAdjacentMenuItem(
          enabledItems,
          getActiveIndex(),
          -1,
          loopFocus,
        ),
      );
    };

    const selectItem = (item: MenuItem) => {
      if (item.disabled) {
        return;
      }

      item.onSelect?.();
      onItemSelect?.(item);

      if (hasTrigger) {
        onClose();
        triggerRef.current?.focus();
      }
    };

    const handleKeyDown = (
      event: ReactKeyboardEvent<HTMLDivElement>,
    ) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

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
          focusItem(
            getBoundaryMenuItem(enabledItems, "first"),
          );
          break;

        case "End":
          event.preventDefault();
          focusItem(
            getBoundaryMenuItem(enabledItems, "last"),
          );
          break;

        case "Enter":
        case " ":
          if (event.target instanceof HTMLButtonElement) {
            const itemId = event.target.dataset.menuItemId;

            const item = items.find(
              (candidate) => candidate.id === itemId,
            );

            if (item) {
              event.preventDefault();
              selectItem(item);
            }
          }
          break;

        case "Escape":
          if (!hasTrigger) {
            event.preventDefault();
            menuRef.current?.focus();
          }
          break;

        default:
          break;
      }
    };

    // Keep the active item valid when the item collection changes.
    useEffect(() => {
      if (
        activeId &&
        enabledItems.some((item) => item.id === activeId)
      ) {
        return;
      }

      setActiveId(enabledItems[0]?.id);
    }, [activeId, items]);

    // Apply keyboard-triggered focus after the popup has mounted.
    useEffect(() => {
      if (!isOpen || !pendingFocusRef.current) {
        return;
      }

      const boundary = pendingFocusRef.current;
      pendingFocusRef.current = null;

      focusItem(
        getBoundaryMenuItem(
          enabledItems,
          boundary,
        ),
      );
    }, [isOpen]);

    const triggerElement = hasTrigger
      ? cloneElement(trigger, {
          ref: mergeRefs(triggerRef, trigger.props.ref ?? null),
          "aria-haspopup": "menu",
          "aria-expanded": isOpen,
          "aria-controls": isOpen ? menuId : undefined,

          onClick: (event) => {
            trigger.props.onClick?.(event);

            if (event.defaultPrevented) {
              return;
            }

            triggerRef.current = event.currentTarget;
            onToggle();
          },

          onKeyDown: (event) => {
            trigger.props.onKeyDown?.(event);

            if (event.defaultPrevented) {
              return;
            }

            if (event.key === "ArrowDown") {
              event.preventDefault();
              triggerRef.current = event.currentTarget;
              if (isOpen) {
                focusItem(enabledItems[0]);
              } else {
                pendingFocusRef.current = "first";
                onOpen();
              }
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              triggerRef.current = event.currentTarget;
              if (isOpen) {
                focusItem(enabledItems[enabledItems.length - 1]);
              } else {
                pendingFocusRef.current = "last";
                onOpen();
              }
            }
          },
        })
      : null;

    const menuElement = (
      <div
        {...props}
        ref={setMenuRef}
        id={menuId}
        role="menu"
        tabIndex={-1}
        data-placement={hasTrigger ? placement : undefined}
        className={classNames(
          "aui-menu",
          hasTrigger && "aui-menu--popup",
          className,
        )}
        style={
          hasTrigger
            ? {
                ...style,
                top: position.top,
                left: position.left,
              }
            : style
        }
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              itemRefs.current[item.id] = node;
            }}
            type="button"
            role="menuitem"
            data-menu-item-id={item.id}
            disabled={item.disabled}
            tabIndex={
              item.id === activeId && !item.disabled
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

    if (!hasTrigger) {
      return menuElement;
    }

    return (
      <>
        {triggerElement}

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(menuElement, document.body)}
      </>
    );
  },
);

Menu.displayName = "Menu";

export { Menu };
