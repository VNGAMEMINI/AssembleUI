import {
  forwardRef,
  type Ref,
  type RefCallback,
} from "react";
import { classNames } from "../../../core/utils";
import type { DividerProps } from "./Divider.types";

function setRef<T>(ref: Ref<T>, value: T | null): void {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export const Divider = forwardRef<HTMLElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    if (orientation === "vertical") {
      const verticalRef: RefCallback<HTMLDivElement> = (element) => {
        setRef(ref, element);
      };

      return (
        <div
          {...props}
          ref={verticalRef}
          role="separator"
          aria-orientation="vertical"
          className={classNames(
            "aui-divider",
            "aui-divider--vertical",
            className,
          )}
        />
      );
    }

    const horizontalRef: RefCallback<HTMLHRElement> = (element) => {
      setRef(ref, element);
    };

    return (
      <hr
        {...props}
        ref={horizontalRef}
        className={classNames(
          "aui-divider",
          "aui-divider--horizontal",
          className,
        )}
      />
    );
  },
);

Divider.displayName = "Divider";
