import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import {
  calculatePosition,
  classNames,
} from "../../../core/utils";

import type {
  ComponentPropsWithoutRef,
  ReactElement,
} from "react";

import type {
  DropdownItem,
  DropdownProps,
} from "./Dropdown.types";

type DropdownTriggerElement = ReactElement<
  ComponentPropsWithoutRef<"button">
>;

const Dropdown = forwardRef<
  HTMLDivElement,
  DropdownProps
>(
  (
    {
      trigger,
      items,
      open,
      defaultOpen = false,
      onOpenChange,
      placement = "bottom",
      closeOnEscape = true,
      closeOnOutsideClick = true,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();

    const dropdownId = `aui-dropdown-${generatedId.replace(
      /:/g,
      "",
    )}`;

    const triggerRef = useRef<HTMLElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [position, setPosition] = useState({
      top: 0,
      left: 0,
    });

    const {
      isOpen,
      onOpen,
      onClose,
    } = useDisclosure({
      open,
      defaultIsOpen: defaultOpen,
      onOpenChange,
    });

    useEffect(() => {
      if (!isOpen || !closeOnEscape) {
        return;
      }

      const handleKeyDown = (
        event: KeyboardEvent,
      ) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener(
        "keydown",
        handleKeyDown,
      );

      return () => {
        document.removeEventListener(
          "keydown",
          handleKeyDown,
        );
      };
    }, [
      isOpen,
      closeOnEscape,
      onClose,
    ]);

    useEffect(() => {
      if (
        !isOpen ||
        !closeOnOutsideClick
      ) {
        return;
      }

      const handlePointerDown = (
        event: PointerEvent,
      ) => {
        const target = event.target;

        if (!(target instanceof Node)) {
          return;
        }

        const triggerElement =
          triggerRef.current;

        const dropdownElement =
          dropdownRef.current;

        if (
          triggerElement?.contains(target) ||
          dropdownElement?.contains(target)
        ) {
          return;
        }

        onClose();
      };

      document.addEventListener(
        "pointerdown",
        handlePointerDown,
      );

      return () => {
        document.removeEventListener(
          "pointerdown",
          handlePointerDown,
        );
      };
    }, [
      isOpen,
      closeOnOutsideClick,
      onClose,
    ]);

    useLayoutEffect(() => {
      if (!isOpen) {
        return;
      }

      const updatePosition = () => {
        const triggerElement =
          triggerRef.current;

        const dropdownElement =
          dropdownRef.current;

        if (
          !triggerElement ||
          !dropdownElement
        ) {
          return;
        }

        const nextPosition =
          calculatePosition(
            triggerElement.getBoundingClientRect(),
            dropdownElement.getBoundingClientRect(),
            {
              placement,
              offset: {
                y: 8,
              },
            },
          );

        setPosition(nextPosition);
      };

      updatePosition();

      window.addEventListener(
        "resize",
        updatePosition,
      );

      window.addEventListener(
        "scroll",
        updatePosition,
        true,
      );

      return () => {
        window.removeEventListener(
          "resize",
          updatePosition,
        );

        window.removeEventListener(
          "scroll",
          updatePosition,
          true,
        );
      };
    }, [
      isOpen,
      placement,
      items.length,
    ]);

    const handleItemSelect = (
      item: DropdownItem,
    ) => {
      if (item.disabled) {
        return;
      }

      item.onSelect?.();
      onClose();
    };

    if (!isValidElement(trigger)) {
      return null;
    }

    const typedTrigger =
      trigger as DropdownTriggerElement;

    const triggerElement =
      cloneElement(
        typedTrigger,
        {
          "aria-expanded": isOpen,
          "aria-haspopup": "menu",
          "aria-controls": isOpen
            ? dropdownId
            : undefined,

          onClick: (event) => {
            triggerRef.current =
              event.currentTarget;

            typedTrigger.props.onClick?.(
              event,
            );

            if (event.defaultPrevented) {
              return;
            }

            if (isOpen) {
              onClose();
            } else {
              onOpen();
            }
          },
        },
      );

    const dropdown = isOpen ? (
      <div
        {...props}
        ref={(node) => {
          dropdownRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        id={dropdownId}
        role="menu"
        data-placement={placement}
        className={classNames(
          "aui-dropdown",
          className,
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            className="aui-dropdown__item"
            onClick={() => {
              handleItemSelect(item);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    ) : null;

    return (
      <>
        {triggerElement}

        {dropdown != null &&
          createPortal(
            dropdown,
            document.body,
          )}
      </>
    );
  },
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
