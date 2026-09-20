import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { BreadcrumbProps } from "./Breadcrumb.types";

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = "/", className }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={classNames("aui-breadcrumb", className)}
      >
        <ol className="aui-breadcrumb__list">
          {items.map((item, index) => {
            const isCurrent = item.current || index === items.length - 1;

            return (
              <li
                key={index}
                className="aui-breadcrumb__item"
              >
                {isCurrent || !item.href ? (
                  <span
                    aria-current={isCurrent ? "page" : undefined}
                    className="aui-breadcrumb__label"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="aui-breadcrumb__link"
                  >
                    {item.label}
                  </a>
                )}

                {index < items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="aui-breadcrumb__separator"
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
