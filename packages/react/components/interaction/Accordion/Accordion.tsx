import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from "react";

import { classNames } from "../../../core/utils";

import type { KeyboardEvent } from "react";

import type {
  AccordionItemProps,
  AccordionProps,
} from "./Accordion.types";

interface AccordionContextValue {
  openIds: string[];
  toggleItem: (id: string, disabled: boolean) => void;
}

const AccordionContext =
  createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "Accordion.Item must be used within Accordion.",
    );
  }

  return context;
}

const AccordionItem = forwardRef<
  HTMLElement,
  AccordionItemProps
>(
  (
    {
      id,
      title,
      disabled = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const { openIds, toggleItem } = useAccordionContext();

    const open = !disabled && openIds.includes(id);
    const triggerId = `${reactId}-trigger`;
    const panelId = `${reactId}-panel`;

    return (
      <section
        {...props}
        ref={ref}
        className={classNames(
          "aui-accordion__item",
          open && "aui-accordion__item--open",
          disabled && "aui-accordion__item--disabled",
          className,
        )}
      >
        <h3 className="aui-accordion__heading">
          <button
            type="button"
            id={triggerId}
            data-accordion-trigger=""
            aria-expanded={open}
            aria-controls={panelId}
            disabled={disabled}
            className="aui-accordion__trigger"
            onClick={() => toggleItem(id, disabled)}
          >
            <span className="aui-accordion__title">
              {title}
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
            aria-labelledby={triggerId}
            className="aui-accordion__panel"
          >
            {children}
          </div>
        )}
      </section>
    );
  },
);

AccordionItem.displayName = "Accordion.Item";

const AccordionRoot = forwardRef<
  HTMLDivElement,
  AccordionProps
>(
  (
    {
      children,
      multiple = false,
      openIds,
      defaultOpenIds = [],
      onOpenChange,
      onKeyDown,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = openIds !== undefined;

    const [internalOpenIds, setInternalOpenIds] =
      useState<string[]>(
        multiple ? defaultOpenIds : defaultOpenIds.slice(0, 1),
      );

    const currentOpenIds = isControlled
      ? openIds
      : internalOpenIds;

    const activeOpenIds = multiple
      ? currentOpenIds
      : currentOpenIds.slice(0, 1);

    const toggleItem = (
      id: string,
      disabled: boolean,
    ) => {
      if (disabled) {
        return;
      }

      const isOpen = activeOpenIds.includes(id);

      let nextOpenIds: string[];

      if (isOpen) {
        nextOpenIds = activeOpenIds.filter(
          (openId) => openId !== id,
        );
      } else if (multiple) {
        nextOpenIds = [...activeOpenIds, id];
      } else {
        nextOpenIds = [id];
      }

      if (!isControlled) {
        setInternalOpenIds(nextOpenIds);
      }

      onOpenChange?.(nextOpenIds);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLDivElement>,
    ) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const trigger = event.target.closest<HTMLButtonElement>(
        "[data-accordion-trigger]",
      );

      if (
        !trigger ||
        !event.currentTarget.contains(trigger) ||
        trigger.closest(".aui-accordion") !== event.currentTarget
      ) {
        return;
      }

      const triggers = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          "[data-accordion-trigger]:not(:disabled)",
        ),
      );

      const currentIndex = triggers.indexOf(trigger);

      if (currentIndex < 0 || triggers.length === 0) {
        return;
      }

      let nextIndex: number;

      switch (event.key) {
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % triggers.length;
          break;

        case "ArrowUp":
          nextIndex =
            (currentIndex - 1 + triggers.length) %
            triggers.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = triggers.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      triggers[nextIndex]?.focus();
    };

    const contextValue: AccordionContextValue = {
      openIds: activeOpenIds,
      toggleItem,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          {...props}
          ref={ref}
          className={classNames(
            "aui-accordion",
            className,
          )}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

AccordionRoot.displayName = "Accordion";

const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
});

export { Accordion };
