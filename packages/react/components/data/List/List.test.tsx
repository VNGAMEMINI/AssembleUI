import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  List,
} from "./List";

describe("List", () => {
  it("renders list items", () => {
    render(
      <List>
        <li>First</li>
        <li>Second</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("First"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Second"),
    ).toBeInTheDocument();
  });

  it("renders an ordered list", () => {
    render(
      <List ordered>
        <li>First</li>
        <li>Second</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveAttribute("class", expect.stringContaining("aui-list"));

    expect(
      screen.getByRole("list"),
    ).toHaveProperty(
      "tagName",
      "OL",
    );
  });

  it("uses the vertical orientation by default", () => {
    render(
      <List>
        <li>Item</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "aui-list--vertical",
    );
  });

  it("applies the horizontal orientation", () => {
    render(
      <List orientation="horizontal">
        <li>One</li>
        <li>Two</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "aui-list--horizontal",
    );
  });

  it("uses comfortable density by default", () => {
    render(
      <List>
        <li>Item</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "aui-list--comfortable",
    );
  });

  it("applies compact density", () => {
    render(
      <List density="compact">
        <li>Item</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "aui-list--compact",
    );
  });

  it("applies divided styling", () => {
    render(
      <List divided>
        <li>First</li>
        <li>Second</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "aui-list--divided",
    );
  });

  it("forwards native attributes", () => {
    render(
      <List
        data-testid="user-list"
        aria-label="Users"
      >
        <li>User</li>
      </List>,
    );

    const list =
      screen.getByTestId("user-list");

    expect(list).toHaveAttribute(
      "aria-label",
      "Users",
    );
  });

  it("forwards a ref to the list element", () => {
    let listElement:
      | HTMLElement
      | null = null;

    render(
      <List
        ref={(element) => {
          listElement = element;
        }}
      >
        <li>Item</li>
      </List>,
    );

    expect(listElement).toBeInstanceOf(
      HTMLElement,
    );

    const renderedList =
      screen.getByRole("list");

    expect(renderedList).toBe(
      listElement,
    );

    expect(renderedList.tagName).toBe(
      "UL",
    );
  });

  it("allows custom class names", () => {
    render(
      <List className="custom-list">
        <li>Item</li>
      </List>,
    );

    expect(
      screen.getByRole("list"),
    ).toHaveClass(
      "custom-list",
    );
  });
});
