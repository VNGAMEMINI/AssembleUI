import { createRef } from "react";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>React</Chip>);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("uses neutral and md by default", () => {
    render(<Chip>React</Chip>);

    expect(screen.getByText("React").parentElement).toHaveClass(
      "aui-chip",
      "aui-chip--neutral",
      "aui-chip--md",
    );
  });

  it("supports every declared variant", () => {
    const { rerender } = render(<Chip variant="neutral">Neutral</Chip>);

    expect(screen.getByText("Neutral").parentElement).toHaveClass(
      "aui-chip--neutral",
    );

    rerender(<Chip variant="primary">Primary</Chip>);

    expect(screen.getByText("Primary").parentElement).toHaveClass(
      "aui-chip--primary",
    );

    rerender(<Chip variant="success">Success</Chip>);

    expect(screen.getByText("Success").parentElement).toHaveClass(
      "aui-chip--success",
    );

    rerender(<Chip variant="warning">Warning</Chip>);

    expect(screen.getByText("Warning").parentElement).toHaveClass(
      "aui-chip--warning",
    );

    rerender(<Chip variant="danger">Danger</Chip>);

    expect(screen.getByText("Danger").parentElement).toHaveClass(
      "aui-chip--danger",
    );
  });

  it("supports all sizes", () => {
    const { rerender } = render(<Chip size="sm">Small</Chip>);

    expect(screen.getByText("Small").parentElement).toHaveClass(
      "aui-chip--sm",
    );

    rerender(<Chip size="md">Medium</Chip>);

    expect(screen.getByText("Medium").parentElement).toHaveClass(
      "aui-chip--md",
    );

    rerender(<Chip size="lg">Large</Chip>);

    expect(screen.getByText("Large").parentElement).toHaveClass(
      "aui-chip--lg",
    );
  });

  it("merges custom className", () => {
    render(
      <Chip className="custom-chip">
        Custom
      </Chip>,
    );

    expect(screen.getByText("Custom").parentElement).toHaveClass(
      "aui-chip",
      "custom-chip",
    );
  });

  it("forwards native span attributes", () => {
    render(
      <Chip
        data-testid="chip"
        title="Technology"
      >
        React
      </Chip>,
    );

    expect(screen.getByTestId("chip")).toHaveAttribute(
      "title",
      "Technology",
    );
  });

  it("forwards ref to the native span", () => {
    const ref = createRef<HTMLSpanElement>();

    render(<Chip ref={ref}>React</Chip>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("does not render remove button by default", () => {
    render(<Chip>React</Chip>);

    expect(
      screen.queryByRole("button", { name: "Remove" }),
    ).not.toBeInTheDocument();
  });

  it("renders remove button when removable", () => {
    render(
      <Chip removable>
        React
      </Chip>,
    );

    expect(
      screen.getByRole("button", { name: "Remove" }),
    ).toBeInTheDocument();
  });

  it("supports a custom remove label", () => {
    render(
      <Chip
        removable
        removeLabel="Remove React"
      >
        React
      </Chip>,
    );

    expect(
      screen.getByRole("button", { name: "Remove React" }),
    ).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();

    render(
      <Chip
        removable
        onRemove={onRemove}
      >
        React
      </Chip>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Remove" }),
    );

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
