import type { ReactNode } from "react";

import { classNames } from "../../../core/utils";
import type {
  DataGridColumn,
  DataGridProps,
} from "./DataGrid.types";

function getRowKey<T extends Record<string, unknown>>(
  row: T,
  index: number,
  rowKey?: keyof T | ((row: T, index: number) => string),
) {
  if (typeof rowKey === "function") {
    return rowKey(row, index);
  }

  if (rowKey) {
    return String(row[rowKey]);
  }

  return String(index);
}

function getCellValue<T extends Record<string, unknown>>(
  row: T,
  column: DataGridColumn<T>,
) {
  return typeof column.key === "string"
    ? row[column.key]
    : row[column.key];
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  emptyState = "No data",
  className,
}: DataGridProps<T>) {
  return (
    <div
      className={classNames(
        "aui-data-grid",
        className,
      )}
    >
      <table className="aui-data-grid__table">
        <thead className="aui-data-grid__head">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="aui-data-grid__body">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="aui-data-grid__empty"
              >
                {emptyState}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getRowKey(row, index, rowKey)}
              >
                {columns.map((column) => {
                  const value = getCellValue(
                    row,
                    column,
                  );

                  return (
                    <td
                      key={String(column.key)}
                    >
                      {column.render
                        ? column.render(
                            value,
                            row,
                            index,
                          )
                        : (value as ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
