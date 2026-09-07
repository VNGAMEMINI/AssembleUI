import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
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

    expect(button).toHaveClass("aui-button--danger", "aui-button--large");
  });

  it("supports disabled state", () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("preserves className", () => {
    render(<Button className="custom-button">Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
      "custom-button",
    );
  });
});
