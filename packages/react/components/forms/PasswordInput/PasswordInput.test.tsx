import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("renders as a password input by default", () => {
    render(<PasswordInput aria-label="Password" />);

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("shows the password when toggled", () => {
    render(<PasswordInput aria-label="Password" />);

    const input = screen.getByLabelText("Password");
    const toggle = screen.getByRole("button", {
      name: "Show password",
    });

    fireEvent.click(toggle);

    expect(input).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-label", "Hide password");
  });

  it("hides the password when toggled again", () => {
    render(<PasswordInput aria-label="Password" />);

    const input = screen.getByLabelText("Password");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show password",
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Hide password",
      }),
    );

    expect(input).toHaveAttribute("type", "password");
  });

  it("supports default visible state", () => {
    render(
      <PasswordInput
        aria-label="Password"
        defaultVisible
      />,
    );

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("forwards input props", () => {
    render(
      <PasswordInput
        aria-label="Password"
        placeholder="Enter password"
        name="password"
      />,
    );

    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute(
      "placeholder",
      "Enter password",
    );
    expect(input).toHaveAttribute("name", "password");
  });
});
