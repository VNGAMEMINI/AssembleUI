import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { createRef } from "react";

import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders as a search input", () => {
    render(
      <SearchInput placeholder="Search..." />,
    );

    expect(
      screen.getByRole("searchbox"),
    ).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(
      <SearchInput placeholder="Search users" />,
    );

    expect(
      screen.getByPlaceholderText("Search users"),
    ).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const onChange = vi.fn();

    render(
      <SearchInput
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: {
        value: "Alice",
      },
    });

    expect(input).toHaveValue("Alice");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("supports default value", () => {
    render(
      <SearchInput defaultValue="Alice" />,
    );

    expect(
      screen.getByRole("searchbox"),
    ).toHaveValue("Alice");
  });

  it("supports controlled value", () => {
    const { rerender } = render(
      <SearchInput value="Alice" readOnly />,
    );

    expect(
      screen.getByRole("searchbox"),
    ).toHaveValue("Alice");

    rerender(
      <SearchInput value="Bob" readOnly />,
    );

    expect(
      screen.getByRole("searchbox"),
    ).toHaveValue("Bob");
  });

  it("renders icon", () => {
    render(
      <SearchInput
        icon={<span data-testid="search-icon">⌕</span>}
      />,
    );

    expect(
      screen.getByTestId("search-icon"),
    ).toBeInTheDocument();
  });

  it("clears the input", () => {
    const onClear = vi.fn();

    render(
      <SearchInput
        defaultValue="Alice"
        clearable
        onClear={onClear}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Clear search",
      }),
    );

    expect(
      screen.getByRole("searchbox"),
    ).toHaveValue("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <SearchInput ref={ref} />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLInputElement,
    );
  });
});
