import { forwardRef } from "react";

import {
  Breadcrumb,
  Heading,
  Text,
} from "../../components";

import { classNames } from "../../core/utils";

import type { ContentHeaderProps } from "./ContentHeader.types";

export const ContentHeader = forwardRef<
  HTMLElement,
  ContentHeaderProps
>(
  (
    {
      title,
      description,
      breadcrumbs,
      actions,
      className,
      ...props
    },
    ref,
  ) => {
    const hasBreadcrumbs =
      breadcrumbs != null &&
      breadcrumbs.length > 0;

    const hasDescription =
      description != null;

    const hasActions =
      actions != null;

    return (
      <header
        {...props}
        ref={ref}
        className={classNames(
          "aui-content-header",
          className,
        )}
      >
        {hasBreadcrumbs && (
          <div className="aui-content-header__breadcrumbs">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}

        <div className="aui-content-header__main">
          <div className="aui-content-header__content">
            <Heading
              level={1}
              className="aui-content-header__title"
            >
              {title}
            </Heading>

            {hasDescription && (
              <Text className="aui-content-header__description">
                {description}
              </Text>
            )}
          </div>

          {hasActions && (
            <div className="aui-content-header__actions">
              {actions}
            </div>
          )}
        </div>
      </header>
    );
  },
);

ContentHeader.displayName = "ContentHeader";
