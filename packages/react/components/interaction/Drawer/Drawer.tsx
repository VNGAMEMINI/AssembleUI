import {
  forwardRef,
  useEffect,
  useId,
} from "react";
import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import { classNames } from "../../../core/utils";

import type { DrawerProps } from "./Drawer.types";

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      title,
      description,
      children,
      footer,
      side = "right",
      closeLabel = "Close",
      closeOnBackdrop = true,
      closeOnEscape = true,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();

    const idSuffix = generatedId.replace(/:/g, "");

    const titleId = `aui-drawer-title-${idSuffix}`;
    const descriptionId = `aui-drawer-description-${idSuffix}`;

    const { isOpen, onClose } = useDisclosure({
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
      if (!isOpen) {
        return;
      }

      const previousOverflow = document.body.style.overflow;

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }

    const drawer = (
      <div
        className="aui-drawer"
        role="presentation"
        onMouseDown={(event) => {
          if (
            closeOnBackdrop &&
            event.target === event.currentTarget
          ) {
            onClose();
          }
        }}
      >
        <div
          {...props}
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={
            description != null
              ? descriptionId
              : undefined
          }
          data-side={side}
          className={classNames(
            "aui-drawer__panel",
            className,
          )}
        >
          <header className="aui-drawer__header">
            <div className="aui-drawer__heading">
              <h2
                id={titleId}
                className="aui-drawer__title"
              >
                {title}
              </h2>

              {description != null && (
                <div
                  id={descriptionId}
                  className="aui-drawer__description"
                >
                  {description}
                </div>
              )}
            </div>

            <button
              type="button"
              className="aui-drawer__close"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="aui-drawer__body">
            {children}
          </div>

          {footer != null && (
            <footer className="aui-drawer__footer">
              {footer}
            </footer>
          )}
        </div>
      </div>
    );

    return createPortal(drawer, document.body);
  },
);

Drawer.displayName = "Drawer";

export { Drawer };
