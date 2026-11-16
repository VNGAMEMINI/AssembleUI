import { forwardRef } from "react";

import { classNames } from "../../../core/utils";

import type {
  StatChangeProps,
  StatDescriptionProps,
  StatLabelProps,
  StatProps,
  StatValueProps,
} from "./Stat.types";

const StatLabel = forwardRef<
  HTMLDivElement,
  StatLabelProps
>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-stat__label",
        className,
      )}
    />
  ),
);

StatLabel.displayName = "Stat.Label";

const StatValue = forwardRef<
  HTMLDivElement,
  StatValueProps
>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-stat__value",
        className,
      )}
    />
  ),
);

StatValue.displayName = "Stat.Value";

const StatDescription = forwardRef<
  HTMLDivElement,
  StatDescriptionProps
>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        "aui-stat__description",
        className,
      )}
    />
  ),
);

StatDescription.displayName = "Stat.Description";

const StatChange = forwardRef<
  HTMLSpanElement,
  StatChangeProps
>(
  (
    {
      variant = "neutral",
      className,
      ...props
    },
    ref,
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(
        "aui-stat__change",
        `aui-stat__change--${variant}`,
        className,
      )}
    />
  ),
);

StatChange.displayName = "Stat.Change";

const StatRoot = forwardRef<
  HTMLElement,
  StatProps
>(
  ({ className, ...props }, ref) => (
    <article
      {...props}
      ref={ref}
      className={classNames(
        "aui-stat",
        className,
      )}
    />
  ),
);

StatRoot.displayName = "Stat";

const Stat = Object.assign(StatRoot, {
  Label: StatLabel,
  Value: StatValue,
  Description: StatDescription,
  Change: StatChange,
});

export { Stat };
