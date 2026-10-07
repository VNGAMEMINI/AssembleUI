import { createRef } from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../../components/forms/Input";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("renders filter fields", () => {
    render(
      <FilterBar
        fields={[
          {
            id: "search",
            label: "Search",
            control: <Input aria-label="Search input" />,
          },
          {
            id: "status",
            label: "Status",
            control: (
              <select aria-label="Status">
                <option value="all">All</option>
              </select>
            ),
          },
        ]}
      />,
    );

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Search input"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Status"),
    ).toBeInTheDocument();
  });

  it("renders submit and reset actions", () => {
    render(
      <FilterBar
        fields={[]}
        submitLabel="Apply filters"
        resetLabel="Clear filters"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Apply filters",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Clear filters",
      }),
    ).toBeInTheDocument();
  });

  it("supports custom controls", () => {
    render(
      <FilterBar
        fields={[
          {
            id: "custom",
            control: (
              <div data-testid="custom-control">
                Custom control
              </div>
            ),
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("custom-control"),
    ).toBeInTheDocument();
  });

  it("calls onSubmit", () => {
    const onSubmit = vi.fn((event) => {
      event.preventDefault();
    });

    render(
      <FilterBar
        fields={[]}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Apply",
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onReset", () => {
    const onReset = vi.fn();

    render(
      <FilterBar
        fields={[]}
        onReset={onReset}
      />,
    );

    fireEvent.reset(
      screen.getByRole("button", {
        name: "Reset",
      }).closest("form")!,
    );

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("supports native form props", () => {
    render(
      <FilterBar
        fields={[]}
        aria-label="Filters"
        data-testid="filter-form"
      />,
    );

    const form = screen.getByTestId("filter-form");

    expect(form).toHaveAttribute(
      "aria-label",
      "Filters",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLFormElement>();

    render(
      <FilterBar
        ref={ref}
        fields={[]}
      />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLFormElement,
    );
  });

  it("supports hiding the submit action", () => {
    render(
      <FilterBar
        fields={[]}
        submitLabel={null}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Apply",
      }),
    ).not.toBeInTheDocument();
  });

  it("supports hiding the reset action", () => {
    render(
      <FilterBar
        fields={[]}
        resetLabel={null}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Reset",
      }),
    ).not.toBeInTheDocument();
  });
});
