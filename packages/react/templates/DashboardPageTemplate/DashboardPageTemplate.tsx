import { forwardRef } from "react";

import {
  ContentHeader,
  DataToolbar,
  PaginationBar,
  StatsOverview,
} from "../../patterns";

import {
  DataGrid,
} from "../../components";

import {
  classNames,
} from "../../core/utils";

import type {
  DashboardPageTemplateProps,
} from "./DashboardPageTemplate.types";

export const DashboardPageTemplate = forwardRef<
  HTMLElement,
  DashboardPageTemplateProps
>(
  (
    {
      data,
      onPageChange,
      className,
      ...props
    },
    ref,
  ) => {
    const {
      title,
      description,
      breadcrumbs,
      stats,
      toolbar,
      columns,
      rows,
      pagination,
    } = data;

    const hasStats =
      stats != null &&
      stats.length > 0;

    const hasToolbar =
      toolbar != null &&
      (
        toolbar.title != null ||
        toolbar.description != null
      );

    const hasPagination =
      pagination != null &&
      onPageChange != null;

    return (
      <main
        {...props}
        ref={ref}
        className={classNames(
          "aui-dashboard-page-template",
          className,
        )}
      >
        <div className="aui-dashboard-page-template__header">
          <ContentHeader
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
          />
        </div>

        {hasStats && (
          <div className="aui-dashboard-page-template__stats">
            <StatsOverview
              items={stats}
            />
          </div>
        )}

        {hasToolbar && (
          <div className="aui-dashboard-page-template__toolbar">
            <DataToolbar
              title={toolbar.title}
              description={toolbar.description}
            />
          </div>
        )}

        <div className="aui-dashboard-page-template__content">
          <DataGrid
            columns={columns}
            rows={rows}
            rowKey="id"
          />
        </div>

        {hasPagination && (
          <div className="aui-dashboard-page-template__pagination">
            <PaginationBar
              page={pagination.page}
              totalPages={pagination.totalPages}
              siblingCount={pagination.siblingCount}
              summary={pagination.summary}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </main>
    );
  },
);

DashboardPageTemplate.displayName =
  "DashboardPageTemplate";
