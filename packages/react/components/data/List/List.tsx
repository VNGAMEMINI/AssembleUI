import {
  createElement,
  forwardRef,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  ListItemProps,
  ListProps,
} from "./List.types";

const ListItem = forwardRef<
  HTMLLIElement,
  ListItemProps
>(
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
        "aui-list__item",
        className,
      )}
    />
  ),
);

ListItem.displayName = "List.Item";

const ListRoot = forwardRef<
  HTMLElement,
  ListProps
>(
  (
    {
      ordered = false,
      orientation = "vertical",
      density = "comfortable",
      divided = false,
      marker = "none",
      className,
      ...props
    },
    ref,
  ) => {
    const element = ordered
      ? "ol"
      : "ul";

    return createElement(
      element,
      {
        ...props,
        ref,
        className: classNames(
          "aui-list",
          `aui-list--${orientation}`,
          `aui-list--${density}`,
          `aui-list--marker-${marker}`,
          divided &&
            "aui-list--divided",
          className,
        ),
      },
    );
  },
);

ListRoot.displayName = "List";

const List = Object.assign(ListRoot, {
  Item: ListItem,
});

export { List };
