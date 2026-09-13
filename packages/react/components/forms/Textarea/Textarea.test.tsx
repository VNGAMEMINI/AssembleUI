import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders textarea", () => {
    render(<Textarea />);

    expect(
      screen.getByRole("textbox"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Textarea label="Description" />);

    expect(
      screen.getByLabelText("Description"),
    ).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Textarea label="Description" />);

    const textarea =
      screen.getByLabelText("Description");

    expect(textarea).toHaveAttribute("id");
    expect(textarea.id).toMatch(
      /^aui-textarea-\d+$/,
    );
  });

  it("preserves a provided id", () => {
    render(
      <Textarea
        id="description"
        label="Description"
      />,
    );

    expect(
      screen.getByLabelText("Description"),
    ).toHaveAttribute(
      "id",
      "description",
    );
  });

  it("supports value", () => {
    render(
      <Textarea
        label="Description"
        value="Hello"
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByLabelText("Description"),
    ).toHaveValue("Hello");
  });

  it("supports defaultValue", () => {
    render(
      <Textarea
        label="Description"
        defaultValue="Hello"
      />,
    );

    expect(
      screen.getByLabelText("Description"),
    ).toHaveValue("Hello");
  });

  it("supports disabled", () => {
    render(
      <Textarea
        label="Description"
        disabled
      />,
    );

    expect(
      screen.getByLabelText("Description"),
    ).toBeDisabled();
  });

  it("supports required", () => {
    render(
      <Textarea
        label="Description"
        required
      />,
    );

    const textarea =
      screen.getByRole("textbox");

    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute(
      "required",
    );

    expect(
      screen.getByText("Description"),
    ).toBeInTheDocument();
  });

  it("connects description through aria-describedby", () => {
    render(
      <Textarea
        label="Description"
        description="Enter a short description."
      />,
    );

    const textarea =
      screen.getByLabelText("Description");

    const description = screen.getByText(
      "Enter a short description.",
    );

    expect(textarea).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("connects error through aria-describedby", () => {
    render(
      <Textarea
        label="Description"
        error="Description is required."
      />,
    );

    const textarea =
      screen.getByLabelText("Description");

    const error = screen.getByRole("alert");

    expect(textarea).toHaveAttribute(
      "aria-describedby",
      error.id,
    );

    expect(textarea).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("uses error instead of description", () => {
    render(
      <Textarea
        label="Description"
        description="Optional description."
        error="Description is invalid."
      />,
    );

    const textarea =
      screen.getByLabelText("Description");

    const error = screen.getByRole("alert");

    expect(
      screen.queryByText(
        "Optional description.",
      ),
    ).not.toBeInTheDocument();

    expect(textarea).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("supports native textarea attributes", () => {
    render(
      <Textarea
        label="Description"
        name="description"
        placeholder="Enter description"
        rows={5}
        maxLength={100}
        data-testid="description-textarea"
      />,
    );

    const textarea =
      screen.getByTestId(
        "description-textarea",
      );

    expect(textarea).toHaveAttribute(
      "name",
      "description",
    );

    expect(textarea).toHaveAttribute(
      "placeholder",
      "Enter description",
    );

    expect(textarea).toHaveAttribute(
      "rows",
      "5",
    );

    expect(textarea).toHaveAttribute(
      "maxlength",
      "100",
    );
  });

  it("forwards ref to the native textarea", () => {
    const ref =
      createRef<HTMLTextAreaElement>();

    render(
      <Textarea
        ref={ref}
        label="Description"
      />,
    );

    expect(ref.current).toBe(
      screen.getByLabelText("Description"),
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <Textarea
        label="Description"
        onChange={onChange}
      />,
    );

    const textarea = screen.getByLabelText("Description");

    fireEvent.change(textarea, {
      target: {
        value: "Hello",
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

});
