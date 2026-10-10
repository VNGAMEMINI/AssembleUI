import {
  createRef,
} from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  it("renders the time input", () => {
    const { container } = render(
      <TimePicker />,
    );

    expect(
      container.querySelector('input[type="time"]'),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(
      <TimePicker label="Time" />,
    );

    expect(
      screen.getByText("Time"),
    ).toBeInTheDocument();
  });

  it("supports default value", () => {
    const { container } = render(
      <TimePicker defaultValue="09:30" />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;

    expect(input.value).toBe("09:30");
  });

  it("supports controlled value", () => {
    const { container } = render(
      <TimePicker value="14:45" readOnly />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;

    expect(input.value).toBe("14:45");
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    const { container } = render(
      <TimePicker onChange={onChange} />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        value: "10:15",
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders description", () => {
    render(
      <TimePicker
        label="Time"
        description="Choose a time"
      />,
    );

    expect(
      screen.getByText("Choose a time"),
    ).toBeInTheDocument();
  });

  it("renders error", () => {
    render(
      <TimePicker
        label="Time"
        error="Invalid time"
      />,
    );

    expect(
      screen.getByText("Invalid time"),
    ).toBeInTheDocument();
  });

  it("marks the input as invalid", () => {
    const { container } = render(
      <TimePicker
        label="Time"
        error="Invalid time"
      />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    );

    expect(input).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("supports required state", () => {
    const { container } = render(
      <TimePicker
        label="Time"
        required
      />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    );

    expect(input).toBeRequired();
  });

  it("supports disabled state", () => {
    const { container } = render(
      <TimePicker
        label="Time"
        disabled
      />,
    );

    const input = container.querySelector(
      'input[type="time"]',
    );

    expect(input).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <TimePicker ref={ref} />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLInputElement,
    );

    expect(ref.current?.type).toBe("time");
  });
});
