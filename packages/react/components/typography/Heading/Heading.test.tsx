import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders level 1 by default when requested", () => {
    render(<Heading level={1}>Title</Heading>);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title",
    );
  });

  it("renders the requested heading level", () => {
    render(<Heading level={4}>Section</Heading>);

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Section",
    );
  });

  it("renders every supported semantic heading level", () => {
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      const { unmount } = render(
        <Heading level={level}>Title</Heading>,
      );

      expect(
        screen.getByRole("heading", { level }),
      ).toHaveTextContent("Title");

      unmount();
    }
  });

  it("does not add a visual size class when size is omitted", () => {
    render(<Heading level={3}>Title</Heading>);

    expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
      "aui-heading",
      "aui-heading--level-3",
    );

    expect(screen.getByRole("heading", { level: 3 })).not.toHaveClass(
      "aui-heading--xs",
      "aui-heading--sm",
      "aui-heading--md",
      "aui-heading--lg",
      "aui-heading--xl",
    );
  });

  it("supports visual size independently from semantic level", () => {
    render(
      <Heading level={2} size="xl">
        Title
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveClass(
      "aui-heading",
      "aui-heading--level-2",
      "aui-heading--xl",
    );
  });

  it("forwards native heading attributes", () => {
    render(
      <Heading level={2} id="page-title" data-testid="heading">
        Title
      </Heading>,
    );

    const heading = screen.getByTestId("heading");

    expect(heading).toHaveAttribute("id", "page-title");
  });

  it("forwards refs", () => {
    let element: HTMLHeadingElement | null = null;

    render(
      <Heading
        level={2}
        ref={(node) => {
          element = node;
        }}
      >
        Title
      </Heading>,
    );

    expect(element).toBeInstanceOf(HTMLHeadingElement);
  });

  it("merges custom class names", () => {
    render(
      <Heading level={2} className="custom-heading">
        Title
      </Heading>,
    );

    expect(screen.getByRole("heading")).toHaveClass(
      "aui-heading",
      "custom-heading",
    );
  });
});
