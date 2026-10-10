import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with the default size and status role", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("aui-spinner", "aui-spinner--md");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("renders all supported sizes", () => {
    const { rerender } = render(<Spinner />);

    for (const size of ["sm", "md", "lg"] as const) {
      rerender(<Spinner size={size} />);

      expect(screen.getByRole("status")).toHaveClass(
        "aui-spinner",
        `aui-spinner--${size}`,
      );
    }
  });

  it("supports a custom accessible label", () => {
    render(<Spinner label="Saving changes" />);

    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Saving changes",
    );
  });

  it("forwards native attributes", () => {
    render(
      <Spinner
        id="loading-spinner"
        data-testid="loading-spinner"
        aria-live="polite"
      />,
    );

    const spinner = screen.getByTestId("loading-spinner");

    expect(spinner).toHaveAttribute("id", "loading-spinner");
    expect(spinner).toHaveAttribute("aria-live", "polite");
  });

  it("merges custom class names", () => {
    render(<Spinner className="custom-spinner" />);

    expect(screen.getByRole("status")).toHaveClass(
      "aui-spinner",
      "aui-spinner--md",
      "custom-spinner",
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Spinner ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("aui-spinner");
  });

  it("allows overriding the default role", () => {
    render(<Spinner role="progressbar" />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
