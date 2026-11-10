import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import { FormSection } from "./FormSection";

describe("FormSection", () => {
  it("renders the title and description", () => {
    render(
      <FormSection
        title="Account"
        description="Manage your account information."
      >
        <input aria-label="Name" />
      </FormSection>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Account",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Manage your account information.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: "Name",
      }),
    ).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <FormSection
        title="Profile"
        actions={
          <button type="button">
            Edit
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Edit",
      }),
    ).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <FormSection title="Preferences">
        <label>
          Theme
          <input aria-label="Theme" />
        </label>
      </FormSection>,
    );

    expect(
      screen.getByRole("textbox", {
        name: "Theme",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom class name", () => {
    render(
      <FormSection
        className="custom-form-section"
      />,
    );

    expect(
      document.querySelector(
        ".aui-form-section",
      ),
    ).toHaveClass("custom-form-section");
  });

  it("supports section HTML attributes", () => {
    render(
      <FormSection data-testid="form-section" />,
    );

    expect(
      screen.getByTestId("form-section"),
    ).toBeInTheDocument();
  });

  it("connects the section to its heading", () => {
    render(
      <FormSection title="Security" />,
    );

    const heading = screen.getByRole("heading", {
      name: "Security",
    });

    const section = heading.closest("section");

    expect(section).toHaveAttribute(
      "aria-labelledby",
      heading.id,
    );
  });
});
