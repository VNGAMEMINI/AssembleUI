import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Icon } from "./Icon";

function TestIcon() {
  return (
    <svg
      data-testid="test-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2L22 22H2L12 2Z" />
    </svg>
  );
}

describe("Icon", () => {
  it("renders icon content", () => {
    render(
      <Icon>
        <TestIcon />
      </Icon>,
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("uses md size by default", () => {
    const { container } = render(
      <Icon>
        <TestIcon />
      </Icon>,
    );

    expect(container.firstChild).toHaveClass("aui-icon--md");
  });

  it("supports custom sizes", () => {
    const { container } = render(
      <Icon size="lg">
        <TestIcon />
      </Icon>,
    );

    expect(container.firstChild).toHaveClass("aui-icon--lg");
  });

  it("marks decorative icons as hidden", () => {
    render(
      <Icon>
        <TestIcon />
      </Icon>,
    );

    expect(screen.getByTestId("test-icon").parentElement)
      .toHaveAttribute("aria-hidden", "true");
  });

  it("creates an accessible icon when label is provided", () => {
    render(
      <Icon label="Settings">
        <TestIcon />
      </Icon>,
    );

    expect(screen.getByRole("img", { name: "Settings" }))
      .toBeInTheDocument();
  });

  it("supports className", () => {
    const { container } = render(
      <Icon className="custom-icon">
        <TestIcon />
      </Icon>,
    );

    expect(container.firstChild).toHaveClass("custom-icon");
  });

  it("forwards native attributes", () => {
    render(
      <Icon data-testid="icon">
        <TestIcon />
      </Icon>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Icon ref={ref}>
        <TestIcon />
      </Icon>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
