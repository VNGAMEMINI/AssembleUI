import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders", () => {
    render(<Toggle>Toggle</Toggle>);

    expect(
      screen.getByRole("button", {
        name: "Toggle",
      }),
    ).toBeInTheDocument();
  });

  it("starts unpressed by default", () => {
    render(<Toggle>Toggle</Toggle>);

    expect(
      screen.getByRole("button"),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("supports defaultPressed", () => {
    render(
      <Toggle defaultPressed>
        Toggle
      </Toggle>,
    );

    expect(
      screen.getByRole("button"),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles uncontrolled state", () => {
    render(<Toggle>Toggle</Toggle>);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(button);

    expect(button).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onPressedChange", () => {
    const onPressedChange = vi.fn();

    render(
      <Toggle onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onPressedChange).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole("button"));

    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it("supports controlled state", () => {
    const { rerender } = render(
      <Toggle pressed={false}>
        Toggle
      </Toggle>,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    fireEvent.click(button);

    expect(button).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    rerender(
      <Toggle pressed>
        Toggle
      </Toggle>,
    );

    expect(button).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("forwards ref", () => {
    const ref = {
      current: null,
    };

    render(
      <Toggle ref={ref}>
        Toggle
      </Toggle>,
    );

    expect(ref.current).toBe(
      screen.getByRole("button"),
    );
  });
});
