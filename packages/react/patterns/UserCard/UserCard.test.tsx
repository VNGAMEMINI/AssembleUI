import { createRef } from "react";

import { describe, expect, it } from "vitest";

import {
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

  it("renders a custom action", () => {
    render(
      <UserCard
        name="Jane Doe"
        action={
          <button type="button">
            View profile
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "View profile",
      }),
    ).toBeInTheDocument();
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

  it("renders the article structure", () => {
    const { container } = render(
      <UserCard
        name="Jane Doe"
        description="Frontend developer"
        badge="Admin"
        action={
          <button type="button">
            View profile
          </button>
        }
      />,
    );

    const card = container.firstElementChild;

    expect(card).toHaveClass("aui-user-card");
    expect(
      card?.querySelector(".aui-user-card__content"),
    ).toBeInTheDocument();
    expect(
      card?.querySelector(".aui-user-card__header"),
    ).toBeInTheDocument();
    expect(
      card?.querySelector(".aui-user-card__description"),
    ).toBeInTheDocument();
    expect(
      card?.querySelector(".aui-user-card__action"),
    ).toBeInTheDocument();
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

  it("forwards article attributes", () => {
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

    expect(ref.current?.tagName).toBe("ARTICLE");
  });
});
