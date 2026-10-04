import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with href", () => {
    render(<Link href="/about">About</Link>);

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

  it("supports every underline variant", () => {
    const { rerender } = render(
      <Link href="/about" underline="always">
        About
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass("aui-link--underline-always");

    rerender(
      <Link href="/about" underline="hover">
        About
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass("aui-link--underline-hover");

    rerender(
      <Link href="/about" underline="none">
        About
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass("aui-link--underline-none");
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
    expect(link).toHaveClass("aui-link--external");
  });

  it("preserves explicit target and rel for external links", () => {
    render(
      <Link href="https://example.com" external target="_self" rel="custom-rel">
        External
      </Link>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "custom-rel");
    expect(link).toHaveClass("aui-link--external");
  });

  it("preserves target and rel when the link is not external", () => {
    render(
      <Link href="/about" target="_blank" rel="custom-rel">
        About
      </Link>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "custom-rel");
    expect(link).not.toHaveClass("aui-link--external");
  });

  it("forwards native anchor attributes", () => {
    render(
      <Link
        href="/about"
        id="about-link"
        aria-label="About page"
        data-testid="link"
      >
        About
      </Link>,
    );

    const link = screen.getByTestId("link");

    expect(link).toHaveAttribute("id", "about-link");
    expect(link).toHaveAttribute("aria-label", "About page");
  });

  it("merges custom class names", () => {
    render(
      <Link href="/about" className="custom-link">
        About
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass(
      "aui-link",
      "aui-link--underline-hover",
      "custom-link",
    );
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

  it("adds secure rel for an external link with an explicit blank target", () => {
    render(
      <Link href="https://example.com" external target="_blank">
        External
      </Link>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
