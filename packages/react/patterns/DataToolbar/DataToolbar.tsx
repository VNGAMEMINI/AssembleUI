import { forwardRef } from "react";
import { classNames } from "../../core/utils";
import type { DataToolbarProps } from "./DataToolbar.types";

export const DataToolbar = forwardRef<
  HTMLElement,
  DataToolbarProps
>(
  (
    {
      title,
      description,
      filters,
      actions,
      className,
      ...props
    },
    ref,
  ) => {
    const hasHeading = title != null || description != null;
    const hasControls = filters != null || actions != null;

    return (
      <section
        {...props}
        ref={ref}
        className={classNames(
          "aui-data-toolbar",
          className,
        )}
      >
        {hasHeading && (
          <div className="aui-data-toolbar__heading">
            {title != null && (
              <div className="aui-data-toolbar__title">
                {title}
              </div>
            )}

            {description != null && (
              <div className="aui-data-toolbar__description">
                {description}
              </div>
            )}
          </div>
        )}

        {hasControls && (
          <div className="aui-data-toolbar__controls">
            {filters != null && (
              <div className="aui-data-toolbar__filters">
                {filters}
              </div>
            )}

            {actions != null && (
              <div className="aui-data-toolbar__actions">
                {actions}
              </div>
            )}
          </div>
        )}
      </section>
    );
  },
);

DataToolbar.displayName = "DataToolbar";
