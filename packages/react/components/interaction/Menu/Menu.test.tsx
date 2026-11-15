import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Menu } from "./Menu";

describe("Menu", () => {
  it("renders a native menu element", () => {
    render(
      <Menu>
        <Menu.Item>First item</Menu.Item>
        <Menu.Item>Second item</Menu.Item>
      </Menu>,
    );

    const menu = document.querySelector("menu");

    expect(menu).toBeInTheDocument();
    expect(menu?.tagName).toBe("MENU");
  });

  it("renders items as native list items", () => {
    render(
      <Menu>
        <Menu.Item>First item</Menu.Item>
        <Menu.Item>Second item</Menu.Item>
      </Menu>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("does not impose an application menu role", () => {
    render(
      <Menu>
        <Menu.Item>First item</Menu.Item>
      </Menu>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("supports native interactive children", () => {
    render(
      <Menu>
        <Menu.Item>
          <button type="button">Edit</button>
        </Menu.Item>
        <Menu.Item>
          <a href="/settings">Settings</a>
        </Menu.Item>
      </Menu>,
    );

    expect(
      screen.getByRole("button", { name: "Edit" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Settings" }),
    ).toHaveAttribute("href", "/settings");
  });

  it("forwards props to the menu element", () => {
    render(
      <Menu
        id="main-menu"
        aria-label="Main navigation"
        data-testid="menu"
        className="custom-menu"
      >
        <Menu.Item>Item</Menu.Item>
      </Menu>,
    );

    const menu = screen.getByTestId("menu");

    expect(menu).toHaveAttribute("id", "main-menu");
    expect(menu).toHaveAttribute("aria-label", "Main navigation");
    expect(menu).toHaveClass("aui-menu", "custom-menu");
  });

  it("forwards the menu ref to the native menu element", () => {
    const ref = createRef<HTMLMenuElement>();

    render(
      <Menu ref={ref}>
        <Menu.Item>Item</Menu.Item>
      </Menu>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("MENU");
  });

  it("forwards props to a menu item", () => {
    render(
      <Menu>
        <Menu.Item
          id="edit-item"
          data-testid="menu-item"
          className="custom-item"
        >
          Edit
        </Menu.Item>
      </Menu>,
    );

    const item = screen.getByTestId("menu-item");

    expect(item.tagName).toBe("LI");
    expect(item).toHaveAttribute("id", "edit-item");
    expect(item).toHaveClass("aui-menu__item", "custom-item");
  });

  it("forwards the item ref to the native list item", () => {
    const ref = createRef<HTMLLIElement>();

    render(
      <Menu>
        <Menu.Item ref={ref}>Item</Menu.Item>
      </Menu>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("LI");
  });

  it("supports an empty menu", () => {
    render(<Menu data-testid="empty-menu" />);

    expect(screen.getByTestId("empty-menu")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
