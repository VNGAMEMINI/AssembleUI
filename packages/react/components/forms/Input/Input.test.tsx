import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders input", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Input label="Username" />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Input label="Username" />);

    const input = screen.getByLabelText("Username");

    expect(input).toHaveAttribute("id");
    expect(input.id).toMatch(/^aui-input-\d+$/);
  });

  it("preserves a provided id", () => {
    render(<Input id="username" label="Username" />);

    expect(screen.getByLabelText("Username")).toHaveAttribute(
      "id",
      "username",
    );
  });

  it("connects description through aria-describedby", () => {
    render(
      <Input
        label="Username"
        description="Enter your username"
      />,
    );

    const input = screen.getByLabelText("Username");
    const description = screen.getByText("Enter your username");

    expect(input).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("marks the input invalid when error exists", () => {
    render(
      <Input
        label="Username"
        error="Username is required"
      />,
    );

    const input = screen.getByLabelText("Username");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("aui-input--invalid");
  });

  it("connects error through aria-describedby", () => {
    render(
      <Input
        label="Username"
        error="Username is required"
      />,
    );

    const input = screen.getByLabelText("Username");
    const error = screen.getByRole("alert");

    expect(input).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("uses error description when both description and error exist", () => {
    render(
      <Input
        label="Username"
        description="Enter your username"
        error="Username is invalid"
      />,
    );

    const input = screen.getByLabelText("Username");
    const error = screen.getByRole("alert");

    expect(
      screen.queryByText("Enter your username"),
    ).not.toBeInTheDocument();

    expect(input).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("supports disabled", () => {
    render(<Input label="Username" disabled />);

    expect(screen.getByLabelText("Username")).toBeDisabled();
  });

  it("supports required", () => {
    render(<Input label="Username" required />);

    const input = screen.getByRole("textbox");

    expect(input).toBeRequired();
    expect(input).toHaveAttribute("required");
  });

  it("preserves native input attributes", () => {
    render(
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
        autoComplete="email"
        data-testid="email-input"
        aria-label="Email address"
      />,
    );

    const input = screen.getByTestId("email-input");

    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute(
      "placeholder",
      "Enter email",
    );
    expect(input).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(input).toHaveAttribute(
      "aria-label",
      "Email address",
    );
  });

  it("preserves className", () => {
    render(
      <Input
        label="Username"
        className="custom-input"
      />,
    );

    expect(screen.getByLabelText("Username")).toHaveClass(
      "aui-input",
      "custom-input",
    );
  });

  it("forwards ref to the native input", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} label="Username" />);

    expect(ref.current).toBe(
      screen.getByLabelText("Username"),
    );
  });
});
