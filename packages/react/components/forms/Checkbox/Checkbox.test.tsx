import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders checkbox", () => {
    render(<Checkbox />);

    expect(
      screen.getByRole("checkbox"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Checkbox label="Accept terms" />);

    expect(
      screen.getByLabelText("Accept terms"),
    ).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Checkbox label="Accept terms" />);

    const checkbox =
      screen.getByLabelText("Accept terms");

    expect(checkbox).toHaveAttribute("id");
    expect(checkbox.id).toMatch(
      /^aui-checkbox-\d+$/,
    );
  });

  it("preserves a provided id", () => {
    render(
      <Checkbox
        id="terms"
        label="Accept terms"
      />,
    );

    expect(
      screen.getByLabelText("Accept terms"),
    ).toHaveAttribute("id", "terms");
  });

  it("supports checked state", () => {
    render(
      <Checkbox
        label="Accept terms"
        checked
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByLabelText("Accept terms"),
    ).toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(
      <Checkbox
        label="Accept terms"
        defaultChecked
      />,
    );

    expect(
      screen.getByLabelText("Accept terms"),
    ).toBeChecked();
  });

  it("supports disabled", () => {
    render(
      <Checkbox
        label="Accept terms"
        disabled
      />,
    );

    expect(
      screen.getByLabelText("Accept terms"),
    ).toBeDisabled();
  });

  it("supports required", () => {
    render(
      <Checkbox
        label="Accept terms"
        required
      />,
    );

    const checkbox =
      screen.getByRole("checkbox");

    expect(checkbox).toBeRequired();
    expect(checkbox).toHaveAttribute(
      "required",
    );

    expect(
      screen.getByText("Accept terms"),
    ).toBeInTheDocument();
  });

  it("connects description through aria-describedby", () => {
    render(
      <Checkbox
        label="Accept terms"
        description="You must accept the terms."
      />,
    );

    const checkbox =
      screen.getByLabelText("Accept terms");
    const description = screen.getByText(
      "You must accept the terms.",
    );

    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("connects error through aria-describedby", () => {
    render(
      <Checkbox
        label="Accept terms"
        error="You must accept the terms."
      />,
    );

    const checkbox =
      screen.getByLabelText("Accept terms");
    const error = screen.getByRole("alert");

    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      error.id,
    );

    expect(checkbox).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("uses error instead of description when both exist", () => {
    render(
      <Checkbox
        label="Accept terms"
        description="Optional description"
        error="You must accept the terms."
      />,
    );

    const checkbox =
      screen.getByLabelText("Accept terms");
    const error = screen.getByRole("alert");

    expect(
      screen.queryByText("Optional description"),
    ).not.toBeInTheDocument();

    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("preserves native input attributes", () => {
    render(
      <Checkbox
        label="Accept terms"
        name="terms"
        value="accepted"
        data-testid="terms-checkbox"
        aria-label="Terms checkbox"
      />,
    );

    const checkbox =
      screen.getByTestId("terms-checkbox");

    expect(checkbox).toHaveAttribute(
      "name",
      "terms",
    );

    expect(checkbox).toHaveAttribute(
      "value",
      "accepted",
    );

    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Terms checkbox",
    );
  });

  it("forwards ref to the native checkbox", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Checkbox
        ref={ref}
        label="Accept terms"
      />,
    );

    expect(ref.current).toBe(
      screen.getByLabelText("Accept terms"),
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <Checkbox
        label="Accept terms"
        onChange={onChange}
      />,
    );

    screen
      .getByLabelText("Accept terms")
      .click();

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
