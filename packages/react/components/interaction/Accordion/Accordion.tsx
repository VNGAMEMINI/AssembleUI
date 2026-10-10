import {
  forwardRef,
  useEffect,
  useId,
  useState,
} from "react";

import { classNames } from "../../../core/utils";

import type {
  KeyboardEvent,
} from "react";

import type {
  AccordionItem,
  AccordionProps,
} from "./Accordion.types";

const Accordion = forwardRef<
  HTMLDivElement,
  AccordionProps
>(
  (
    {
      items,
      multiple = false,
      openIds,
      defaultOpenIds = [],
      onOpenChange,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();

    const isControlled =
      openIds !== undefined;

    const [internalOpenIds, setInternalOpenIds] =
      useState<string[]>(
        defaultOpenIds.filter((id) =>
          items.some(
            (item) =>
              item.id === id &&
              !item.disabled,
          ),
        ),
      );

    const activeOpenIds =
      isControlled
        ? openIds
        : internalOpenIds;

    const setOpenIds = (
      nextOpenIds: string[],
    ) => {
      if (!isControlled) {
        setInternalOpenIds(
          nextOpenIds,
        );
      }

      onOpenChange?.(nextOpenIds);
    };

    const isOpen = (id: string) =>
      activeOpenIds.includes(id);

    const toggleItem = (
      item: AccordionItem,
    ) => {
      if (item.disabled) {
        return;
      }

      const currentlyOpen =
        isOpen(item.id);

      if (currentlyOpen) {
        setOpenIds(
          activeOpenIds.filter(
            (id) =>
              id !== item.id,
          ),
        );

        return;
      }

      if (multiple) {
        setOpenIds([
          ...activeOpenIds,
          item.id,
        ]);

        return;
      }

      setOpenIds([item.id]);
    };

    const getItemIndex = (
      eventTarget: EventTarget | null,
    ) => {
      if (
        !(eventTarget instanceof
          HTMLButtonElement)
      ) {
        return -1;
      }

      const itemId =
        eventTarget.dataset
          .accordionItemId;

      return items.findIndex(
        (item) =>
          item.id === itemId,
      );
    };

    const getEnabledItems = () =>
      items.filter(
        (item) => !item.disabled,
      );

    const focusItem = (
      item: AccordionItem | undefined,
    ) => {
      if (!item || item.disabled) {
        return;
      }

      requestAnimationFrame(() => {
        document
          .querySelector<HTMLButtonElement>(
            `[data-accordion-item-id="${CSS.escape(
              item.id,
            )}"]`,
          )
          ?.focus();
      });
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
      const currentIndex =
        getItemIndex(event.target);

      if (currentIndex < 0) {
        return;
      }

      const enabledItems =
        getEnabledItems();

      if (!enabledItems.length) {
        return;
      }

      const currentItem =
        items[currentIndex];

      const enabledIndex =
        enabledItems.findIndex(
          (item) =>
            item.id ===
            currentItem.id,
        );

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          const nextIndex =
            enabledIndex ===
            enabledItems.length - 1
              ? 0
              : enabledIndex + 1;

          focusItem(
            enabledItems[nextIndex],
          );

          break;
        }

        case "ArrowUp": {
          event.preventDefault();

          const previousIndex =
            enabledIndex <= 0
              ? enabledItems.length - 1
              : enabledIndex - 1;

          focusItem(
            enabledItems[
              previousIndex
            ],
          );

          break;
        }

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
      const validIds = new Set(
        items
          .filter(
            (item) =>
              !item.disabled,
          )
          .map((item) => item.id),
      );

      const normalizedIds =
        activeOpenIds.filter((id) =>
          validIds.has(id),
        );

      if (!multiple) {
        const firstId =
          normalizedIds[0];

        const nextIds = firstId
          ? [firstId]
          : [];

        if (
          nextIds.length !==
            activeOpenIds.length ||
          nextIds.some(
            (id, index) =>
              id !==
              activeOpenIds[index],
          )
        ) {
          if (!isControlled) {
            setInternalOpenIds(
              nextIds,
            );
          }
        }

        return;
      }

      if (
        normalizedIds.length !==
          activeOpenIds.length
      ) {
        if (!isControlled) {
          setInternalOpenIds(
            normalizedIds,
          );
        }
      }
    }, [
      activeOpenIds,
      isControlled,
      items,
      multiple,
    ]);

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          "aui-accordion",
          className,
        )}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const open =
            isOpen(item.id);

          const triggerId =
            `${reactId}-trigger-${item.id}`;

          const panelId =
            `${reactId}-panel-${item.id}`;

          return (
            <section
              key={item.id}
              className={classNames(
                "aui-accordion__item",
                open &&
                  "aui-accordion__item--open",
                item.disabled &&
                  "aui-accordion__item--disabled",
              )}
            >
              <h3 className="aui-accordion__heading">
                <button
                  type="button"
                  id={triggerId}
                  data-accordion-item-id={
                    item.id
                  }
                  aria-expanded={open}
                  aria-controls={panelId}
                  disabled={
                    item.disabled
                  }
                  className="aui-accordion__trigger"
                  onClick={() => {
                    toggleItem(item);
                  }}
                >
                  <span className="aui-accordion__title">
                    {item.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className="aui-accordion__icon"
                  >
                    +
                  </span>
                </button>
              </h3>

              {open && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={
                    triggerId
                  }
                  className="aui-accordion__panel"
                >
                  {item.content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";

export { Accordion };
