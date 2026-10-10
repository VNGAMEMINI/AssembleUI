import { createRef } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders a search form", () => {
    render(<SearchBar />);

    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(
      <SearchBar
        inputProps={{
          placeholder: "Search users",
        }}
      />,
    );

    const input = screen.getByPlaceholderText("Search users");

    expect(input).toHaveAttribute("type", "search");
  });

  it("renders a submit button", () => {
    render(
      <SearchBar
        buttonLabel="Find"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Find",
      }),
    ).toHaveAttribute("type", "submit");
  });

  it("submits through the form", () => {
    const handleSubmit = vi.fn((event) => {
      event.preventDefault();
    });

    render(
      <SearchBar
        onSubmit={handleSubmit}
        inputProps={{
          name: "query",
          defaultValue: "assemble",
        }}
      />,
    );

    fireEvent.submit(screen.getByRole("search"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("forwards form props", () => {
    render(
      <SearchBar
        aria-label="Site search"
        data-testid="search-form"
      />,
    );

    const form = screen.getByTestId("search-form");

    expect(form).toHaveAttribute("aria-label", "Site search");
  });

  it("forwards input props", () => {
    render(
      <SearchBar
        inputProps={{
          name: "query",
          placeholder: "Search",
          required: true,
        }}
      />,
    );

    const input = screen.getByPlaceholderText("Search");

    expect(input).toHaveAttribute("name", "query");
    expect(input).toBeRequired();
  });

  it("forwards input accessibility props", () => {
    render(
      <SearchBar
        inputProps={{
          label: "Search users",
          description: "Enter a name",
        }}
      />,
    );

    expect(
      screen.getByLabelText("Search users"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Enter a name"),
    ).toBeInTheDocument();
  });

  it("forwards button props", () => {
    render(
      <SearchBar
        buttonProps={{
          variant: "secondary",
          size: "lg",
          disabled: true,
        }}
      />,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("supports custom class names", () => {
    render(
      <SearchBar
        className="custom-search"
        inputProps={{
          className: "custom-input",
        }}
        buttonProps={{
          className: "custom-button",
        }}
      />,
    );

    expect(screen.getByRole("search")).toHaveClass(
      "aui-search-bar",
      "custom-search",
    );

    expect(screen.getByRole("searchbox")).toHaveClass(
      "aui-input",
      "aui-search-bar__input",
      "custom-input",
    );

    expect(screen.getByRole("button")).toHaveClass(
      "aui-button",
      "aui-search-bar__button",
      "custom-button",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLFormElement>();

    render(
      <SearchBar
        ref={ref}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });
});
