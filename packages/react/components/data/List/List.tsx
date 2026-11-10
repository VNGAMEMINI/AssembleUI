import {
  createElement,
  forwardRef,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  ListProps,
} from "./List.types";

export const List = forwardRef<
  HTMLElement,
  ListProps
>(
  (
    {
      ordered = false,
      orientation = "vertical",
      density = "comfortable",
      divided = false,
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
          divided &&
            "aui-list--divided",
          className,
        ),
      },
    );
  },
);

List.displayName = "List";
