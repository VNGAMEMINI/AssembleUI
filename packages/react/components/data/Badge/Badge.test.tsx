import type { RefObject } from "react";

import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("uses neutral and md by default", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toHaveClass(
      "aui-badge",
      "aui-badge--neutral",
      "aui-badge--md",
    );
  });

  it("supports every declared variant", () => {
    const { rerender } = render(<Badge variant="neutral">Neutral</Badge>);

    expect(screen.getByText("Neutral")).toHaveClass("aui-badge--neutral");

    rerender(<Badge variant="success">Success</Badge>);

    expect(screen.getByText("Success")).toHaveClass("aui-badge--success");

    rerender(<Badge variant="warning">Warning</Badge>);

    expect(screen.getByText("Warning")).toHaveClass("aui-badge--warning");

    rerender(<Badge variant="danger">Danger</Badge>);

    expect(screen.getByText("Danger")).toHaveClass("aui-badge--danger");

    rerender(<Badge variant="info">Info</Badge>);

    expect(screen.getByText("Info")).toHaveClass("aui-badge--info");
  });

  it("supports all sizes", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);

    expect(screen.getByText("Small")).toHaveClass("aui-badge--sm");

    rerender(<Badge size="md">Medium</Badge>);

    expect(screen.getByText("Medium")).toHaveClass("aui-badge--md");

    rerender(<Badge size="lg">Large</Badge>);

    expect(screen.getByText("Large")).toHaveClass("aui-badge--lg");
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
