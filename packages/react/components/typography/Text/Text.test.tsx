import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as a paragraph by default", () => {
    render(<Text>Hello</Text>);

    expect(screen.getByText("Hello").tagName).toBe("P");
  });

  it("supports semantic elements", () => {
    render(<Text as="span">Inline text</Text>);

    expect(screen.getByText("Inline text").tagName).toBe("SPAN");
  });

  it("supports visual sizes", () => {
    render(<Text size="lg">Large text</Text>);

    expect(screen.getByText("Large text")).toHaveClass("aui-text--lg");
  });

  it("supports muted tone", () => {
    render(<Text tone="muted">Muted text</Text>);

    expect(screen.getByText("Muted text")).toHaveClass("aui-text--muted");
  });

  it("forwards native attributes", () => {
    render(
      <Text id="description" data-testid="text">
        Description
      </Text>,
    );

    expect(screen.getByTestId("text")).toHaveAttribute("id", "description");
  });

  it("merges custom class names", () => {
    render(
      <Text className="custom-text">
        Content
      </Text>,
    );

    expect(screen.getByText("Content")).toHaveClass(
      "aui-text",
      "custom-text",
    );
  });

  it("forwards refs", () => {
    let element: HTMLElement | null = null;

    render(
      <Text
        ref={(node) => {
          element = node;
        }}
      >
        Content
      </Text>,
    );

    expect(element).toBeInstanceOf(HTMLElement);
  });
});
