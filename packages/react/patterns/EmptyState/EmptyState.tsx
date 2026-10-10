import {
  forwardRef,
  type ReactElement,
} from "react";

import {
  Heading,
  Text,
} from "../../components";

import { classNames } from "../../core/utils";

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
  return (
    <section
      ref={ref}
      className={classNames(
        "aui-empty-state",
        className,
      )}
      {...props}
    >
      {icon != null && (
        <div
          className="aui-empty-state__icon"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="aui-empty-state__content">
        <Heading
          level={2}
          className="aui-empty-state__title"
        >
          {heading}
        </Heading>

        {description != null && (
          <Text className="aui-empty-state__description">
            {description}
          </Text>
        )}
      </div>

      {action != null && (
        <div className="aui-empty-state__action">
          {action}
        </div>
      )}
    </section>
  );
});
