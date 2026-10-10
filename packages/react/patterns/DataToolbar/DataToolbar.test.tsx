import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataToolbar } from "./DataToolbar";

describe("DataToolbar", () => {
  it("renders title", () => {
    render(<DataToolbar title="Users" />);

    expect(
      screen.getByText("Users"),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <DataToolbar
        title="Users"
        description="Manage users"
      />,
    );

    expect(
      screen.getByText("Manage users"),
    ).toBeInTheDocument();
  });

  it("renders filters", () => {
    render(
      <DataToolbar
        filters={
          <input aria-label="Search" />
        }
      />,
    );

    expect(
      screen.getByRole("textbox", {
        name: "Search",
      }),
    ).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <DataToolbar
        actions={
          <button type="button">
            Add user
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Add user",
      }),
    ).toBeInTheDocument();
  });

  it("supports ReactNode content", () => {
    render(
      <DataToolbar
        title={<strong>Custom title</strong>}
        filters={<div>Custom filters</div>}
        actions={<div>Custom actions</div>}
      />,
    );

    expect(
      screen.getByText("Custom title"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Custom filters"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Custom actions"),
    ).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(
      <DataToolbar
        aria-label="Data controls"
        data-testid="data-toolbar"
      />,
    );

    expect(
      screen.getByTestId("data-toolbar"),
    ).toHaveAttribute(
      "aria-label",
      "Data controls",
    );
  });

  it("supports className", () => {
    render(
      <DataToolbar
        className="custom-toolbar"
        data-testid="data-toolbar"
      />,
    );

    expect(
      screen.getByTestId("data-toolbar"),
    ).toHaveClass("custom-toolbar");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <DataToolbar
        ref={ref}
        data-testid="data-toolbar"
      />,
    );

    expect(ref.current).toBe(
      screen.getByTestId("data-toolbar"),
    );
  });

  it("supports interactive actions", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <DataToolbar
        actions={
          <button
            type="button"
            onClick={onClick}
          >
            Apply
          </button>
        }
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Apply",
      }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
