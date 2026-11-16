import {
  createRef,
} from "react";

import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import { Stat } from "./Stat";

describe("Stat", () => {
  it("renders composed content", () => {
    render(
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value>$12,480</Stat.Value>
        <Stat.Description>This month</Stat.Description>
        <Stat.Change variant="positive">
          +12.5%
        </Stat.Change>
      </Stat>,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,480")).toBeInTheDocument();
    expect(screen.getByText("This month")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("allows using only the value", () => {
    render(
      <Stat>
        <Stat.Value>128</Stat.Value>
      </Stat>,
    );

    expect(screen.getByText("128")).toBeInTheDocument();
  });

  it("supports React nodes", () => {
    render(
      <Stat>
        <Stat.Label>
          <span>Users</span>
        </Stat.Label>
        <Stat.Value>
          <strong>128</strong>
        </Stat.Value>
      </Stat>,
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("128").tagName).toBe("STRONG");
  });

  it("applies the neutral change variant by default", () => {
    render(
      <Stat.Change data-testid="change">
        No change
      </Stat.Change>,
    );

    expect(screen.getByTestId("change")).toHaveClass(
      "aui-stat__change--neutral",
    );
  });

  it.each([
    ["positive", "aui-stat__change--positive"],
    ["negative", "aui-stat__change--negative"],
    ["neutral", "aui-stat__change--neutral"],
  ] as const)(
    "applies the %s change variant",
    (variant, expectedClass) => {
      render(
        <Stat.Change
          variant={variant}
          data-testid="change"
        >
          Change
        </Stat.Change>,
      );

      expect(screen.getByTestId("change")).toHaveClass(
        expectedClass,
      );
    },
  );

  it("forwards native attributes to the root", () => {
    render(
      <Stat
        data-testid="stat"
        aria-label="Revenue statistic"
      >
        <Stat.Value>100</Stat.Value>
      </Stat>,
    );

    expect(screen.getByTestId("stat")).toHaveAttribute(
      "aria-label",
      "Revenue statistic",
    );
  });

  it("forwards refs to the root", () => {
    const ref = createRef<HTMLElement>();

    render(
      <Stat ref={ref} data-testid="stat">
        <Stat.Value>100</Stat.Value>
      </Stat>,
    );

    expect(ref.current).toBe(screen.getByTestId("stat"));
  });

  it("supports custom class names on the root and parts", () => {
    render(
      <Stat className="custom-stat">
        <Stat.Label className="custom-label">
          Revenue
        </Stat.Label>
        <Stat.Value className="custom-value">
          100
        </Stat.Value>
        <Stat.Change className="custom-change">
          +10%
        </Stat.Change>
      </Stat>,
    );

    expect(screen.getByRole("article")).toHaveClass("custom-stat");
    expect(screen.getByText("Revenue")).toHaveClass("custom-label");
    expect(screen.getByText("100")).toHaveClass("custom-value");
    expect(screen.getByText("+10%")).toHaveClass("custom-change");
  });

  it("forwards native attributes to compound parts", () => {
    render(
      <Stat>
        <Stat.Label data-testid="label">Revenue</Stat.Label>
        <Stat.Value data-testid="value">100</Stat.Value>
        <Stat.Description data-testid="description">
          This month
        </Stat.Description>
        <Stat.Change data-testid="change" title="Monthly change">
          +10%
        </Stat.Change>
      </Stat>,
    );

    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByTestId("value")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("change")).toHaveAttribute(
      "title",
      "Monthly change",
    );
  });

  it("forwards refs to compound parts", () => {
    const labelRef = createRef<HTMLDivElement>();
    const valueRef = createRef<HTMLDivElement>();
    const descriptionRef = createRef<HTMLDivElement>();
    const changeRef = createRef<HTMLSpanElement>();

    render(
      <Stat>
        <Stat.Label ref={labelRef}>Revenue</Stat.Label>
        <Stat.Value ref={valueRef}>100</Stat.Value>
        <Stat.Description ref={descriptionRef}>
          This month
        </Stat.Description>
        <Stat.Change ref={changeRef}>+10%</Stat.Change>
      </Stat>,
    );

    expect(labelRef.current).toBeInstanceOf(HTMLDivElement);
    expect(valueRef.current).toBeInstanceOf(HTMLDivElement);
    expect(descriptionRef.current).toBeInstanceOf(HTMLDivElement);
    expect(changeRef.current).toBeInstanceOf(HTMLSpanElement);
  });
});
