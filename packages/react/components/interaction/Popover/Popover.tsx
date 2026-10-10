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
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const [position, setPosition] = useState({
      top: 0,
      left: 0,
    });

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
        const popoverElement = popoverRef.current;

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
    ]);

    useLayoutEffect(() => {
      if (!isOpen) {
        return;
      }

      const updatePosition = () => {
        const triggerElement = triggerRef.current;
        const popoverElement = popoverRef.current;

        if (
          !triggerElement ||
          !popoverElement
        ) {
          return;
        }

        const nextPosition = calculatePosition(
          triggerElement.getBoundingClientRect(),
          popoverElement.getBoundingClientRect(),
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
    }, [isOpen, placement]);

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
          triggerRef.current =
            event.currentTarget;

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
        ref={(node) => {
          popoverRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        id={popoverId}
        role="dialog"
        data-placement={placement}
        className={classNames(
          "aui-popover",
          className,
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {children}
      </div>
    ) : null;

    return (
      <>
        {triggerElement}

        {popover != null &&
          createPortal(
            popover,
            document.body,
          )}
      </>
    );
  },
);

Popover.displayName = "Popover";

export { Popover };
