import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
} from "react";

import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import { classNames } from "../../../core/utils";

import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import type {
  ModalContentProps,
  ModalProps,
} from "./Modal.types";

interface ModalContextValue {
  onClose: () => void;
  closeOnBackdrop: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(
  null,
);

function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);

  if (context == null) {
    throw new Error(
      "Modal.Content must be rendered inside Modal.",
    );
  }

  return context;
}

function ModalRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
}: ModalProps) {
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
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider
      value={{
        onClose,
        closeOnBackdrop,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

const ModalContent = forwardRef<
  HTMLDivElement,
  ModalContentProps
>(
  (
    {
      title,
      description,
      children,
      footer,
      closeLabel = "Close",
      className,
      ...props
    },
    ref,
  ) => {
    const {
      onClose,
      closeOnBackdrop,
    } = useModalContext();

    const generatedId = useId();
    const idSuffix = generatedId.replace(/:/g, "");

    const titleId = `aui-modal-title-${idSuffix}`;
    const descriptionId =
      `aui-modal-description-${idSuffix}`;

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
            description != null
              ? descriptionId
              : undefined
          }
          className={classNames(
            "aui-modal__dialog",
            className,
          )}
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

    return createPortal(
      modal,
      document.body,
    );
  },
);

ModalContent.displayName = "Modal.Content";

const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
});

export { Modal };
