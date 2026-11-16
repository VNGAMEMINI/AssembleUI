import {
  Children,
  forwardRef,
  isValidElement,
} from "react";

import type {
  ReactElement,
  ReactNode,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  TableCaptionProps,
  TableCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "./Table.types";

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(
  ({ className, ...props }, ref) => (
    <caption
      {...props}
      ref={ref}
      className={classNames(
        "aui-table__caption",
        className,
      )}
    />
  ),
);

TableCaption.displayName = "Table.Caption";

const TableRow = forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(
  ({ className, ...props }, ref) => (
    <tr
      {...props}
      ref={ref}
      className={classNames(
        "aui-table__row",
        className,
      )}
    />
  ),
);

TableRow.displayName = "Table.Row";

const TableHead = forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(
  ({ className, scope = "col", ...props }, ref) => (
    <th
      {...props}
      ref={ref}
      scope={scope}
      className={classNames(
        "aui-table__head",
        className,
      )}
    />
  ),
);

TableHead.displayName = "Table.Head";

const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(
  ({ className, ...props }, ref) => (
    <td
      {...props}
      ref={ref}
      className={classNames(
        "aui-table__cell",
        className,
      )}
    />
  ),
);

TableCell.displayName = "Table.Cell";

type TableRowElement = ReactElement<{
  children?: ReactNode;
}>;

function isTableRow(
  child: ReactNode,
): child is TableRowElement {
  return (
    isValidElement(child) &&
    child.type === TableRow
  );
}

function isTableHead(
  child: ReactNode,
): boolean {
  return (
    isValidElement(child) &&
    child.type === TableHead
  );
}

function isTableCaption(
  child: ReactNode,
): child is ReactElement<TableCaptionProps> {
  return (
    isValidElement(child) &&
    child.type === TableCaption
  );
}

const TableRoot = forwardRef<
  HTMLTableElement,
  TableProps
>(
  (
    {
      title,
      variant = "default",
      density = "comfortable",
      bordered = false,
      hoverable = false,
      wrapperClassName,
      wrapperProps,
      className,
      children,
      ...tableProps
    },
    ref,
  ) => {
    const {
      className: wrapperCustomClassName,
      ...restWrapperProps
    } = wrapperProps ?? {};

    const headerRows: ReactNode[] = [];
    const bodyRows: ReactNode[] = [];
    const otherChildren: ReactNode[] = [];

    let caption: ReactNode = null;

    Children.forEach(children, (child) => {
      if (isTableRow(child)) {
        const rowChildren = Children.toArray(
          child.props.children,
        );

        if (rowChildren.some(isTableHead)) {
          headerRows.push(child);
        } else {
          bodyRows.push(child);
        }

        return;
      }

      if (isTableCaption(child)) {
        caption = child;
        return;
      }

      otherChildren.push(child);
    });

    return (
      <div
        {...restWrapperProps}
        className={classNames(
          "aui-table__wrapper",
          wrapperClassName,
          wrapperCustomClassName,
        )}
      >
        <table
          {...tableProps}
          ref={ref}
          className={classNames(
            "aui-table",
            `aui-table--${variant}`,
            `aui-table--${density}`,
            bordered && "aui-table--bordered",
            hoverable && "aui-table--hoverable",
            className,
          )}
        >
          {title != null ? (
            <caption className="aui-table__caption">
              {title}
            </caption>
          ) : (
            caption
          )}

          {headerRows.length > 0 && (
            <thead className="aui-table__header">
              {headerRows}
            </thead>
          )}

          {bodyRows.length > 0 && (
            <tbody className="aui-table__body">
              {bodyRows}
            </tbody>
          )}

          {otherChildren}
        </table>
      </div>
    );
  },
);

TableRoot.displayName = "Table";

const Table = Object.assign(TableRoot, {
  Caption: TableCaption,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});

export { Table };
