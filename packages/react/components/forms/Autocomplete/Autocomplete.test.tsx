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

    const input = screen.getByRole("combobox", { name: "Framework" });
    fireEvent.focus(input);

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

    fireEvent.focus(input);
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

describe("Autocomplete accessibility", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];

  it("uses unique listbox and option IDs for multiple instances", () => {
    render(
      <>
        <Autocomplete aria-label="Framework one" options={options} />
        <Autocomplete aria-label="Framework two" options={options} />
      </>,
    );

    const inputs = [
      screen.getByRole("combobox", { name: "Framework one" }),
      screen.getByRole("combobox", { name: "Framework two" }),
    ];

    expect(inputs[0].getAttribute("aria-controls")).not.toBe(
      inputs[1].getAttribute("aria-controls"),
    );

    for (const input of inputs) {
      fireEvent.focus(input);

      const listId = input.getAttribute("aria-controls");
      expect(listId).toBeTruthy();
      expect(document.getElementById(listId!)).toBeInTheDocument();
    }

    const listIds = inputs.map((input) => input.getAttribute("aria-controls"));
    expect(new Set(listIds).size).toBe(2);
  });
});

describe("Autocomplete keyboard navigation", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];

  it("activates options with ArrowDown and closes with Escape", () => {
    render(
      <Autocomplete aria-label="Framework" options={options} />,
    );

    const input = screen.getByRole("combobox", {
      name: "Framework",
    });

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const activeId = input.getAttribute("aria-activedescendant");

    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId!)).toHaveTextContent("React");
    expect(document.getElementById(activeId!)).toHaveAttribute(
      "aria-selected",
      "true",
    );

    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
