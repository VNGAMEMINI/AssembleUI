import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Email</Label>);

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders as a label element", () => {
    render(<Label>Username</Label>);

    expect(screen.getByText("Username").tagName).toBe("LABEL");
  });

  it("supports htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>);

    expect(screen.getByText("Email")).toHaveAttribute(
      "for",
      "email",
    );
  });

  it("renders required indicator", () => {
    render(<Label required>Email</Label>);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render required indicator by default", () => {
    render(<Label>Email</Label>);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("forwards custom className", () => {
    render(<Label className="custom-label">Email</Label>);

    expect(screen.getByText("Email")).toHaveClass(
      "aui-label",
      "custom-label",
    );
  });

  it("forwards native attributes", () => {
    render(
      <Label data-testid="email-label">
        Email
      </Label>,
    );

    expect(
      screen.getByTestId("email-label"),
    ).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null } as {
      current: HTMLLabelElement | null;
    };

    render(<Label ref={ref}>Email</Label>);

    expect(ref.current?.tagName).toBe("LABEL");
  });
});
