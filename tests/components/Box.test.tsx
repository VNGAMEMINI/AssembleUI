import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from "../../packages/react/components/base/Box/Box";

describe("Box Component", () => {
  it("renders as div element", () => {
    const { container } = render(<Box>Content</Box>);
    expect(container.querySelector(".aui-box")).toBeDefined();
  });

  it("applies aui-box class", () => {
    const { container } = render(<Box>Content</Box>);
    const element = container.querySelector(".aui-box");
    expect(element).toHaveClass("aui-box");
  });

  it("merges custom className", () => {
    const { container } = render(<Box className="custom">Content</Box>);
    const element = container.querySelector(".aui-box");
    expect(element).toHaveClass("aui-box", "custom");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    const { container } = render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toEqual(container.querySelector(".aui-box"));
  });

  it("renders children", () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText("Test Content")).toBeDefined();
  });

  it("accepts native div props", () => {
    const { container } = render(<Box aria-label="test-box">Content</Box>);
    const element = container.querySelector(".aui-box");
    expect(element?.getAttribute("aria-label")).toBe("test-box");
  });
});
