import { createRef } from "react";

import { describe, expect, it } from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container>
        Content
      </Container>,
    );

    expect(
      screen.getByText("Content"),
    ).toBeInTheDocument();
  });

  it("uses the default lg size", () => {
    const { container } = render(
      <Container>
        Content
      </Container>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-container",
      "aui-container--lg",
    );
  });

  it("supports custom size", () => {
    const { container } = render(
      <Container size="sm">
        Content
      </Container>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-container",
      "aui-container--sm",
    );
  });

  it("supports full width", () => {
    const { container } = render(
      <Container size="full">
        Content
      </Container>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-container--full",
    );
  });

  it("merges className", () => {
    const { container } = render(
      <Container className="custom-container">
        Content
      </Container>,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "aui-container",
      "custom-container",
    );
  });

  it("forwards native attributes", () => {
    render(
      <Container data-testid="container">
        Content
      </Container>,
    );

    expect(
      screen.getByTestId("container"),
    ).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Container ref={ref}>
        Content
      </Container>,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLDivElement,
    );
  });

  it("renders as a div", () => {
    const { container } = render(
      <Container>
        Content
      </Container>,
    );

    expect(
      container.firstChild,
    ).toBeInstanceOf(HTMLDivElement);
  });
});
