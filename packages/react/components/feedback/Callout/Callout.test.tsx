import { useRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "./Callout";

describe("Callout", () => {
  it("renders content", () => {
    render(
      <Callout title="Information">
        This is useful information.
      </Callout>,
    );

    expect(
      screen.getByText("Information"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("This is useful information."),
    ).toBeInTheDocument();
  });

  it("uses neutral tone by default", () => {
    render(<Callout>Content</Callout>);

    expect(screen.getByText("Content")).toHaveClass(
      "aui-callout__content",
    );

    expect(
      screen.getByText("Content").parentElement,
    ).toHaveClass("aui-callout", "aui-callout--neutral");
  });

  it("supports all tones", () => {
    const tones = [
      "neutral",
      "info",
      "success",
      "warning",
      "danger",
    ] as const;

    for (const tone of tones) {
      const { unmount } = render(
        <Callout tone={tone}>{tone}</Callout>,
      );

      expect(
        screen.getByText(tone).parentElement,
      ).toHaveClass(
        "aui-callout",
        `aui-callout--${tone}`,
      );

      unmount();
    }
  });

  it("supports standard HTML attributes", () => {
    render(
      <Callout
        aria-label="Important notice"
        data-testid="callout"
      >
        Content
      </Callout>,
    );

    const callout = screen.getByTestId("callout");

    expect(callout).toHaveAttribute(
      "aria-label",
      "Important notice",
    );
  });

  it("forwards a ref", () => {
    const Test = () => {
      const ref = useRef<HTMLDivElement>(null);

      return (
        <Callout ref={ref} data-testid="callout">
          Content
        </Callout>
      );
    };

    render(<Test />);

    expect(
      screen.getByTestId("callout"),
    ).toBeInTheDocument();
  });

  it("supports a custom class name", () => {
    render(
      <Callout className="custom-callout">
        Content
      </Callout>,
    );

    expect(
      screen.getByText("Content").parentElement,
    ).toHaveClass(
      "aui-callout",
      "custom-callout",
    );
  });

  it("supports title-only content", () => {
    render(<Callout title="Notice" />);

    expect(
      screen.getByText("Notice"),
    ).toBeInTheDocument();
  });
});
