import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with href", () => {
    render(
      <Link href="/about">
        About
      </Link>,
    );

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("uses hover underline by default", () => {
    render(<Link href="/about">About</Link>);

    expect(screen.getByRole("link")).toHaveClass(
      "aui-link",
      "aui-link--underline-hover",
    );
  });

  it("supports underline variants", () => {
    render(
      <Link href="/about" underline="always">
        About
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass(
      "aui-link--underline-always",
    );
  });

  it("opens external links in a new tab", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("preserves explicit target and rel", () => {
    render(
      <Link
        href="https://example.com"
        external
        target="_self"
        rel="custom-rel"
      >
        External
      </Link>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "custom-rel");
  });

  it("forwards native anchor attributes", () => {
    render(
      <Link href="/about" id="about-link" data-testid="link">
        About
      </Link>,
    );

    expect(screen.getByTestId("link")).toHaveAttribute("id", "about-link");
  });

  it("forwards refs", () => {
    let element: HTMLAnchorElement | null = null;

    render(
      <Link
        href="/about"
        ref={(node) => {
          element = node;
        }}
      >
        About
      </Link>,
    );

    expect(element).toBeInstanceOf(HTMLAnchorElement);
  });
});
