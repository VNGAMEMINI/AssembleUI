import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  DashboardPageTemplate,
} from "./DashboardPageTemplate";

const dashboardData = {
  title: "Analytics",
  description: "Dashboard overview",
  stats: [
    {
      id: "revenue",
      label: "Revenue",
      value: "$12,000",
    },
    {
      id: "users",
      label: "Users",
      value: 1200,
    },
  ],
  toolbar: {
    title: "Users",
    description: "Manage users",
  },
  columns: [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "status",
      header: "Status",
    },
  ],
  rows: [
    {
      id: "1",
      name: "Alice",
      status: "Active",
    },
    {
      id: "2",
      name: "Bob",
      status: "Inactive",
    },
  ],
  pagination: {
    page: 1,
    totalPages: 3,
    summary: "Showing users",
  },
};

describe("DashboardPageTemplate", () => {
  it("renders dashboard data", () => {
    render(
      <DashboardPageTemplate
        data={dashboardData}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Analytics",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Dashboard overview"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Revenue"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("12,000", {
        exact: false,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Alice"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active"),
    ).toBeInTheDocument();
  });

  it("renders toolbar data", () => {
    render(
      <DashboardPageTemplate
        data={dashboardData}
      />,
    );

    expect(
      screen.getAllByText("Users")[1],
    ).toBeInTheDocument();

    expect(
      screen.getByText("Manage users"),
    ).toBeInTheDocument();
  });

  it("renders pagination when a page-change handler is provided", () => {
    const onPageChange = vi.fn();

    render(
      <DashboardPageTemplate
        data={dashboardData}
        onPageChange={onPageChange}
      />,
    );

    expect(
      screen.getByText("Showing users"),
    ).toBeInTheDocument();
  });

  it("does not render pagination without a page-change handler", () => {
    render(
      <DashboardPageTemplate
        data={dashboardData}
      />,
    );

    expect(
      screen.queryByText("Showing users"),
    ).not.toBeInTheDocument();
  });

  it("supports custom class names", () => {
    render(
      <DashboardPageTemplate
        data={dashboardData}
        className="custom-dashboard"
      />,
    );

    expect(
      document.querySelector(
        ".aui-dashboard-page-template",
      ),
    ).toHaveClass(
      "custom-dashboard",
    );
  });

  it("supports HTML attributes", () => {
    render(
      <DashboardPageTemplate
        data={dashboardData}
        data-testid="dashboard-template"
      />,
    );

    expect(
      screen.getByTestId(
        "dashboard-template",
      ),
    ).toBeInTheDocument();
  });
});
