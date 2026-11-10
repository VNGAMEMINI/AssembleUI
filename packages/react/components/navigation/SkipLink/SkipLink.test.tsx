import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("renders the default label and target", () => {
    render(<SkipLink />);

    const link = screen.getByRole("link", {
      name: "Skip to main content",
    });

    expect(link).toHaveAttribute(
      "href",
      "#main-content",
    );
  });

  it("supports a custom target", () => {
    render(<SkipLink href="#content" />);

    expect(
      screen.getByRole("link"),
    ).toHaveAttribute("href", "#content");
  });

  it("supports custom content", () => {
    render(
      <SkipLink>
        Skip to content
      </SkipLink>,
    );

    expect(
      screen.getByRole("link", {
        name: "Skip to content",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom class name", () => {
    render(
      <SkipLink className="custom-skip-link" />,
    );

    expect(screen.getByRole("link")).toHaveClass(
      "custom-skip-link",
    );
  });
});
