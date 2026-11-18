import {
  createRef,
} from "react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
} from "@testing-library/react";

import {
  Marquee,
} from "./Marquee";

describe("Marquee", () => {
  it("renders children", () => {
    const { container } = render(
      <Marquee>
        <span>Hello</span>
        <span>World</span>
      </Marquee>,
    );

    const groups = container.querySelectorAll(
      ".aui-marquee__group",
    );

    expect(groups[0]).toHaveTextContent(
      "HelloWorld",
    );

    expect(groups[1]).toHaveTextContent(
      "HelloWorld",
    );
  });

  it("duplicates content for seamless scrolling", () => {
    const { container } = render(
      <Marquee>
        <span>Content</span>
      </Marquee>,
    );

    const groups = container.querySelectorAll(
      ".aui-marquee__group",
    );

    expect(groups).toHaveLength(2);
    expect(groups[0]).not.toHaveAttribute(
      "aria-hidden",
    );

    expect(groups[1]).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(groups[1]).toHaveAttribute("inert");
  });

  it("uses default props", () => {
    const { container } = render(
      <Marquee>
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveClass(
      "aui-marquee--left",
    );

    expect(container.firstChild).not.toHaveClass(
      "aui-marquee--pause-on-hover",
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-marquee-gap": "20px",
    });
  });

  it("supports custom gap", () => {
    const { container, rerender } = render(
      <Marquee gap={32}>
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-marquee-gap": "32px",
    });

    rerender(
      <Marquee gap="1rem">
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-marquee-gap": "1rem",
    });
  });

  it("supports direction", () => {
    const { container, rerender } = render(
      <Marquee direction="left">
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveClass(
      "aui-marquee--left",
    );

    rerender(
      <Marquee direction="right">
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveClass(
      "aui-marquee--right",
    );
  });

  it("supports pause on hover", () => {
    const { container } = render(
      <Marquee pauseOnHover>
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveClass(
      "aui-marquee--pause-on-hover",
    );
  });

  it("supports className", () => {
    const { container } = render(
      <Marquee className="custom-marquee">
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveClass(
      "custom-marquee",
    );
  });

  it("forwards native attributes", () => {
    const { container } = render(
      <Marquee
        id="example-marquee"
        aria-label="Announcements"
        data-testid="marquee"
      >
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveAttribute(
      "id",
      "example-marquee",
    );

    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "Announcements",
    );

    expect(container.firstChild).toHaveAttribute(
      "data-testid",
      "marquee",
    );
  });

  it("forwards style", () => {
    const { container } = render(
      <Marquee
        style={{
          maxWidth: "500px",
        }}
      >
        Content
      </Marquee>,
    );

    expect(container.firstChild).toHaveStyle({
      maxWidth: "500px",
    });
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Marquee ref={ref}>
        Content
      </Marquee>,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLDivElement,
    );
  });
});
