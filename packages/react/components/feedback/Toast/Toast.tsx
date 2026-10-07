import {
  forwardRef,
  useEffect,
  useId,
} from "react";
import { classNames } from "../../../core/utils";
import type { ToastProps } from "./Toast.types";

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      open = false,
      title,
      message,
      status = "info",
      duration = 4000,
      onClose,
      closeLabel = "Close",
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    const messageId = useId();

    useEffect(() => {
      if (!open || duration <= 0 || !onClose) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [open, duration, onClose]);

    if (!open) {
      return null;
    }

    const role = status === "error" ? "alert" : "status";

    return (
      <div
        {...props}
        ref={ref}
        role={role}
        aria-labelledby={title != null ? titleId : undefined}
        aria-describedby={
          message != null ? messageId : undefined
        }
        className={classNames(
          "aui-toast",
          `aui-toast--${status}`,
          className,
        )}
      >
        <div className="aui-toast__content">
          {title != null && (
            <div
              id={titleId}
              className="aui-toast__title"
            >
              {title}
            </div>
          )}

          {message != null && (
            <div
              id={messageId}
              className="aui-toast__message"
            >
              {message}
            </div>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            className="aui-toast__close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";
