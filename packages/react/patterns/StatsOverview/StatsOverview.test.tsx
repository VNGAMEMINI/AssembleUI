import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import { StatsOverview } from "./StatsOverview";

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

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("12,400")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("842")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$24,500")).toBeInTheDocument();
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
      screen.getByText("Current account statistics."),
    ).toBeInTheDocument();
  });

  it("renders descriptions and changes", () => {
    render(
      <StatsOverview
        items={[
          {
            id: "revenue",
            label: "Revenue",
            value: "$24,500",
            description: "This month",
            change: {
              value: "+12%",
              variant: "positive",
            },
          },
          {
            id: "refunds",
            label: "Refunds",
            value: "$1,200",
            description: "This month",
            change: {
              value: "-4%",
              variant: "negative",
            },
          },
        ]}
      />,
    );

    expect(screen.getAllByText("This month")).toHaveLength(2);
    expect(screen.getByText("+12%")).toHaveClass(
      "aui-stat__change--positive",
    );
    expect(screen.getByText("-4%")).toHaveClass(
      "aui-stat__change--negative",
    );
  });

  it("renders a change without a variant as neutral", () => {
    render(
      <StatsOverview
        items={[
          {
            id: "users",
            label: "Users",
            value: 100,
            change: {
              value: "No change",
            },
          },
        ]}
      />,
    );

    expect(screen.getByText("No change")).toHaveClass(
      "aui-stat__change--neutral",
    );
  });

  it("supports a custom class name and section attributes", () => {
    render(
      <StatsOverview
        className="custom-stats-overview"
        data-testid="stats-overview"
        items={[]}
      />,
    );

    expect(screen.getByTestId("stats-overview")).toHaveClass(
      "custom-stats-overview",
    );
  });

  it("renders an empty overview without statistics", () => {
    render(<StatsOverview items={[]} />);

    expect(
      document.querySelector(".aui-stats-overview__grid"),
    ).toBeInTheDocument();

    expect(
      document.querySelector(".aui-stat"),
    ).not.toBeInTheDocument();
  });
});
