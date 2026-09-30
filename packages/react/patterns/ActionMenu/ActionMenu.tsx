import { forwardRef } from "react";

import { Button } from "../../components/forms/Button";
import { Link } from "../../components/typography/Link";
import { classNames } from "../../core/utils";

import type {
  ActionMenuItem,
  ActionMenuProps,
} from "./ActionMenu.types";

export const ActionMenu = forwardRef<
  HTMLElement,
  ActionMenuProps
>(
  (
    {
      items,
      className,
      ...props
    },
    ref,
  ) => (
    <nav
      {...props}
      ref={ref}
      className={classNames(
        "aui-action-menu",
        className,
      )}
    >
      <ul className="aui-action-menu__list">
        {items.map((item) => {
          if (item.type === "link") {
            return (
              <li
                className="aui-action-menu__item"
                key={item.id}
              >
                <Link
                  href={item.href}
                  external={item.external}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const {
            id,
            label,
            type: _type,
            ...buttonProps
          } = item;

          return (
            <li
              className="aui-action-menu__item"
              key={id}
            >
              <Button
                type="button"
                {...buttonProps}
              >
                {label}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  ),
);

ActionMenu.displayName = "ActionMenu";
