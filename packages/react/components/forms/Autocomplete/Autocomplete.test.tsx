import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Autocomplete } from "./Autocomplete";

describe("Autocomplete", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ];

  it("renders an input", () => {
    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
      />,
    );

    expect(
      screen.getByRole("combobox", {
        name: "Framework",
      }),
    ).toBeInTheDocument();
  });

  it("renders suggestions", () => {
    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Svelte")).toBeInTheDocument();
  });

  it("filters suggestions from input", () => {
    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
      />,
    );

    const input = screen.getByRole("combobox", {
      name: "Framework",
    });

    fireEvent.change(input, {
      target: {
        value: "rea",
      },
    });

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Vue")).not.toBeInTheDocument();
    expect(screen.queryByText("Svelte")).not.toBeInTheDocument();
  });

  it("calls onChange for typed values", () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
        onChange={onChange}
      />,
    );

    fireEvent.change(
      screen.getByRole("combobox", {
        name: "Framework",
      }),
      {
        target: {
          value: "rea",
        },
      },
    );

    expect(onChange).toHaveBeenCalledWith(
      "rea",
      undefined,
    );
  });

  it("selects the first matching option with Enter", () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("combobox", {
      name: "Framework",
    });

    fireEvent.change(input, {
      target: {
        value: "re",
      },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
    });

    expect(onChange).toHaveBeenLastCalledWith(
      "React",
      options[0],
    );
  });

  it("supports a default value", () => {
    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
        defaultValue="React"
      />,
    );

    expect(
      screen.getByRole("combobox", {
        name: "Framework",
      }),
    ).toHaveValue("React");
  });

  it("supports a custom class name", () => {
    render(
      <Autocomplete
        aria-label="Framework"
        options={options}
        className="custom-autocomplete"
      />,
    );

    expect(
      screen.getByRole("combobox", {
        name: "Framework",
      }),
    ).toHaveClass(
      "aui-autocomplete__input",
      "custom-autocomplete",
    );
  });
});
