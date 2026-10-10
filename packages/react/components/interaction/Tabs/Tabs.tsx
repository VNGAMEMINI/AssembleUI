import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { classNames } from "../../../core/utils";

import type {
  KeyboardEvent,
} from "react";

import type {
  TabsItem,
  TabsProps,
} from "./Tabs.types";

const Tabs = forwardRef<
  HTMLDivElement,
  TabsProps
>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();

    const enabledItems = items.filter(
      (item) => !item.disabled,
    );

    const initialValue =
      defaultValue &&
      enabledItems.some(
        (item) =>
          item.id === defaultValue,
      )
        ? defaultValue
        : enabledItems[0]?.id;

    const [internalValue, setInternalValue] =
      useState<string | undefined>(
        initialValue,
      );

    const isControlled =
      value !== undefined;

    const activeValue = isControlled
      ? value
      : internalValue;

    const activeItem = items.find(
      (item) =>
        item.id === activeValue &&
        !item.disabled,
    );

    const tabRefs =
      useRef<
        Record<
          string,
          HTMLButtonElement | null
        >
      >({});

    const setValue = (
      nextValue: string,
    ) => {
      if (
        !enabledItems.some(
          (item) =>
            item.id === nextValue,
        )
      ) {
        return;
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    };

    const focusItem = (
      item: TabsItem | undefined,
    ) => {
      if (!item || item.disabled) {
        return;
      }

      setValue(item.id);

      requestAnimationFrame(() => {
        tabRefs.current[
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
          focusedElement.dataset.tabId;

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
          item.id === activeValue,
      );
    };

    const focusNext = () => {
      if (!enabledItems.length) {
        return;
      }

      const currentIndex =
        getActiveIndex();

      const nextIndex =
        currentIndex >=
        enabledItems.length - 1
          ? 0
          : currentIndex + 1;

      focusItem(
        enabledItems[nextIndex],
      );
    };

    const focusPrevious = () => {
      if (!enabledItems.length) {
        return;
      }

      const currentIndex =
        getActiveIndex();

      const previousIndex =
        currentIndex <= 0
          ? enabledItems.length - 1
          : currentIndex - 1;

      focusItem(
        enabledItems[previousIndex],
      );
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          focusNext();
          break;

        case "ArrowLeft":
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

        default:
          break;
      }
    };

    useEffect(() => {
      if (
        activeValue &&
        enabledItems.some(
          (item) =>
            item.id === activeValue,
        )
      ) {
        return;
      }

      const nextValue =
        enabledItems[0]?.id;

      if (nextValue) {
        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      }
    }, [
      activeValue,
      enabledItems,
      isControlled,
      onValueChange,
    ]);

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          "aui-tabs",
          className,
        )}
      >
        <div
          role="tablist"
          className="aui-tabs__list"
          onKeyDown={handleKeyDown}
        >
          {items.map((item) => {
            const tabId =
              `${reactId}-tab-${item.id}`;

            const panelId =
              `${reactId}-panel-${item.id}`;

            const isActive =
              item.id === activeItem?.id;

            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[
                    item.id
                  ] = node;
                }}
                type="button"
                role="tab"
                id={tabId}
                data-tab-id={item.id}
                aria-selected={isActive}
                aria-controls={panelId}
                disabled={item.disabled}
                tabIndex={
                  isActive ? 0 : -1
                }
                className={classNames(
                  "aui-tabs__tab",
                  isActive &&
                    "aui-tabs__tab--active",
                )}
                onClick={() => {
                  setValue(item.id);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {activeItem && (
          <div
            id={`${reactId}-panel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`${reactId}-tab-${activeItem.id}`}
            tabIndex={0}
            className="aui-tabs__panel"
          >
            {activeItem.content}
          </div>
        )}
      </div>
    );
  },
);

Tabs.displayName = "Tabs";

export { Tabs };
