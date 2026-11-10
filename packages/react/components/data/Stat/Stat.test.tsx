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
  Stat,
} from "./Stat";

describe("Stat", () => {
  it("renders label and value", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
      />,
    );

    expect(
      screen.getByText("Revenue"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("$12,480"),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
        description="This month"
      />,
    );

    expect(
      screen.getByText("This month"),
    ).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
      />,
    );

    expect(
      screen.queryByText("This month"),
    ).not.toBeInTheDocument();
  });

  it("uses neutral trend by default", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
      />,
    );

    expect(
      screen.getByText("$12,480").parentElement,
    ).toHaveClass(
      "aui-stat--neutral",
    );
  });

  it("applies positive trend", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
        trend="positive"
      />,
    );

    expect(
      screen.getByText("$12,480").parentElement,
    ).toHaveClass(
      "aui-stat--positive",
    );
  });

  it("applies negative trend", () => {
    render(
      <Stat
        label="Revenue"
        value="$12,480"
        trend="negative"
      />,
    );

    expect(
      screen.getByText("$12,480").parentElement,
    ).toHaveClass(
      "aui-stat--negative",
    );
  });

  it("supports React nodes", () => {
    render(
      <Stat
        label={<span>Users</span>}
        value={<strong>128</strong>}
        description={<small>Active</small>}
      />,
    );

    expect(
      screen.getByText("Users"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("128"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active"),
    ).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(
      <Stat
        aria-label="Revenue statistic"
        data-testid="revenue-stat"
        label="Revenue"
        value="$12,480"
      />,
    );

    const stat =
      screen.getByTestId("revenue-stat");

    expect(stat).toHaveAttribute(
      "aria-label",
      "Revenue statistic",
    );
  });

  it("forwards a ref to the section element", () => {
    let statElement:
      | HTMLElement
      | null = null;

    render(
      <Stat
        ref={(element) => {
          statElement = element;
        }}
        label="Revenue"
        value="$12,480"
        data-testid="revenue-stat"
      />,
    );

    const renderedStat =
      screen.getByTestId(
        "revenue-stat",
      );

    expect(statElement).toBe(
      renderedStat,
    );
  });

  it("allows custom class names", () => {
    render(
      <Stat
        className="custom-stat"
        label="Revenue"
        value="$12,480"
        data-testid="revenue-stat"
      />,
    );

    expect(
      screen.getByTestId("revenue-stat"),
    ).toHaveClass(
      "custom-stat",
    );
  });
});
