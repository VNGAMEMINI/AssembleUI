import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";

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

describe("IconButton", () => {
  it("renders the provided icon", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
      />,
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("uses md size by default", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
      />,
    );

    expect(screen.getByRole("button", {
      name: "Settings",
    })).toHaveClass("aui-icon-button--md");
  });

  it("supports custom sizes", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
        size="lg"
      />,
    );

    expect(screen.getByRole("button", {
      name: "Settings",
    })).toHaveClass("aui-icon-button--lg");
  });

  it("provides an accessible button name", () => {
    render(
      <IconButton
        label="Delete"
        icon={<TestIcon />}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("uses button type by default", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toHaveAttribute("type", "button");
  });

  it("supports custom button type", () => {
    render(
      <IconButton
        label="Submit"
        icon={<TestIcon />}
        type="submit"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Submit" }),
    ).toHaveAttribute("type", "submit");
  });

  it("forwards disabled state", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
        disabled
      />,
    );

    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeDisabled();
  });

  it("forwards native button attributes", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
        data-testid="icon-button"
      />,
    );

    expect(
      screen.getByTestId("icon-button"),
    ).toBeInTheDocument();
  });

  it("supports className", () => {
    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
        className="custom-button"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toHaveClass("custom-button");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <IconButton
        ref={ref}
        label="Settings"
        icon={<TestIcon />}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("handles click events", () => {
    const onClick = vi.fn();

    render(
      <IconButton
        label="Settings"
        icon={<TestIcon />}
        onClick={onClick}
      />,
    );

    screen.getByRole("button", {
      name: "Settings",
    }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
