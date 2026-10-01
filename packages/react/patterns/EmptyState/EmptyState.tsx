import {
  forwardRef,
  type ReactElement,
} from "react";

import {
  Heading,
  Text,
} from "../../components";

import type { EmptyStateProps } from "./EmptyState.types";

export const EmptyState = forwardRef<
  HTMLElement,
  EmptyStateProps
>(function EmptyState(
  {
    heading,
    description,
    icon,
    action,
    className,
    ...props
  },
  ref,
): ReactElement {
  const classes = [
    "aui-empty-state",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={ref}
      className={classes}
      {...props}
    >
      {icon ? (
        <div
          className="aui-empty-state__icon"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}

      <div className="aui-empty-state__content">
        <Heading
          level={2}
          className="aui-empty-state__title"
        >
          {heading}
        </Heading>

        {description ? (
          <Text className="aui-empty-state__description">
            {description}
          </Text>
        ) : null}
      </div>

      {action ? (
        <div className="aui-empty-state__action">
          {action}
        </div>
      ) : null}
    </section>
  );
});
