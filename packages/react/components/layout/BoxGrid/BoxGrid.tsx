import { forwardRef } from "react";

import { classNames } from "../../../core/utils";

import type { CSSProperties } from "react";
import type { BoxGridProps } from "./BoxGrid.types";

export const BoxGrid = forwardRef<HTMLDivElement, BoxGridProps>(
  (
    {
      columns,
      minWidth,
      spacing = "md",
      autoFlow = "row",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const columnCount =
      columns === undefined
        ? undefined
        : Number.isFinite(columns)
          ? Math.max(1, Math.floor(columns))
          : 1;

    const gridStyle = {
      ...(minWidth
        ? { "--aui-box-grid-min-width": minWidth }
        : {}),
      ...(columnCount !== undefined
        ? { "--aui-box-grid-columns": String(columnCount) }
        : {}),
      ...style,
    } as CSSProperties;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames("aui-box-grid", className)}
        data-columns={columnCount !== undefined ? "" : undefined}
        data-spacing={spacing}
        data-auto-flow={autoFlow}
        style={gridStyle}
      />
    );
  },
);

BoxGrid.displayName = "BoxGrid";
