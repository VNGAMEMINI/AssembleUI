import { forwardRef } from "react";
import { classNames } from "../../core/utils";
import type { ListHeaderProps } from "./ListHeader.types";

export const ListHeader = forwardRef<
  HTMLElement,
  ListHeaderProps
>(
  (
    {
      title,
      description,
      count,
      actions,
      className,
      ...props
    },
    ref,
  ) => {
    const hasDescription = description != null;
    const hasCount = count != null;
    const hasActions = actions != null;

    return (
      <header
        {...props}
        ref={ref}
        className={classNames(
          "aui-list-header",
          className,
        )}
      >
        <div className="aui-list-header__content">
          <div className="aui-list-header__title-row">
            <h2 className="aui-list-header__title">
              {title}
            </h2>

            {hasCount && (
              <div className="aui-list-header__count">
                {count}
              </div>
            )}
          </div>

          {hasDescription && (
            <div className="aui-list-header__description">
              {description}
            </div>
          )}
        </div>

        {hasActions && (
          <div className="aui-list-header__actions">
            {actions}
          </div>
        )}
      </header>
    );
  },
);

ListHeader.displayName = "ListHeader";
