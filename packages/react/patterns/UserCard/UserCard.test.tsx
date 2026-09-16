import {
  createRef,
} from "react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import { UserCard } from "./UserCard";

describe("UserCard", () => {
  it("renders user information", () => {
    render(
      <UserCard
        name="Jane Doe"
        description="Frontend developer"
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Jane Doe",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Frontend developer"),
    ).toBeInTheDocument();
  });

  it("composes Avatar", () => {
    render(
      <UserCard
        name="Jane Doe"
        avatarSrc="/avatar.png"
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Jane Doe",
      }),
    ).toBeInTheDocument();
  });

  it("composes Badge", () => {
    render(
      <UserCard
        name="Jane Doe"
        badge="Admin"
      />,
    );

    expect(
      screen.getByText("Admin"),
    ).toBeInTheDocument();
  });

  it("composes Button", () => {
    const onAction = vi.fn();

    render(
      <UserCard
        name="Jane Doe"
        actionLabel="View profile"
        onAction={onAction}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "View profile",
      }),
    );

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders without optional content", () => {
    render(
      <UserCard name="Jane Doe" />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Jane Doe",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button"),
    ).not.toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = render(
      <UserCard
        name="Jane Doe"
        className="custom-card"
      />,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-user-card",
      "custom-card",
    );
  });

  it("forwards div attributes", () => {
    render(
      <UserCard
        name="Jane Doe"
        data-testid="user-card"
      />,
    );

    expect(
      screen.getByTestId("user-card"),
    ).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <UserCard
        ref={ref}
        name="Jane Doe"
      />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLElement,
    );
  });
});
