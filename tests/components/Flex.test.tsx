import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Flex } from "../../packages/react/components/base/Flex/Flex";

describe("Flex Component", () => {
  it("renders as div with aui-flex class", () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toBeDefined();
  });

  it("applies direction class (default row)", () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--row");
  });

  it("applies custom direction class", () => {
    const { container } = render(<Flex direction="column">Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--column");
  });

  it("applies align class", () => {
    const { container } = render(<Flex align="center">Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--align-center");
  });

  it("applies justify class", () => {
    const { container } = render(<Flex justify="between">Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--justify-between");
  });

  it("applies gap class", () => {
    const { container } = render(<Flex gap="4">Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--gap-4");
  });

  it("applies wrap class when wrap is true", () => {
    const { container } = render(<Flex wrap>Content</Flex>);
    const element = container.querySelector(".aui-flex");
    expect(element).toHaveClass("aui-flex--wrap");
  });

  it("renders children", () => {
    render(<Flex>Test Content</Flex>);
    expect(screen.getByText("Test Content")).toBeDefined();
  });
});
