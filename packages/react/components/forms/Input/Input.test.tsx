import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders an input", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Input label="Username" />);

    expect(
      screen.getByLabelText("Username"),
    ).toBeInTheDocument();
  });

  it("generates an id when id is not provided", () => {
    render(<Input label="Username" />);

    const input = screen.getByLabelText("Username");

    expect(input).toHaveAttribute("id");
    expect(input.id).toMatch(/^aui-input-/);
  });

  it("preserves a provided id", () => {
    render(
      <Input
        id="username"
        label="Username"
      />,
    );

    expect(
      screen.getByLabelText("Username"),
    ).toHaveAttribute("id", "username");
  });

  it("connects description with aria-describedby", () => {
    render(
      <Input
        label="Username"
        description="Enter your username"
      />,
    );

    const input = screen.getByLabelText("Username");
    const description = screen.getByText(
      "Enter your username",
    );

    expect(input).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("marks input invalid when error exists", () => {
    render(
      <Input
        label="Username"
        error="Username is required"
      />,
    );

    const input = screen.getByLabelText("Username");

    expect(input).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Username is required");
  });

  it("connects error with aria-describedby", () => {
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

  it("supports disabled state", () => {
    render(
      <Input
        label="Username"
        disabled
      />,
    );

    expect(
      screen.getByLabelText("Username"),
    ).toBeDisabled();
  });

  it("preserves className", () => {
    render(
      <Input
        className="custom-input"
        label="Username"
      />,
    );

    expect(
      screen.getByLabelText("Username"),
    ).toHaveClass("custom-input");
  });
});
