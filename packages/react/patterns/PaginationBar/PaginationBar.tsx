import { forwardRef } from "react";
import { Pagination } from "../../components/navigation/Pagination";
import { classNames } from "../../core/utils";
import type { PaginationBarProps } from "./PaginationBar.types";

export const PaginationBar = forwardRef<HTMLElement, PaginationBarProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      siblingCount,
      summary,
      className,
      ...props
    },
    ref,
  ) => {
    const ariaLabel = props["aria-label"] ?? "Pagination controls";

    return (
      <nav
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={classNames("aui-pagination-bar", className)}
      >
        {summary != null && (
          <div className="aui-pagination-bar__summary">
            {summary}
          </div>
        )}

        <div className="aui-pagination-bar__pagination">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            siblingCount={siblingCount}
          />
        </div>
      </nav>
    );
  },
);

PaginationBar.displayName = "PaginationBar";
