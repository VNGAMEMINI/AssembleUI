import { useRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Form } from "./Form";

describe("Form", () => {
  it("renders a form", () => {
    render(<Form aria-label="Profile form" />);

    expect(
      screen.getByRole("form", { name: "Profile form" }),
    ).toBeInTheDocument();
  });

  it("forwards standard form props", () => {
    render(
      <Form aria-label="Settings form" action="/settings" method="post">
        <button type="submit">Save</button>
      </Form>,
    );

    const form = screen.getByRole("form", { name: "Settings form" });

    expect(form).toHaveAttribute("action", "/settings");
    expect(form).toHaveAttribute("method", "post");
  });

  it("forwards a ref", () => {
    const Test = () => {
      const ref = useRef<HTMLFormElement>(null);

      return <Form ref={ref} aria-label="Form" />;
    };

    render(<Test />);

    expect(screen.getByRole("form", { name: "Form" })).toBeInTheDocument();
  });

  it("supports custom class names", () => {
    render(<Form className="custom-form" aria-label="Form" />);

    expect(screen.getByRole("form", { name: "Form" })).toHaveClass(
      "aui-form",
      "custom-form",
    );
  });

  it("handles submit events", () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <Form aria-label="Submit form" onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    fireEvent.submit(
      screen.getByRole("form", { name: "Submit form" }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders children", () => {
    render(
      <Form aria-label="Form">
        <input aria-label="Email" name="email" />
      </Form>,
    );

    expect(
      screen.getByRole("textbox", { name: "Email" }),
    ).toBeInTheDocument();
  });
});
