import { forwardRef } from "react";

import { classNames } from "../../../core/utils";

import type {
  MenuItemProps,
  MenuProps,
} from "./Menu.types";

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      className,
      ...props
    },
    ref,
  ) => (
    <li
      {...props}
      ref={ref}
      className={classNames(
        "aui-menu__item",
        className,
      )}
    />
  ),
);

MenuItem.displayName = "Menu.Item";

const MenuRoot = forwardRef<HTMLMenuElement, MenuProps>(
  (
    {
      className,
      ...props
    },
    ref,
  ) => (
    <menu
      {...props}
      ref={ref}
      className={classNames(
        "aui-menu",
        className,
      )}
    />
  ),
);

MenuRoot.displayName = "Menu";

const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
});

export { Menu };
