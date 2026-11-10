import {
  forwardRef,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  TableProps,
} from "./Table.types";

export const Table = forwardRef<
  HTMLTableElement,
  TableProps
>(
  (
    {
      variant = "default",
      density = "comfortable",
      bordered = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="aui-table__wrapper">
        <table
          {...props}
          ref={ref}
          className={classNames(
            "aui-table",
            `aui-table--${variant}`,
            `aui-table--${density}`,
            bordered &&
              "aui-table--bordered",
            className,
          )}
        />
      </div>
    );
  },
);

Table.displayName = "Table";
