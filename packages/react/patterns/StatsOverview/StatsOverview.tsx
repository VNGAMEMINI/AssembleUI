import { forwardRef } from "react";

import {
  Stat,
  Heading,
  Text,
} from "../../components";

import { classNames } from "../../core/utils";

import type {
  StatsOverviewProps,
} from "./StatsOverview.types";

export const StatsOverview = forwardRef<
  HTMLElement,
  StatsOverviewProps
>(
  (
    {
      title,
      description,
      items,
      className,
      ...props
    },
    ref,
  ) => {
    const hasHeader =
      title != null ||
      description != null;

    return (
      <section
        {...props}
        ref={ref}
        className={classNames(
          "aui-stats-overview",
          className,
        )}
      >
        {hasHeader && (
          <header className="aui-stats-overview__header">
            {title != null && (
              <Heading
                level={2}
                className="aui-stats-overview__title"
              >
                {title}
              </Heading>
            )}

            {description != null && (
              <Text className="aui-stats-overview__description">
                {description}
              </Text>
            )}
          </header>
        )}

        <div className="aui-stats-overview__grid">
          {items.map((item) => (
            <Stat key={item.id}>
              <Stat.Label>
                {item.label}
              </Stat.Label>

              <Stat.Value>
                {item.value}
              </Stat.Value>

              {item.description != null && (
                <Stat.Description>
                  {item.description}
                </Stat.Description>
              )}

              {item.change != null && (
                <Stat.Change
                  variant={item.change.variant}
                >
                  {item.change.value}
                </Stat.Change>
              )}
            </Stat>
          ))}
        </div>
      </section>
    );
  },
);

StatsOverview.displayName = "StatsOverview";
