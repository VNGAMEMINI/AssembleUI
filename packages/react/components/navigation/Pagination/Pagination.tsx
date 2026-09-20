import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { PaginationProps } from "./Pagination.types";

function getPages(
  page: number,
  totalPages: number,
  siblingCount: number,
): Array<number | "..."> {
  if (totalPages <= 1) {
    return [1];
  }

  const safeSiblingCount = Math.max(0, siblingCount);
  const firstPage = 1;
  const lastPage = totalPages;

  const start = Math.max(
    firstPage + 1,
    page - safeSiblingCount,
  );

  const end = Math.min(
    lastPage - 1,
    page + safeSiblingCount,
  );

  const pages: Array<number | "..."> = [firstPage];

  if (start > firstPage + 1) {
    pages.push("...");
  }

  for (let current = start; current <= end; current += 1) {
    pages.push(current);
  }

  if (end < lastPage - 1) {
    pages.push("...");
  }

  if (lastPage > firstPage) {
    pages.push(lastPage);
  }

  return pages;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      siblingCount = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const safeTotalPages = Math.max(1, totalPages);
    const safePage = Math.min(
      Math.max(1, page),
      safeTotalPages,
    );

    const pages = getPages(
      safePage,
      safeTotalPages,
      siblingCount,
    );

    const changePage = (nextPage: number) => {
      if (
        nextPage >= 1 &&
        nextPage <= safeTotalPages &&
        nextPage !== safePage
      ) {
        onPageChange(nextPage);
      }
    };

    return (
      <nav
        {...props}
        ref={ref}
        aria-label="Pagination"
        className={classNames("aui-pagination", className)}
      >
        <button
          type="button"
          className="aui-pagination__button"
          disabled={safePage === 1}
          aria-label="Previous page"
          onClick={() => changePage(safePage - 1)}
        >
          Previous
        </button>

        <ol className="aui-pagination__list">
          {pages.map((item, index) => {
            if (item === "...") {
              return (
                <li
                  key={`ellipsis-${index}`}
                  className="aui-pagination__item"
                >
                  <span
                    className="aui-pagination__ellipsis"
                    aria-hidden="true"
                  >
                    …
                  </span>
                </li>
              );
            }

            const current = item === safePage;

            return (
              <li
                key={item}
                className="aui-pagination__item"
              >
                <button
                  type="button"
                  className={classNames(
                    "aui-pagination__button",
                    current && "aui-pagination__button--current",
                  )}
                  aria-current={current ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  onClick={() => changePage(item)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          className="aui-pagination__button"
          disabled={safePage === safeTotalPages}
          aria-label="Next page"
          onClick={() => changePage(safePage + 1)}
        >
          Next
        </button>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
