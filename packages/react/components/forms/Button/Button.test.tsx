import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);

    expect(
      screen.getByRole("button", { name: "Save" }),
    ).toBeInTheDocument();
  });

  it("uses the default variant and size", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", {
      name: "Save",
    });

    expect(button).toHaveClass(
      "aui-button",
      "aui-button--primary",
      "aui-button--medium",
    );
  });

  it("supports variant and size", () => {
    render(
      <Button variant="danger" size="large">
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button).toHaveClass(
      "aui-button--danger",
      "aui-button--large",
    );
  });

  it("supports disabled state", () => {
    render(<Button disabled>Save</Button>);

    expect(
      screen.getByRole("button", { name: "Save" }),
    ).toBeDisabled();
  });

  it("preserves className", () => {
    render(
      <Button className="custom-button">
        Save
      </Button>,
    );

    expect(
      screen.getByRole("button", { name: "Save" }),
    ).toHaveClass("custom-button");
  });

  it("preserves native button attributes", () => {
    render(
      <Button
        type="submit"
        name="action"
        value="save"
        aria-label="Save form"
        data-testid="save-button"
      >
        Save
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: "Save form",
    });

    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "save");
    expect(button).toHaveAttribute(
      "data-testid",
      "save-button",
    );
  });

  it("calls onClick", () => {
    const onClick = vi.fn();

    render(
      <Button onClick={onClick}>
        Save
      </Button>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save" }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save" }),
    );

    expect(onClick).not.toHaveBeenCalled();
  });
});
