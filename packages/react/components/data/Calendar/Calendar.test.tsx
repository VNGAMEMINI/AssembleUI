import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders the current month", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
      />,
    );

    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("renders seven weekdays and 42 calendar days", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
      />,
    );

    expect(
      screen.getByText("Sun"),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("gridcell"),
    ).toHaveLength(42);
  });

  it("changes month", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Next month",
      }),
    );

    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const onChange = vi.fn();

    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        onChange={onChange}
      />,
    );

    const januaryFirst = screen.getByRole("gridcell", {
      name: /1\/1\/2026/,
    });

    fireEvent.click(januaryFirst);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(
      new Date(2026, 0, 1),
    );
  });

  it("supports controlled value", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        value={new Date(2026, 0, 15)}
      />,
    );

    expect(
      screen.getByRole("gridcell", {
        name: /1\/15\/2026/,
      }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("respects minDate and maxDate", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        minDate={new Date(2026, 0, 10)}
        maxDate={new Date(2026, 0, 20)}
      />,
    );

    expect(
      screen.getByRole("gridcell", {
        name: /1\/9\/2026/,
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("gridcell", {
        name: /1\/10\/2026/,
      }),
    ).not.toBeDisabled();

    expect(
      screen.getByRole("gridcell", {
        name: /1\/21\/2026/,
      }),
    ).toBeDisabled();
  });
});
