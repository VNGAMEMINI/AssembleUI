import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from "../../packages/react/components/base/Stack/Stack";

describe("Stack Component", () => {
  it("renders as div with aui-stack class", () => {
    const { container } = render(<Stack>Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toBeDefined();
  });

  it("applies vertical direction by default", () => {
    const { container } = render(<Stack>Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toHaveClass("aui-stack--vertical");
  });

  it("applies horizontal direction when specified", () => {
    const { container } = render(<Stack direction="horizontal">Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toHaveClass("aui-stack--horizontal");
  });

  it("applies spacing class", () => {
    const { container } = render(<Stack spacing="4">Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toHaveClass("aui-stack--spacing-4");
  });

  it("defaults to spacing 4", () => {
    const { container } = render(<Stack>Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toHaveClass("aui-stack--spacing-4");
  });

  it("renders children", () => {
    render(<Stack>Test Content</Stack>);
    expect(screen.getByText("Test Content")).toBeDefined();
  });

  it("merges custom className", () => {
    const { container } = render(<Stack className="custom">Content</Stack>);
    const element = container.querySelector(".aui-stack");
    expect(element).toHaveClass("aui-stack", "custom");
  });
});
