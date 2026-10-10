import {
  createRef,
} from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
} from "vitest";

import {
  EmptyState,
} from "./EmptyState";

describe("EmptyState", () => {
  it("renders the heading", () => {
    render(
      <EmptyState heading="No users found" />,
    );

    expect(
      screen.getByRole("heading", {
        name: "No users found",
      }),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <EmptyState
        heading="No users found"
        description="Try changing your search."
      />,
    );

    expect(
      screen.getByText(
        "Try changing your search.",
      ),
    ).toBeInTheDocument();
  });

  it("renders a custom icon", () => {
    render(
      <EmptyState
        heading="No results"
        icon={<span data-testid="empty-icon">Icon</span>}
      />,
    );

    expect(
      screen.getByTestId("empty-icon"),
    ).toBeInTheDocument();
  });

  it("hides the decorative icon from assistive technology", () => {
    render(
      <EmptyState
        heading="No results"
        icon={<span data-testid="empty-icon">Icon</span>}
      />,
    );

    expect(
      screen.getByTestId("empty-icon").parentElement,
    ).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders a custom action", () => {
    render(
      <EmptyState
        heading="No results"
        action={
          <button type="button">
            Create item
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Create item",
      }),
    ).toBeInTheDocument();
  });

  it("renders without optional content", () => {
    render(
      <EmptyState heading="Nothing here" />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Nothing here",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("empty-icon"),
    ).not.toBeInTheDocument();
  });

  it("forwards native attributes and className", () => {
    render(
      <EmptyState
        heading="No results"
        className="custom-empty-state"
        data-testid="empty-state"
        aria-label="Empty results"
      />,
    );

    const emptyState =
      screen.getByTestId("empty-state");

    expect(emptyState).toHaveClass(
      "aui-empty-state",
      "custom-empty-state",
    );

    expect(emptyState).toHaveAttribute(
      "aria-label",
      "Empty results",
    );
  });

  it("forwards the ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <EmptyState
        ref={ref}
        heading="No results"
        data-testid="empty-state-ref"
      />,
    );

    expect(ref.current).toBe(
      screen.getByTestId(
        "empty-state-ref",
      ),
    );
  });
});
