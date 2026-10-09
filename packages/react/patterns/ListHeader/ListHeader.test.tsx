import { vi } from "vitest";
import {
  createRef,
} from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { ListHeader } from "./ListHeader";

describe("ListHeader", () => {
  it("renders title", () => {
    render(<ListHeader title="Users" />);

    expect(
      screen.getByRole("heading", {
        name: "Users",
      }),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <ListHeader
        title="Users"
        description="Manage application users."
      />,
    );

    expect(
      screen.getByText("Manage application users."),
    ).toBeInTheDocument();
  });

  it("renders count", () => {
    render(
      <ListHeader
        title="Users"
        count="24 users"
      />,
    );

    expect(
      screen.getByText("24 users"),
    ).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <ListHeader
        title="Users"
        actions={<button type="button">Add user</button>}
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
      <ListHeader
        title={<span>Custom title</span>}
        count={<strong>10</strong>}
        actions={
          <button type="button">
            Action
          </button>
        }
      />,
    );

    expect(screen.getByText("Custom title")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(
      <ListHeader
        title="Users"
        data-testid="list-header"
        aria-label="Users list header"
      />,
    );

    const header = screen.getByTestId("list-header");

    expect(header).toHaveAttribute(
      "aria-label",
      "Users list header",
    );
  });

  it("supports className", () => {
    render(
      <ListHeader
        title="Users"
        className="custom-header"
        data-testid="list-header"
      />,
    );

    expect(
      screen.getByTestId("list-header"),
    ).toHaveClass("aui-list-header", "custom-header");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <ListHeader
        ref={ref}
        title="Users"
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("HEADER");
  });

  it("supports interactive actions", () => {
    const handleClick = vi.fn();

    render(
      <ListHeader
        title="Users"
        actions={
          <button
            type="button"
            onClick={handleClick}
          >
            Refresh
          </button>
        }
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Refresh",
      }),
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
