import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../packages/react/components/forms/Button/Button";

describe("Button Component", () => {
  it("renders as button element", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("applies default variant and size classes", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass(
      "aui-button",
      "aui-button--primary",
      "aui-button--md",
    );
  });

  it("applies custom variant", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("aui-button--danger");
  });

  it("applies custom size", () => {
    const { container } = render(<Button size="lg">Large Button</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("aui-button--lg");
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disables button when loading is true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows aria-busy when loading", () => {
    const { container } = render(<Button loading>Loading</Button>);
    const button = container.querySelector("button");
    expect(button?.getAttribute("aria-busy")).toBe("true");
  });

  it("applies loading class", () => {
    const { container } = render(<Button loading>Loading</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("aui-button--loading");
  });

  it("handles click events", async () => {
    const handleClick = { current: false };
    render(
      <Button
        onClick={() => {
          handleClick.current = true;
        }}
      >
        Click me
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick.current).toBe(true);
  });

  it("defaults type to button", () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.querySelector("button")?.getAttribute("type")).toBe(
      "button",
    );
  });
});
