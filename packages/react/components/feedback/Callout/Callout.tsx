import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { CalloutProps } from "./Callout.types";

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      className,
      tone = "neutral",
      title,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          "aui-callout",
          `aui-callout--${tone}`,
          className,
        )}
      >
        {title !== undefined ? (
          <div className="aui-callout__title">
            {title}
          </div>
        ) : null}

        {children !== undefined ? (
          <div className="aui-callout__content">
            {children}
          </div>
        ) : null}
      </div>
    );
  },
);

Callout.displayName = "Callout";
