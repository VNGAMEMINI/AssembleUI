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
  Card,
} from "./Card";

describe("Card", () => {
  it("renders content", () => {
    render(
      <Card>
        <h2>Profile</h2>
        <p>User information</p>
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Profile"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("User information"),
    ).toBeInTheDocument();
  });

  it("uses the default variant", () => {
    render(
      <Card>
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--default",
    );
  });

  it("applies the outlined variant", () => {
    render(
      <Card variant="outlined">
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--outlined",
    );
  });

  it("uses medium padding by default", () => {
    render(
      <Card>
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--padding-md",
    );
  });

  it("applies custom padding", () => {
    render(
      <Card padding="lg">
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--padding-lg",
    );
  });

  it("supports no padding", () => {
    render(
      <Card padding="none">
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--padding-none",
    );
  });

  it("applies elevated styling", () => {
    render(
      <Card elevated>
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "aui-card--elevated",
    );
  });

  it("forwards native attributes", () => {
    render(
      <Card
        data-testid="profile-card"
        aria-label="Profile"
      >
        Profile
      </Card>,
    );

    const card =
      screen.getByTestId(
        "profile-card",
      );

    expect(card).toHaveAttribute(
      "aria-label",
      "Profile",
    );
  });

  it("forwards a ref to the article element", () => {
    let cardElement:
      | HTMLElement
      | null = null;

    render(
      <Card
        ref={(element) => {
          cardElement = element;
        }}
      >
        Content
      </Card>,
    );

    expect(cardElement).toBeInstanceOf(
      HTMLElement,
    );

    const renderedCard =
      screen.getByRole("article");

    expect(renderedCard).toBe(
      cardElement,
    );

    expect(renderedCard.tagName).toBe(
      "ARTICLE",
    );
  });

  it("allows custom class names", () => {
    render(
      <Card className="custom-card">
        Content
      </Card>,
    );

    expect(
      screen.getByRole("article"),
    ).toHaveClass(
      "custom-card",
    );
  });
});
