import type { RefObject } from "react";

import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("uses the neutral variant by default", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toHaveClass("aui-badge--neutral");
  });

  it("supports variants", () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText("Active")).toHaveClass("aui-badge--success");
  });

  it("supports sizes", () => {
    render(<Badge size="sm">Small</Badge>);

    expect(screen.getByText("Small")).toHaveClass("aui-badge--sm");
  });

  it("merges custom className", () => {
    render(<Badge className="custom-badge">Custom</Badge>);

    expect(screen.getByText("Custom")).toHaveClass("aui-badge", "custom-badge");
  });

  it("forwards native span attributes", () => {
    render(
      <Badge data-testid="badge" title="Status">
        Ready
      </Badge>,
    );

    const badge = screen.getByTestId("badge");

    expect(badge).toHaveAttribute("title", "Status");
  });

  it("forwards ref to the native span", () => {
    const ref = {
      current: null,
    } as RefObject<HTMLSpanElement | null>;

    render(<Badge ref={ref}>Ref</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
