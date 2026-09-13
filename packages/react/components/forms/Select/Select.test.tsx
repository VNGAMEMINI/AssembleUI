import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

describe("Select", () => {
  it("renders select", () => {
    render(<Select />);

    expect(
      screen.getByRole("combobox"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Select label="Country" />);

    expect(
      screen.getByLabelText("Country"),
    ).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Select label="Country" />);

    const select =
      screen.getByLabelText("Country");

    expect(select).toHaveAttribute("id");
    expect(select.id).toMatch(
      /^aui-select-\d+$/,
    );
  });

  it("preserves a provided id", () => {
    render(
      <Select
        id="country"
        label="Country"
      />,
    );

    expect(
      screen.getByLabelText("Country"),
    ).toHaveAttribute("id", "country");
  });

  it("renders native options", () => {
    render(
      <Select label="Country">
        <option value="vn">Vietnam</option>
        <option value="jp">Japan</option>
      </Select>,
    );

    expect(
      screen.getByRole("option", {
        name: "Vietnam",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Japan",
      }),
    ).toBeInTheDocument();
  });

  it("supports value", () => {
    render(
      <Select
        label="Country"
        value="vn"
        onChange={() => {}}
      >
        <option value="vn">Vietnam</option>
        <option value="jp">Japan</option>
      </Select>,
    );

    expect(
      screen.getByLabelText("Country"),
    ).toHaveValue("vn");
  });

  it("supports defaultValue", () => {
    render(
      <Select
        label="Country"
        defaultValue="jp"
      >
        <option value="vn">Vietnam</option>
        <option value="jp">Japan</option>
      </Select>,
    );

    expect(
      screen.getByLabelText("Country"),
    ).toHaveValue("jp");
  });

  it("supports disabled", () => {
    render(
      <Select
        label="Country"
        disabled
      >
        <option>Vietnam</option>
      </Select>,
    );

    expect(
      screen.getByLabelText("Country"),
    ).toBeDisabled();
  });

  it("supports required", () => {
    render(
      <Select
        label="Country"
        required
      >
        <option value="">Choose</option>
      </Select>,
    );

    const select =
      screen.getByRole("combobox");

    expect(select).toBeRequired();
    expect(select).toHaveAttribute(
      "required",
    );

    expect(
      screen.getByText("Country"),
    ).toBeInTheDocument();
  });

  it("connects description through aria-describedby", () => {
    render(
      <Select
        label="Country"
        description="Select your country."
      >
        <option>Vietnam</option>
      </Select>,
    );

    const select =
      screen.getByLabelText("Country");

    const description = screen.getByText(
      "Select your country.",
    );

    expect(select).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("connects error through aria-describedby", () => {
    render(
      <Select
        label="Country"
        error="Country is required."
      >
        <option value="">Choose</option>
      </Select>,
    );

    const select =
      screen.getByLabelText("Country");

    const error = screen.getByRole("alert");

    expect(select).toHaveAttribute(
      "aria-describedby",
      error.id,
    );

    expect(select).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("uses error instead of description", () => {
    render(
      <Select
        label="Country"
        description="Choose a country."
        error="Country is required."
      >
        <option value="">Choose</option>
      </Select>,
    );

    const select =
      screen.getByLabelText("Country");

    const error = screen.getByRole("alert");

    expect(
      screen.queryByText("Choose a country."),
    ).not.toBeInTheDocument();

    expect(select).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("preserves native select attributes", () => {
    render(
      <Select
        label="Country"
        name="country"
        data-testid="country-select"
        aria-label="Country selector"
      >
        <option>Vietnam</option>
      </Select>,
    );

    const select =
      screen.getByTestId("country-select");

    expect(select).toHaveAttribute(
      "name",
      "country",
    );

    expect(select).toHaveAttribute(
      "aria-label",
      "Country selector",
    );
  });

  it("forwards ref to the native select", () => {
    const ref =
      createRef<HTMLSelectElement>();

    render(
      <Select
        ref={ref}
        label="Country"
      >
        <option>Vietnam</option>
      </Select>,
    );

    expect(ref.current).toBe(
      screen.getByLabelText("Country"),
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <Select
        label="Country"
        onChange={onChange}
        defaultValue="vn"
      >
        <option value="vn">Vietnam</option>
        <option value="jp">Japan</option>
      </Select>,
    );

    const select =
      screen.getByLabelText("Country");

    select.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
