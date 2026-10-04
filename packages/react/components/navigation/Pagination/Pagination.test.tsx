import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders page navigation", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("navigation", {
        name: "Pagination",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Page 1",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom aria-label", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={() => {}}
        aria-label="Search result pages"
      />,
    );

    expect(
      screen.getByRole("navigation", {
        name: "Search result pages",
      }),
    ).toBeInTheDocument();
  });

  it("marks the current page", () => {
    render(
      <Pagination
        page={3}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 3",
      }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("disables previous on the first page", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    ).toBeDisabled();
  });

  it("disables next on the last page", () => {
    render(
      <Pagination
        page={5}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Next page",
      }),
    ).toBeDisabled();
  });

  it("changes to the selected page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={2}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Page 3",
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("changes page with previous and next", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={3}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(2);

    await user.click(
      screen.getByRole("button", {
        name: "Next page",
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("renders ellipsis for large page ranges", () => {
    render(
      <Pagination
        page={5}
        totalPages={10}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("clamps an invalid current page", () => {
    render(
      <Pagination
        page={99}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 5",
      }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("normalizes non-positive total pages", () => {
    render(
      <Pagination
        page={1}
        totalPages={0}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 1",
      }),
    ).toHaveAttribute("aria-current", "page");

    expect(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Next page",
      }),
    ).toBeDisabled();
  });

  it("normalizes a negative sibling count", () => {
    render(
      <Pagination
        page={5}
        totalPages={10}
        siblingCount={-3}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 1",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Page 10",
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("normalizes non-finite pagination values", () => {
    render(
      <Pagination
        page={Number.NaN}
        totalPages={Number.POSITIVE_INFINITY}
        siblingCount={Number.POSITIVE_INFINITY}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 1",
      }),
    ).toHaveAttribute("aria-current", "page");

    expect(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Next page",
      }),
    ).toBeDisabled();
  });

  it("normalizes fractional pagination values", () => {
    render(
      <Pagination
        page={3.8}
        totalPages={5.9}
        siblingCount={1.9}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Page 3",
      }),
    ).toHaveAttribute("aria-current", "page");

    expect(
      screen.getByRole("button", {
        name: "Page 5",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Page 5.9",
      }),
    ).not.toBeInTheDocument();
  });

  it("supports className", () => {
    render(
      <Pagination
        page={1}
        totalPages={3}
        onPageChange={() => {}}
        className="custom-pagination"
      />,
    );

    expect(screen.getByRole("navigation")).toHaveClass(
      "aui-pagination",
      "custom-pagination",
    );
  });
});
