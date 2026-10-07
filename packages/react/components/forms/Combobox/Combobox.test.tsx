import {
  createRef,
} from "react";

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  Combobox,
} from "./Combobox";

import type {
  ComboboxOption,
} from "./Combobox.types";

const options: ComboboxOption[] = [
  {
    id: "vn",
    label: "Vietnam",
  },
  {
    id: "jp",
    label: "Japan",
  },
  {
    id: "us",
    label: "United States",
  },
  {
    id: "cn",
    label: "China",
    disabled: true,
  },
];

describe("Combobox", () => {
  it("renders the input", () => {
    render(
      <Combobox
        options={options}
      />,
    );

    expect(
      screen.getByRole("combobox"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(
      <Combobox
        options={options}
        label="Country"
      />,
    );

    expect(
      screen.getByText("Country"),
    ).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(
      <Combobox
        options={options}
        placeholder="Choose country"
      />,
    );

    expect(
      screen.getByPlaceholderText(
        "Choose country",
      ),
    ).toBeInTheDocument();
  });

  it("opens when focused", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        screen.getByRole("listbox"),
      ).toBeInTheDocument();
    });
  });

  it("renders all options when opened", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    await waitFor(() => {
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

      expect(
        screen.getByRole("option", {
          name: "United States",
        }),
      ).toBeInTheDocument();
    });
  });

  it("filters options from input", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.change(input, {
      target: {
        value: "jap",
      },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("option", {
          name: "Japan",
        }),
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("option", {
          name: "Vietnam",
        }),
      ).not.toBeInTheDocument();
    });
  });

  it("shows no-results text", async () => {
    render(
      <Combobox
        options={options}
        noResultsText="Nothing found"
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.change(input, {
      target: {
        value: "xyz",
      },
    });

    expect(
      await screen.findByText(
        "Nothing found",
      ),
    ).toBeInTheDocument();
  });

  it("selects an option by mouse", async () => {
    const onValueChange = vi.fn();

    render(
      <Combobox
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    const option =
      await screen.findByRole("option", {
        name: "Japan",
      });

    fireEvent.mouseDown(option);

    expect(
      onValueChange,
    ).toHaveBeenCalledWith("jp");

    expect(
      input,
    ).toHaveValue("Japan");

    expect(
      screen.queryByRole("listbox"),
    ).not.toBeInTheDocument();
  });

  it("supports default value", () => {
    render(
      <Combobox
        options={options}
        defaultValue="vn"
      />,
    );

    expect(
      screen.getByRole("combobox"),
    ).toHaveValue("Vietnam");
  });

  it("supports controlled value", () => {
    render(
      <Combobox
        options={options}
        value="us"
      />,
    );

    expect(
      screen.getByRole("combobox"),
    ).toHaveValue("");
  });

  it("supports default input value", () => {
    render(
      <Combobox
        options={options}
        defaultInputValue="Japan"
      />,
    );

    expect(
      screen.getByRole("combobox"),
    ).toHaveValue("Japan");
  });

  it("opens with ArrowDown", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    expect(
      await screen.findByRole("listbox"),
    ).toBeInTheDocument();
  });

  it("moves through options with ArrowDown", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    const vietnam =
      await screen.findByRole("option", {
        name: "Vietnam",
      });

    await waitFor(() => {
      expect(
        input,
      ).toHaveAttribute(
        "aria-activedescendant",
        vietnam.id,
      );
    });

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    const japan =
      screen.getByRole("option", {
        name: "Japan",
      });

    expect(
      input,
    ).toHaveAttribute(
      "aria-activedescendant",
      japan.id,
    );
  });

  it("skips disabled options", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    const activeId =
      input.getAttribute(
        "aria-activedescendant",
      );

    expect(activeId).toContain(
      "us",
    );
  });

  it("selects active option with Enter", async () => {
    const onValueChange = vi.fn();

    render(
      <Combobox
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    fireEvent.keyDown(input, {
      key: "ArrowDown",
    });

    fireEvent.keyDown(input, {
      key: "Enter",
    });

    expect(
      onValueChange,
    ).toHaveBeenCalledWith("vn");
  });

  it("closes with Escape", async () => {
    render(
      <Combobox
        options={options}
      />,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    expect(
      await screen.findByRole("listbox"),
    ).toBeInTheDocument();

    fireEvent.keyDown(input, {
      key: "Escape",
    });

    expect(
      screen.queryByRole("listbox"),
    ).not.toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    render(
      <div>
        <Combobox
          options={options}
        />

        <button type="button">
          Outside
        </button>
      </div>,
    );

    const input =
      screen.getByRole("combobox");

    fireEvent.focus(input);

    expect(
      await screen.findByRole("listbox"),
    ).toBeInTheDocument();

    fireEvent.pointerDown(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("listbox"),
      ).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state", () => {
    render(
      <Combobox
        options={options}
        open
      />,
    );

    expect(
      screen.getByRole("listbox"),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange", () => {
    const onOpenChange =
      vi.fn();

    render(
      <Combobox
        options={options}
        onOpenChange={onOpenChange}
      />,
    );

    fireEvent.focus(
      screen.getByRole("combobox"),
    );

    expect(
      onOpenChange,
    ).toHaveBeenCalledWith(true);
  });

  it("supports disabled state", () => {
    render(
      <Combobox
        options={options}
        disabled
      />,
    );

    expect(
      screen.getByRole("combobox"),
    ).toBeDisabled();
  });

  it("supports description and error", () => {
    render(
      <Combobox
        options={options}
        label="Country"
        description="Choose your country"
        error="Country is required"
      />,
    );

    expect(
      screen.getByText(
        "Country is required",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Choose your country",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("combobox"),
    ).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("supports accessible relationships", () => {
    render(
      <Combobox
        options={options}
        label="Country"
        description="Select your country"
      />,
    );

    const input =
      screen.getByRole("combobox");

    expect(
      input,
    ).toHaveAttribute(
      "aria-haspopup",
      "listbox",
    );

    expect(
      input,
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    expect(
      input,
    ).toHaveAttribute(
      "aria-describedby",
    );
  });

  it("forwards ref", () => {
    const ref =
      createRef<HTMLDivElement>();

    render(
      <Combobox
        ref={ref}
        options={options}
      />,
    );

    expect(
      ref.current,
    ).toBeInstanceOf(
      HTMLDivElement,
    );
  });
});
