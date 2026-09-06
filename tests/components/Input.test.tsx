import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../../packages/react/components/forms/Input/Input";

describe("Input Component", () => {
  it("renders as input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("applies aui-input class", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("aui-input");
  });

  it("applies size class", () => {
    const { container } = render(<Input size="lg" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("aui-input--lg");
  });

  it("applies invalid class", () => {
    const { container } = render(<Input isInvalid />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("aui-input--invalid");
  });

  it("sets aria-invalid when isInvalid is true", () => {
    const { container } = render(<Input isInvalid />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("aria-invalid")).toBe("true");
  });

  it("disables input when disabled is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("disables input when isDisabled is true", () => {
    render(<Input isDisabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toEqual(screen.getByRole("textbox"));
  });

  it("accepts native input attributes", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeDefined();
  });

  it("defaults type to text", () => {
    const { container } = render(<Input />);
    expect(container.querySelector("input")?.getAttribute("type")).toBe("text");
  });
});
