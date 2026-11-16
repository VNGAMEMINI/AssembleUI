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
  it("renders native list items", () => {
    render(
      <List>
        <li>First</li>
        <li>Second</li>
      </List>,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders compound list items", () => {
    render(
      <List>
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
      </List>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders an ordered list", () => {
    render(
      <List ordered>
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
      </List>,
    );

    expect(screen.getByRole("list").tagName).toBe("OL");
  });

  it("uses vertical orientation by default", () => {
    render(
      <List>
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--vertical",
    );
  });

  it("applies horizontal orientation", () => {
    render(
      <List orientation="horizontal">
        <List.Item>One</List.Item>
        <List.Item>Two</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--horizontal",
    );
  });

  it("uses comfortable density by default", () => {
    render(
      <List>
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--comfortable",
    );
  });

  it("applies compact density", () => {
    render(
      <List density="compact">
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--compact",
    );
  });

  it("applies divided styling", () => {
    render(
      <List divided>
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--divided",
    );
  });

  it("uses no marker by default", () => {
    render(
      <List>
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--marker-none",
    );
  });

  it("applies disc markers", () => {
    render(
      <List marker="disc">
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--marker-disc",
    );
  });

  it("applies decimal markers", () => {
    render(
      <List ordered marker="decimal">
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "aui-list--marker-decimal",
    );
  });

  it("forwards native root attributes", () => {
    render(
      <List
        data-testid="user-list"
        aria-label="Users"
      >
        <List.Item>User</List.Item>
      </List>,
    );

    expect(screen.getByTestId("user-list")).toHaveAttribute(
      "aria-label",
      "Users",
    );
  });

  it("forwards native item attributes", () => {
    render(
      <List>
        <List.Item data-testid="user-item">
          User
        </List.Item>
      </List>,
    );

    expect(screen.getByTestId("user-item")).toBeInTheDocument();
  });

  it("forwards a ref to the root element", () => {
    const ref = {
      current: null as HTMLElement | null,
    };

    render(
      <List ref={ref}>
        <List.Item>Item</List.Item>
      </List>,
    );

    const renderedList = screen.getByRole("list");

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("UL");
    expect(ref.current).toBe(renderedList);
  });

  it("forwards a ref to the item element", () => {
    let itemElement: HTMLLIElement | null = null;

    render(
      <List>
        <List.Item
          ref={(element) => {
            itemElement = element;
          }}
        >
          Item
        </List.Item>
      </List>,
    );

    expect(itemElement).toBeInstanceOf(HTMLLIElement);
    expect(itemElement).toBe(screen.getByRole("listitem"));
  });

  it("allows custom root class names", () => {
    render(
      <List className="custom-list">
        <List.Item>Item</List.Item>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass(
      "custom-list",
    );
  });

  it("allows custom item class names", () => {
    render(
      <List>
        <List.Item className="custom-item">
          Item
        </List.Item>
      </List>,
    );

    expect(screen.getByRole("listitem")).toHaveClass(
      "aui-list__item",
      "custom-item",
    );
  });
});
