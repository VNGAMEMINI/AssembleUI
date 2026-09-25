import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with the default text variant", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass(
      "aui-skeleton",
      "aui-skeleton--text",
    );
    expect(skeleton).toHaveAttribute("aria-label", "Loading");
  });

  it("supports all variants", () => {
    const { rerender } = render(
      <Skeleton data-testid="skeleton" variant="text" />,
    );

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "aui-skeleton--text",
    );

    rerender(
      <Skeleton data-testid="skeleton" variant="circular" />,
    );

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "aui-skeleton--circular",
    );

    rerender(
      <Skeleton data-testid="skeleton" variant="rectangular" />,
    );

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "aui-skeleton--rectangular",
    );
  });

  it("supports custom width and height", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        width="240px"
        height="80px"
      />,
    );

    expect(screen.getByTestId("skeleton")).toHaveStyle({
      width: "240px",
      height: "80px",
    });
  });

  it("preserves user style while applying width and height", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        style={{ marginTop: "12px" }}
        width="200px"
        height="60px"
      />,
    );

    expect(screen.getByTestId("skeleton")).toHaveStyle({
      marginTop: "12px",
      width: "200px",
      height: "60px",
    });
  });

  it("supports a custom aria-label", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        aria-label="Loading profile"
      />,
    );

    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "aria-label",
      "Loading profile",
    );
  });

  it("forwards native HTML attributes", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        id="profile-skeleton"
        title="Loading profile"
      />,
    );

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveAttribute("id", "profile-skeleton");
    expect(skeleton).toHaveAttribute("title", "Loading profile");
  });

  it("merges custom className", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        className="custom-skeleton"
      />,
    );

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "aui-skeleton",
      "aui-skeleton--text",
      "custom-skeleton",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Skeleton ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("aui-skeleton");
  });
});
