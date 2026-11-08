import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders the current month", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
      />,
    );

    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("renders seven weekdays and 42 calendar days", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Sunday" }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("gridcell"),
    ).toHaveLength(42);
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
  });

  it("changes month", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "next month (February 2026)",
      }),
    );

    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const onChange = vi.fn();

    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
        onChange={onChange}
      />,
    );

    const januaryFirst = screen.getByRole("button", {
      name: "Thursday, January 1, 2026",
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
        locale="en-US"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Thursday, January 15, 2026",
      }),
    ).toHaveAttribute("tabindex", "0");
    expect(
      screen
        .getByRole("button", { name: "Thursday, January 15, 2026" })
        .closest('[role="gridcell"]'),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("respects minDate and maxDate", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
        minDate={new Date(2026, 0, 10)}
        maxDate={new Date(2026, 0, 20)}
      />,
    );

    const januaryNinth = screen.getByRole("button", {
      name: "Friday, January 9, 2026",
    });
    expect(januaryNinth).toBeDisabled();
    expect(januaryNinth.closest('[role="gridcell"]')).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    const januaryTenth = screen.getByRole("button", {
      name: "Saturday, January 10, 2026",
    });
    expect(januaryTenth.closest('[role="gridcell"]')).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );

    const januaryTwentyFirst = screen.getByRole("button", {
      name: "Wednesday, January 21, 2026",
    });
    expect(januaryTwentyFirst).toBeDisabled();
    expect(januaryTwentyFirst.closest('[role="gridcell"]')).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("moves focus through the grid with calendar keyboard commands", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="en-US"
      />,
    );

    const januaryFirst = screen.getByRole("button", {
      name: "Thursday, January 1, 2026",
    });
    expect(januaryFirst).toHaveAttribute("tabindex", "0");

    januaryFirst.focus();
    fireEvent.keyDown(januaryFirst, { key: "ArrowRight" });

    const januarySecond = screen.getByRole("button", {
      name: "Friday, January 2, 2026",
    });
    expect(januarySecond).toHaveFocus();
    expect(januarySecond).toHaveAttribute("tabindex", "0");

    fireEvent.keyDown(januarySecond, { key: "PageDown" });
    const februarySecond = screen.getByRole("button", {
      name: "Monday, February 2, 2026",
    });
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(februarySecond).toHaveFocus();
  });

  it("requests a controlled month change and focuses the pending PageDown date", () => {
    const onMonthChange = vi.fn();
    const january = new Date(2026, 0, 1);
    const { rerender } = render(
      <Calendar
        month={january}
        locale="en-US"
        onMonthChange={onMonthChange}
      />,
    );

    const januaryFifteenth = screen.getByRole("button", {
      name: "Thursday, January 15, 2026",
    });
    januaryFifteenth.focus();
    fireEvent.keyDown(januaryFifteenth, { key: "PageDown" });

    expect(onMonthChange).toHaveBeenCalledTimes(1);
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 1, 1));
    expect(screen.getByText("January 2026")).toBeInTheDocument();

    rerender(
      <Calendar
        month={new Date(2026, 1, 1)}
        locale="en-US"
        onMonthChange={onMonthChange}
      />,
    );

    const februaryFifteenth = screen.getByRole("button", {
      name: "Sunday, February 15, 2026",
    });
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(februaryFifteenth).toHaveFocus();
  });

  it("updates the displayed month when a controlled value changes unless month is controlled", () => {
    const { rerender } = render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        value={new Date(2026, 0, 15)}
        locale="en-US"
      />,
    );

    rerender(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        value={new Date(2026, 2, 15)}
        locale="en-US"
      />,
    );
    expect(screen.getByText("March 2026")).toBeInTheDocument();

    rerender(
      <Calendar
        month={new Date(2026, 0, 1)}
        value={new Date(2026, 2, 15)}
        locale="en-US"
      />,
    );
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("localizes month, weekday, and navigation labels and starts weeks by locale", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 0, 1)}
        locale="de-DE"
      />,
    );

    expect(screen.getByText("Januar 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "letzten Monat (Dezember 2025)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "nächsten Monat (Februar 2026)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
    expect(
      screen.getByRole("columnheader", { name: "Montag" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Montag, 29. Dezember 2025",
      }),
    ).toHaveAccessibleName("Montag, 29. Dezember 2025");
    expect(
      screen.getByRole("button", {
        name: "Donnerstag, 1. Januar 2026",
      }),
    ).toBeInTheDocument();
  });
});
