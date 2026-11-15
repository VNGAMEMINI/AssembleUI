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
    expect(checkbox.id).not.toBe("");
  });

  it("keeps its generated id stable across rerenders", () => {
    const { rerender } = render(
      <Checkbox
        label="Accept terms"
        description="Initial description"
      />,
    );

    const checkbox = screen.getByLabelText("Accept terms");
    const initialId = checkbox.id;

    rerender(
      <Checkbox
        label="Accept terms"
        description="Updated description"
      />,
    );

    expect(screen.getByLabelText("Accept terms")).toHaveAttribute(
      "id",
      initialId,
    );
  });

  it("generates unique ids for multiple instances", () => {
    render(
      <>
        <Checkbox label="Terms" />
        <Checkbox label="Privacy" />
      </>,
    );

    const terms = screen.getByLabelText("Terms");
    const privacy = screen.getByLabelText("Privacy");

    expect(terms.id).not.toBe(privacy.id);
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

  it("preserves external aria-describedby", () => {
    render(
      <Checkbox aria-describedby="external-help" />,
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "external-help",
    );
  });

  it("merges external aria-describedby with generated description", () => {
    render(
      <Checkbox
        aria-describedby="external-help"
        description="Additional information"
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    const description = screen.getByText(
      "Additional information",
    );

    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      `external-help ${description.id}`,
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
