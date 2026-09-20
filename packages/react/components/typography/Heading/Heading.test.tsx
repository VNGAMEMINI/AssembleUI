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
