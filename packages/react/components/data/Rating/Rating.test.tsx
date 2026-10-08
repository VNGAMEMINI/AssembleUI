import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renders the default number of stars", () => {
    render(<Rating />);

    expect(
      screen.getAllByRole("button"),
    ).toHaveLength(5);
  });

  it("supports a custom maximum", () => {
    render(<Rating max={10} />);

    expect(
      screen.getAllByRole("button"),
    ).toHaveLength(10);
  });

  it("supports a default value", () => {
    render(<Rating defaultValue={3} />);

    expect(
      screen.getByRole("group"),
    ).toHaveAttribute("aria-label", "Rating: 3 out of 5");
  });

  it("calls onChange when a star is selected", () => {
    const onChange = vi.fn();

    render(<Rating onChange={onChange} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Set rating to 4",
      }),
    );

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not change when readOnly", () => {
    const onChange = vi.fn();

    render(
      <Rating
        defaultValue={2}
        readOnly
        onChange={onChange}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Set rating to 4",
    });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports controlled values", () => {
    render(<Rating value={3.5} />);

    expect(
      screen.getByRole("group"),
    ).toHaveAttribute("aria-label", "Rating: 3.5 out of 5");
  });
});
