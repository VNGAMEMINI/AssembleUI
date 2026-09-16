import {
  createRef,
} from "react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField>
        <input aria-label="Username" />
      </FormField>,
    );

    expect(
      screen.getByLabelText("Username"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(
      <FormField label="Username">
        <input />
      </FormField>,
    );

    expect(
      screen.getByText("Username"),
    ).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <FormField
        label="Username"
        required
      >
        <input />
      </FormField>,
    );

    expect(
      screen.getByText("*"),
    ).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders description", () => {
    render(
      <FormField description="Enter your username">
        <input />
      </FormField>,
    );

    expect(
      screen.getByText("Enter your username"),
    ).toBeInTheDocument();
  });

  it("renders error with alert role", () => {
    render(
      <FormField error="Username is required">
        <input />
      </FormField>,
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Username is required",
    );
  });

  it("prioritizes error over description", () => {
    render(
      <FormField
        description="Helpful text"
        error="Username is required"
      >
        <input />
      </FormField>,
    );

    expect(
      screen.getByText("Username is required"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Helpful text"),
    ).not.toBeInTheDocument();
  });

  it("applies invalid class when error exists", () => {
    const { container } = render(
      <FormField error="Invalid">
        <input />
      </FormField>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-form-field--invalid",
    );
  });

  it("merges className", () => {
    const { container } = render(
      <FormField className="custom-field">
        <input />
      </FormField>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-form-field",
      "custom-field",
    );
  });

  it("forwards div attributes", () => {
    render(
      <FormField
        data-testid="field"
        title="Account field"
      >
        <input />
      </FormField>,
    );

    expect(
      screen.getByTestId("field"),
    ).toHaveAttribute(
      "title",
      "Account field",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <FormField ref={ref}>
        <input />
      </FormField>,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLDivElement,
    );
  });
});
