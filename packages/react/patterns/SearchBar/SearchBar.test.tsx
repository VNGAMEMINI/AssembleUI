import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders a search form", () => {
    render(<SearchBar />);

    expect(
      screen.getByRole("search"),
    ).toBeInTheDocument();
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

  it("forwards form props", () => {
    const handleSubmit = vi.fn((event) => {
      event.preventDefault();
    });

    render(
      <SearchBar
        aria-label="Site search"
        onSubmit={handleSubmit}
      />,
    );

    const form = screen.getByRole("search");

    expect(form).toHaveAttribute(
      "aria-label",
      "Site search",
    );
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

  it("forwards button props", () => {
    render(
      <SearchBar
        buttonProps={{
          variant: "secondary",
          size: "large",
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
});
