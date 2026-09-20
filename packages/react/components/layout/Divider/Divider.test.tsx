import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal divider by default", () => {
    render(<Divider data-testid="divider" />);

    const divider = screen.getByTestId("divider");

    expect(divider.tagName).toBe("HR");
    expect(divider).toHaveClass(
      "aui-divider",
      "aui-divider--horizontal",
    );
  });

  it("renders a vertical separator", () => {
    render(
      <Divider
        orientation="vertical"
        data-testid="divider"
      />,
    );

    const divider = screen.getByTestId("divider");

    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("forwards native attributes", () => {
    render(
      <Divider
        id="section-divider"
        data-testid="divider"
      />,
    );

    expect(screen.getByTestId("divider")).toHaveAttribute(
      "id",
      "section-divider",
    );
  });

  it("merges custom class names", () => {
    render(
      <Divider
        className="custom-divider"
        data-testid="divider"
      />,
    );

    expect(screen.getByTestId("divider")).toHaveClass(
      "aui-divider",
      "custom-divider",
    );
  });

  it("forwards horizontal refs", () => {
    let element: HTMLElement | null = null;

    render(
      <Divider
        ref={(node) => {
          element = node;
        }}
      />,
    );

    expect(element).toBeInstanceOf(HTMLHRElement);
  });

  it("forwards vertical refs", () => {
    let element: HTMLElement | null = null;

    render(
      <Divider
        orientation="vertical"
        ref={(node) => {
          element = node;
        }}
      />,
    );

    expect(element).toBeInstanceOf(HTMLDivElement);
  });
});
