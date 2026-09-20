import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders an info alert by default", () => {
    render(<Alert>Information</Alert>);

    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("aui-alert", "aui-alert--info");
    expect(alert).toHaveTextContent("Information");
  });

  it("renders all supported variants", () => {
    const { rerender } = render(<Alert>Message</Alert>);

    for (const variant of ["info", "success", "warning", "error"] as const) {
      rerender(<Alert variant={variant}>Message</Alert>);

      expect(screen.getByRole("alert")).toHaveClass(
        "aui-alert",
        `aui-alert--${variant}`,
      );
    }
  });

  it("renders a heading", () => {
    render(
      <Alert heading="Success">
        Operation completed.
      </Alert>,
    );

    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Operation completed.")).toBeInTheDocument();
  });

  it("supports heading as React content", () => {
    render(
      <Alert heading={<strong>Important</strong>}>
        Message
      </Alert>,
    );

    expect(screen.getByText("Important")).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(
      <Alert
        id="account-alert"
        data-testid="account-alert"
        aria-live="polite"
      >
        Message
      </Alert>,
    );

    const alert = screen.getByTestId("account-alert");

    expect(alert).toHaveAttribute("id", "account-alert");
    expect(alert).toHaveAttribute("aria-live", "polite");
  });

  it("merges custom class names", () => {
    render(<Alert className="custom-alert">Message</Alert>);

    expect(screen.getByRole("alert")).toHaveClass(
      "aui-alert",
      "aui-alert--info",
      "custom-alert",
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Alert ref={ref}>Message</Alert>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("aui-alert");
  });

  it("allows overriding the default role", () => {
    render(<Alert role="status">Saved</Alert>);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
