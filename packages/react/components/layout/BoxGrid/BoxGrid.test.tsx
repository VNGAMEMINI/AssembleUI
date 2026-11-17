import { createRef } from "react";

import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import { BoxGrid } from "./BoxGrid";

describe("BoxGrid", () => {
  it("renders children", () => {
    render(
      <BoxGrid>
        <div>First item</div>
        <div>Second item</div>
      </BoxGrid>,
    );

    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("Second item")).toBeInTheDocument();
  });

  it("renders as a div", () => {
    const { container } = render(<BoxGrid>Content</BoxGrid>);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("uses responsive layout by default", () => {
    const { container } = render(<BoxGrid>Content</BoxGrid>);

    expect(container.firstChild).not.toHaveAttribute("data-columns");
    expect(container.firstChild).toHaveAttribute("data-spacing", "md");
    expect(container.firstChild).toHaveAttribute("data-auto-flow", "row");
  });

  it("supports a custom minimum item width", () => {
    const { container } = render(
      <BoxGrid minWidth="240px">Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-box-grid-min-width": "240px",
    });
  });

  it("supports a fixed number of columns", () => {
    const { container } = render(
      <BoxGrid columns={3}>Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveAttribute("data-columns", "");
    expect(container.firstChild).toHaveStyle({
      "--aui-box-grid-columns": "3",
    });
  });

  it("normalizes columns to a positive integer", () => {
    const { container } = render(
      <BoxGrid columns={2.8}>Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-box-grid-columns": "2",
    });
  });

  it("normalizes invalid column counts", () => {
    const { container } = render(
      <BoxGrid columns={0}>Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-box-grid-columns": "1",
    });
  });

  it("supports spacing presets", () => {
    const { container } = render(
      <BoxGrid spacing="lg">Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveAttribute("data-spacing", "lg");
  });

  it("supports automatic placement direction", () => {
    const { container } = render(
      <BoxGrid autoFlow="column">Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveAttribute("data-auto-flow", "column");
  });

  it("allows custom styles to override internal variables", () => {
    const { container } = render(
      <BoxGrid
        columns={2}
        minWidth="240px"
        style={{
          "--aui-box-grid-min-width": "320px",
          "--aui-box-grid-columns": "4",
        } as React.CSSProperties}
      >
        Content
      </BoxGrid>,
    );

    expect(container.firstChild).toHaveStyle({
      "--aui-box-grid-min-width": "320px",
      "--aui-box-grid-columns": "4",
    });
  });

  it("merges className", () => {
    const { container } = render(
      <BoxGrid className="custom-grid">Content</BoxGrid>,
    );

    expect(container.firstChild).toHaveClass(
      "aui-box-grid",
      "custom-grid",
    );
  });

  it("forwards native attributes", () => {
    render(<BoxGrid data-testid="box-grid">Content</BoxGrid>);

    expect(screen.getByTestId("box-grid")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(<BoxGrid ref={ref}>Content</BoxGrid>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
