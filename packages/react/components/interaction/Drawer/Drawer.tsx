import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
} from "react";

import { createPortal } from "react-dom";

import { useDisclosure } from "../../../core/hooks";
import {
  acquireScrollLock,
  classNames,
} from "../../../core/utils";

import type {
  DrawerContentProps,
  DrawerItemProps,
  DrawerProps,
} from "./Drawer.types";

import { useDrawerFocus } from "./module/_useDrawerFocus";

interface DrawerContextValue {
  onClose: () => void;
  closeOnBackdrop: boolean;
}

const DrawerContext =
  createContext<DrawerContextValue | null>(null);

function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);

  if (context == null) {
    throw new Error(
      "Drawer.Content must be rendered inside Drawer.",
    );
  }

  return context;
}

function DrawerRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
}: DrawerProps) {
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
      if (event.defaultPrevented || event.key !== "Escape") {
        return;
      }

      onClose();
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

    return acquireScrollLock();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <DrawerContext.Provider
      value={{
        onClose,
        closeOnBackdrop,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

const DrawerContent = forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(
  (
    {
      title,
      description,
      children,
      closeLabel = "Close",
      placement = "right",
      columns = 1,
      gap = "var(--aui-token-space-4)",
      className,
      style,
      onKeyDown,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      onClose,
      closeOnBackdrop,
    } = useDrawerContext();

    const generatedId = useId().replace(/:/g, "");
    const titleId = `aui-drawer-title-${generatedId}`;
    const descriptionId =
      `aui-drawer-description-${generatedId}`;

    const {
      dialogRef,
      handleKeyDown,
    } = useDrawerFocus(onKeyDown);

    const gridTemplateColumns =
      typeof columns === "number"
        ? `repeat(${Math.max(1, Math.floor(columns))}, minmax(0, 1fr))`
        : columns;

    const setDialogRef = (node: HTMLDivElement | null) => {
      dialogRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef != null) {
        (forwardedRef as { current: HTMLDivElement | null }).current =
          node;
      }
    };

    const drawer = (
      <div
        className={classNames(
          "aui-drawer",
          `aui-drawer--${placement}`,
        )}
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
          ref={setDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={
            description != null
              ? descriptionId
              : undefined
          }
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={classNames(
            "aui-drawer__panel",
            className,
          )}
          style={style}
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

          <div
            className="aui-drawer__body"
            style={{
              gridTemplateColumns,
              gap,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(drawer, document.body);
  },
);

DrawerContent.displayName = "Drawer.Content";

const DrawerItem = forwardRef<
  HTMLDivElement,
  DrawerItemProps
>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-drawer__item",
        className,
      )}
    />
  ),
);

DrawerItem.displayName = "Drawer.Item";

const Drawer = Object.assign(DrawerRoot, {
  Content: DrawerContent,
  Item: DrawerItem,
});

export { Drawer };
