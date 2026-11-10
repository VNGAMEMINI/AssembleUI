import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders as a range input", () => {
    render(<Slider aria-label="Volume" />);

    expect(screen.getByLabelText("Volume")).toHaveAttribute(
      "type",
      "range",
    );
  });

  it("supports numeric value", () => {
    render(
      <Slider
        aria-label="Volume"
        value={50}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Volume")).toHaveValue("50");
  });

  it("supports default value", () => {
    render(
      <Slider
        aria-label="Volume"
        defaultValue={25}
      />,
    );

    expect(screen.getByLabelText("Volume")).toHaveValue("25");
  });

  it("returns a number when the value changes", () => {
    const handleChange = vi.fn();

    render(
      <Slider
        aria-label="Volume"
        defaultValue={10}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Volume"), {
      target: { value: "75" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBe(75);
  });

  it("forwards min, max and step", () => {
    render(
      <Slider
        aria-label="Volume"
        min={0}
        max={100}
        step={5}
      />,
    );

    const slider = screen.getByLabelText("Volume");

    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("step", "5");
  });

  it("forwards standard input props", () => {
    render(
      <Slider
        aria-label="Volume"
        name="volume"
        disabled
      />,
    );

    const slider = screen.getByLabelText("Volume");

    expect(slider).toHaveAttribute("name", "volume");
    expect(slider).toBeDisabled();
  });

  it("forwards a ref", () => {
    const ref = { current: null as HTMLInputElement | null };

    render(
      <Slider
        aria-label="Volume"
        ref={ref}
      />,
    );

    expect(ref.current).toBe(
      screen.getByLabelText("Volume"),
    );
  });
});
