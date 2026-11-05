import type { RefObject } from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders the date input", () => {
    render(<DatePicker aria-label="Date" />);

    expect(screen.getByLabelText("Date")).toHaveAttribute(
      "type",
      "date",
    );
  });

  it("renders label", () => {
    render(<DatePicker label="Birth date" />);

    expect(
      screen.getByLabelText("Birth date"),
    ).toBeInTheDocument();
  });

  it("supports default value", () => {
    render(
      <DatePicker
        aria-label="Date"
        defaultValue="2026-10-07"
      />,
    );

    expect(screen.getByLabelText("Date")).toHaveValue(
      "2026-10-07",
    );
  });

  it("supports controlled value", () => {
    render(
      <DatePicker
        aria-label="Date"
        value="2026-10-07"
        onChange={() => undefined}
      />,
    );

    expect(screen.getByLabelText("Date")).toHaveValue(
      "2026-10-07",
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <DatePicker
        aria-label="Date"
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Date"), {
      target: {
        value: "2026-12-25",
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders description", () => {
    render(
      <DatePicker
        label="Date"
        description="Select a date"
      />,
    );

    expect(
      screen.getByText("Select a date"),
    ).toBeInTheDocument();
  });

  it("renders error", () => {
    render(
      <DatePicker
        label="Date"
        error="Date is required"
      />,
    );

    expect(
      screen.getByText("Date is required"),
    ).toBeInTheDocument();
  });

  it("marks the input as invalid", () => {
    render(
      <DatePicker
        label="Date"
        error="Invalid date"
      />,
    );

    expect(
      screen.getByLabelText("Date"),
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("supports required state", () => {
    const { container } = render(
      <DatePicker
        label="Date"
        required
      />,
    );

    const input = container.querySelector(
      'input[type="date"]',
    );

    expect(input).toBeRequired();
  });

  it("supports disabled state", () => {
    render(
      <DatePicker
        label="Date"
        disabled
      />,
    );

    expect(screen.getByLabelText("Date")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = {
      current: null,
    } as unknown as RefObject<HTMLInputElement>;

    render(
      <DatePicker
        aria-label="Date"
        ref={ref}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges external aria-describedby with generated description", () => {
    render(
      <DatePicker
        label="Date"
        description="Select a date"
        aria-describedby="external-help"
      />,
    );

    const input = screen.getByLabelText("Date");
    const describedBy = input.getAttribute("aria-describedby")?.split(" ");

    expect(describedBy).toContain("external-help");
    expect(describedBy).toHaveLength(2);
  });

  it("preserves external aria-invalid when there is no error", () => {
    render(
      <DatePicker
        label="Date"
        aria-invalid="grammar"
      />,
    );

    expect(screen.getByLabelText("Date")).toHaveAttribute(
      "aria-invalid",
      "grammar",
    );
  });

  it("prioritizes error state over external aria-invalid", () => {
    render(
      <DatePicker
        label="Date"
        error="Invalid date"
        aria-invalid="false"
      />,
    );

    expect(screen.getByLabelText("Date")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
