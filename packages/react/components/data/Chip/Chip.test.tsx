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

  it("uses the neutral variant by default", () => {
    render(<Chip>React</Chip>);

    expect(screen.getByText("React").parentElement).toHaveClass(
      "aui-chip--neutral",
    );
  });

  it("supports variants", () => {
    render(<Chip variant="success">Active</Chip>);

    expect(screen.getByText("Active").parentElement).toHaveClass(
      "aui-chip--success",
    );
  });

  it("supports sizes", () => {
    render(<Chip size="lg">Large</Chip>);

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
