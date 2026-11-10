import {
  forwardRef,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  StatProps,
} from "./Stat.types";

export const Stat = forwardRef<
  HTMLElement,
  StatProps
>(
  (
    {
      label,
      value,
      description,
      trend = "neutral",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        {...props}
        ref={ref}
        className={classNames(
          "aui-stat",
          `aui-stat--${trend}`,
          className,
        )}
      >
        <div className="aui-stat__label">
          {label}
        </div>

        <div className="aui-stat__value">
          {value}
        </div>

        {description !== undefined && (
          <div className="aui-stat__description">
            {description}
          </div>
        )}
      </section>
    );
  },
);

Stat.displayName = "Stat";
