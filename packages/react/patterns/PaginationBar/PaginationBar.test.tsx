import { createRef } from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaginationBar } from "./PaginationBar";

describe("PaginationBar", () => {
  it("renders the summary", () => {
    render(
      <PaginationBar
        page={2}
        totalPages={5}
        onPageChange={() => undefined}
        summary="Showing 11–20 of 50"
      />,
    );

    expect(
      screen.getByText("Showing 11–20 of 50"),
    ).toBeInTheDocument();
  });

  it("renders pagination controls", () => {
    render(
      <PaginationBar
        page={2}
        totalPages={5}
        onPageChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("navigation", {
        name: "Pagination controls",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Next page" }),
    ).toBeInTheDocument();
  });

  it("forwards page changes", () => {
    const onPageChange = vi.fn();

    render(
      <PaginationBar
        page={2}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Next page" }),
    );

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("supports siblingCount", () => {
    render(
      <PaginationBar
        page={5}
        totalPages={10}
        siblingCount={0}
        onPageChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Page 1" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Page 5" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Page 10" }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("supports a custom aria-label", () => {
    render(
      <PaginationBar
        page={1}
        totalPages={3}
        onPageChange={() => undefined}
        aria-label="Search results pagination"
      />,
    );

    expect(
      screen.getByRole("navigation", {
        name: "Search results pagination",
      }),
    ).toBeInTheDocument();
  });

  it("supports native navigation attributes", () => {
    render(
      <PaginationBar
        page={1}
        totalPages={3}
        onPageChange={() => undefined}
        data-testid="pagination-bar"
      />,
    );

    expect(
      screen.getByTestId("pagination-bar"),
    ).toBeInTheDocument();
  });

  it("forwards a ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <PaginationBar
        ref={ref}
        page={1}
        totalPages={3}
        onPageChange={() => undefined}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("supports custom summary content", () => {
    render(
      <PaginationBar
        page={1}
        totalPages={3}
        onPageChange={() => undefined}
        summary={<strong>25 results</strong>}
      />,
    );

    expect(screen.getByText("25 results")).toBeInTheDocument();
  });
});
