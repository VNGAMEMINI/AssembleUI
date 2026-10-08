import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renders as a number input", () => {
    render(<NumberInput aria-label="Quantity" />);

    expect(screen.getByLabelText("Quantity")).toHaveAttribute(
      "type",
      "number",
    );
  });

  it("supports numeric value", () => {
    render(
      <NumberInput
        aria-label="Quantity"
        value={10}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Quantity")).toHaveValue(10);
  });

  it("returns a number when the value changes", () => {
    const handleChange = vi.fn();

    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={10}
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText("Quantity");

    fireEvent.change(input, {
      target: { value: "25" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBe(25);
  });

  it("returns null when the value is cleared", () => {
    const handleChange = vi.fn();

    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={10}
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText("Quantity");

    fireEvent.change(input, {
      target: { value: "" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBeNull();
  });

  it("forwards min, max and step", () => {
    render(
      <NumberInput
        aria-label="Quantity"
        min={1}
        max={100}
        step={5}
      />,
    );

    const input = screen.getByLabelText("Quantity");

    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "5");
  });

  it("forwards standard input props", () => {
    render(
      <NumberInput
        aria-label="Quantity"
        name="quantity"
        placeholder="Enter quantity"
      />,
    );

    const input = screen.getByLabelText("Quantity");

    expect(input).toHaveAttribute("name", "quantity");
    expect(input).toHaveAttribute(
      "placeholder",
      "Enter quantity",
    );
  });

  it("supports default value", () => {
    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={42}
      />,
    );

    expect(screen.getByLabelText("Quantity")).toHaveValue(42);
  });
});
