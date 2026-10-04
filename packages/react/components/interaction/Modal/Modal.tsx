import {
  forwardRef,
  useEffect,
  useId,
} from "react";
import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import { classNames } from "../../../core/utils";

import type { ModalProps } from "./Modal.types";

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      title,
      description,
      children,
      footer,
      closeLabel = "Close",
      closeOnBackdrop = true,
      closeOnEscape = true,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const titleId = `aui-modal-title-${generatedId.replace(/:/g, "")}`;
    const descriptionId = `aui-modal-description-${generatedId.replace(
      /:/g,
      "",
    )}`;

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
        document.removeEventListener("keydown", handleKeyDown);
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

    const modal = (
      <div
        className="aui-modal"
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
            description != null ? descriptionId : undefined
          }
          className={classNames("aui-modal__dialog", className)}
        >
          <header className="aui-modal__header">
            <div className="aui-modal__heading">
              <h2
                id={titleId}
                className="aui-modal__title"
              >
                {title}
              </h2>

              {description != null && (
                <div
                  id={descriptionId}
                  className="aui-modal__description"
                >
                  {description}
                </div>
              )}
            </div>

            <button
              type="button"
              className="aui-modal__close"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="aui-modal__body">
            {children}
          </div>

          {footer != null && (
            <footer className="aui-modal__footer">
              {footer}
            </footer>
          )}
        </div>
      </div>
    );

    return createPortal(modal, document.body);
  },
);

Modal.displayName = "Modal";

export { Modal };
