import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import {
  calculatePosition,
  classNames,
} from "../../../core/utils";

import type { ComponentPropsWithoutRef, ReactElement } from "react";

import type { PopoverProps } from "./Popover.types";

type PopoverTriggerElement = ReactElement<
  ComponentPropsWithoutRef<"button">
>;

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      trigger,
      children,
      placement = "bottom",
      closeOnEscape = true,
      closeOnOutsideClick = true,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const popoverId = `aui-popover-${generatedId.replace(
      /:/g,
      "",
    )}`;

    const triggerRef = useRef<HTMLElement | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure({
      open,
      defaultIsOpen: defaultOpen,
      onOpenChange,
    });

    useEffect(() => {
      if (!isOpen || !closeOnEscape) {
        return;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener(
          "keydown",
          handleKeyDown,
        );
      };
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
      if (!isOpen || !closeOnOutsideClick) {
        return;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target;

        if (!(target instanceof Node)) {
          return;
        }

        const triggerElement = triggerRef.current;
        const popoverElement = document.getElementById(
          popoverId,
        );

        if (
          triggerElement?.contains(target) ||
          popoverElement?.contains(target)
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
      popoverId,
    ]);

    if (!isValidElement(trigger)) {
      return null;
    }

    const typedTrigger =
      trigger as PopoverTriggerElement;

    const triggerElement = cloneElement(
      typedTrigger,
      {
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        "aria-controls": isOpen
          ? popoverId
          : undefined,
        onClick: (event) => {
          triggerRef.current = event.currentTarget;

          typedTrigger.props.onClick?.(event);

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

    const popover = isOpen ? (
      <div
        {...props}
        ref={ref}
        id={popoverId}
        role="dialog"
        data-placement={placement}
        className={classNames(
          "aui-popover",
          className,
        )}
      >
        {children}
      </div>
    ) : null;

    return (
      <>
        {triggerElement}
        {popover != null &&
          createPortal(popover, document.body)}
      </>
    );
  },
);

Popover.displayName = "Popover";

export { Popover };
