import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("renders children", () => {
    render(
      <Field>
        <input aria-label="Email" />
      </Field>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(
      <Field label="Email">
        <input id="email" />
      </Field>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("connects label with htmlFor", () => {
    render(
      <Field label="Email" htmlFor="email">
        <input id="email" />
      </Field>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <Field label="Email" required>
        <input />
      </Field>,
    );

    expect(screen.getByText("*")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders description", () => {
    render(
      <Field
        label="Email"
        description="Use your work email."
      >
        <input />
      </Field>,
    );

    expect(
      screen.getByText("Use your work email."),
    ).toBeInTheDocument();
  });

  it("renders error", () => {
    render(
      <Field
        label="Email"
        error="Invalid email."
      >
        <input />
      </Field>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid email.",
    );
  });

  it("forwards native div props", () => {
    render(
      <Field data-testid="field">
        <input />
      </Field>,
    );

    expect(screen.getByTestId("field")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Field
        className="custom-field"
        data-testid="field"
      >
        <input />
      </Field>,
    );

    expect(screen.getByTestId("field")).toHaveClass(
      "aui-field",
      "custom-field",
    );
  });
});
