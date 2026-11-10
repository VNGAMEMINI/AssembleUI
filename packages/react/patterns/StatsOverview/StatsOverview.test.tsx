import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  StatsOverview,
} from "./StatsOverview";

describe("StatsOverview", () => {
  it("renders all statistics", () => {
    render(
      <StatsOverview
        items={[
          {
            id: "users",
            label: "Users",
            value: "12,400",
          },
          {
            id: "orders",
            label: "Orders",
            value: "842",
          },
          {
            id: "revenue",
            label: "Revenue",
            value: "$24,500",
          },
        ]}
      />,
    );

    expect(
      screen.getByText("Users"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("12,400"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Orders"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("842"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Revenue"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("$24,500"),
    ).toBeInTheDocument();
  });

  it("renders the optional header", () => {
    render(
      <StatsOverview
        title="Overview"
        description="Current account statistics."
        items={[
          {
            id: "users",
            label: "Users",
            value: 100,
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Overview",
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Current account statistics.",
      ),
    ).toBeInTheDocument();
  });

  it("renders stat descriptions and trends", () => {
    render(
      <StatsOverview
        items={[
          {
            id: "revenue",
            label: "Revenue",
            value: "$24,500",
            description: "Up 12% this month",
            trend: "positive",
          },
          {
            id: "refunds",
            label: "Refunds",
            value: "$1,200",
            description: "Down 4% this month",
            trend: "negative",
          },
        ]}
      />,
    );

    expect(
      screen.getByText("Up 12% this month"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Down 4% this month"),
    ).toBeInTheDocument();

    expect(
      document.querySelector(
        ".aui-stat--positive",
      ),
    ).toBeInTheDocument();

    expect(
      document.querySelector(
        ".aui-stat--negative",
      ),
    ).toBeInTheDocument();
  });

  it("supports a custom class name", () => {
    render(
      <StatsOverview
        className="custom-stats-overview"
        items={[
          {
            id: "users",
            label: "Users",
            value: 100,
          },
        ]}
      />,
    );

    expect(
      document.querySelector(
        ".aui-stats-overview",
      ),
    ).toHaveClass(
      "custom-stats-overview",
    );
  });

  it("supports section HTML attributes", () => {
    render(
      <StatsOverview
        data-testid="stats-overview"
        items={[
          {
            id: "users",
            label: "Users",
            value: 100,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId(
        "stats-overview",
      ),
    ).toBeInTheDocument();
  });

  it("renders an empty overview without statistics", () => {
    render(
      <StatsOverview items={[]} />,
    );

    expect(
      document.querySelector(
        ".aui-stats-overview__grid",
      ),
    ).toBeInTheDocument();

    expect(
      document.querySelector(
        ".aui-stat",
      ),
    ).not.toBeInTheDocument();
  });
});
