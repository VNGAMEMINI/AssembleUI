import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Radio } from "./Radio";

describe("Radio", () => {
  it("renders radio", () => {
    render(<Radio />);

    expect(
      screen.getByRole("radio"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Radio label="Option A" />);

    expect(
      screen.getByLabelText("Option A"),
    ).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Radio label="Option A" />);

    const radio =
      screen.getByLabelText("Option A");

    expect(radio).toHaveAttribute("id");
    expect(radio.id).toMatch(
      /^aui-radio-\d+$/,
    );
  });

  it("preserves a provided id", () => {
    render(
      <Radio
        id="option-a"
        label="Option A"
      />,
    );

    expect(
      screen.getByLabelText("Option A"),
    ).toHaveAttribute("id", "option-a");
  });

  it("supports checked state", () => {
    render(
      <Radio
        label="Option A"
        checked
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByLabelText("Option A"),
    ).toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(
      <Radio
        label="Option A"
        defaultChecked
      />,
    );

    expect(
      screen.getByLabelText("Option A"),
    ).toBeChecked();
  });

  it("supports radio groups through name and value", () => {
    render(
      <>
        <Radio
          name="plan"
          value="basic"
          label="Basic"
        />
        <Radio
          name="plan"
          value="pro"
          label="Pro"
        />
      </>,
    );

    const basic =
      screen.getByLabelText("Basic");
    const pro =
      screen.getByLabelText("Pro");

    expect(basic).toHaveAttribute(
      "name",
      "plan",
    );
    expect(basic).toHaveAttribute(
      "value",
      "basic",
    );

    expect(pro).toHaveAttribute(
      "name",
      "plan",
    );
    expect(pro).toHaveAttribute(
      "value",
      "pro",
    );
  });

  it("supports disabled", () => {
    render(
      <Radio
        label="Option A"
        disabled
      />,
    );

    expect(
      screen.getByLabelText("Option A"),
    ).toBeDisabled();
  });

  it("supports required", () => {
    render(
      <Radio
        label="Option A"
        required
      />,
    );

    const radio =
      screen.getByRole("radio");

    expect(radio).toBeRequired();
    expect(radio).toHaveAttribute(
      "required",
    );

    expect(
      screen.getByText("Option A"),
    ).toBeInTheDocument();
  });

  it("connects description through aria-describedby", () => {
    render(
      <Radio
        label="Option A"
        description="Choose the basic plan."
      />,
    );

    const radio =
      screen.getByLabelText("Option A");
    const description = screen.getByText(
      "Choose the basic plan.",
    );

    expect(radio).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("connects error through aria-describedby", () => {
    render(
      <Radio
        label="Option A"
        error="This option is unavailable."
      />,
    );

    const radio =
      screen.getByLabelText("Option A");
    const error = screen.getByRole("alert");

    expect(radio).toHaveAttribute(
      "aria-describedby",
      error.id,
    );

    expect(radio).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("uses error instead of description when both exist", () => {
    render(
      <Radio
        label="Option A"
        description="Optional description"
        error="This option is invalid."
      />,
    );

    const radio =
      screen.getByLabelText("Option A");
    const error = screen.getByRole("alert");

    expect(
      screen.queryByText("Optional description"),
    ).not.toBeInTheDocument();

    expect(radio).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("preserves native input attributes", () => {
    render(
      <Radio
        label="Option A"
        name="plan"
        value="basic"
        data-testid="plan-radio"
        aria-label="Basic plan"
      />,
    );

    const radio =
      screen.getByTestId("plan-radio");

    expect(radio).toHaveAttribute(
      "name",
      "plan",
    );

    expect(radio).toHaveAttribute(
      "value",
      "basic",
    );

    expect(radio).toHaveAttribute(
      "aria-label",
      "Basic plan",
    );
  });

  it("forwards ref to the native radio", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Radio
        ref={ref}
        label="Option A"
      />,
    );

    expect(ref.current).toBe(
      screen.getByLabelText("Option A"),
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <Radio
        label="Option A"
        onChange={onChange}
      />,
    );

    screen
      .getByLabelText("Option A")
      .click();

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
