import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Menu } from "./Menu";

describe("Menu", () => {
  const items = [
    {
      id: "edit",
      label: "Edit",
    },
    {
      id: "delete",
      label: "Delete",
    },
    {
      id: "archive",
      label: "Archive",
    },
  ];

  it("renders menu items", () => {
    render(<Menu items={items} />);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Delete",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Archive",
      }),
    ).toBeInTheDocument();
  });

  it("sets the first enabled item as active", () => {
    render(<Menu items={items} />);

    expect(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    ).toHaveAttribute("tabindex", "0");

    expect(
      screen.getByRole("menuitem", {
        name: "Delete",
      }),
    ).toHaveAttribute("tabindex", "-1");
  });

  it("supports defaultActiveId", () => {
    render(<Menu items={items} defaultActiveId="delete" />);

    expect(
      screen.getByRole("menuitem", {
        name: "Delete",
      }),
    ).toHaveAttribute("tabindex", "0");
  });

  it("ignores disabled items during navigation", async () => {
    render(
      <Menu
        items={[
          items[0],
          {
            ...items[1],
            disabled: true,
          },
          items[2],
        ]}
      />,
    );

    const edit = screen.getByRole("menuitem", { name: "Edit" });

    const archive = screen.getByRole("menuitem", { name: "Archive" });

    await act(async () => {
      edit.focus();

      fireEvent.keyDown(edit, {
        key: "ArrowDown",
      });

      await new Promise((resolve) => requestAnimationFrame(resolve));

      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(archive).toHaveFocus();
  });

  it("moves focus with ArrowDown", async () => {
    render(<Menu items={items} />);

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    const deleteItem = screen.getByRole("menuitem", { name: "Delete" });

    await act(async () => {
      edit.focus();

      fireEvent.keyDown(edit, {
        key: "ArrowDown",
      });

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );
    });

    expect(deleteItem).toHaveFocus();
  });

  it("moves focus with ArrowUp", async () => {
    render(<Menu items={items} defaultActiveId="delete" />);

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    const deleteItem = screen.getByRole("menuitem", { name: "Delete" });

    await act(async () => {
      deleteItem.focus();

      fireEvent.keyDown(deleteItem, {
        key: "ArrowUp",
      });

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );
    });

    expect(edit).toHaveFocus();
  });

  it("moves to the first item with Home", async () => {
    render(<Menu items={items} defaultActiveId="archive" />);

    const archive = screen.getByRole("menuitem", { name: "Archive" });
    const edit = screen.getByRole("menuitem", { name: "Edit" });

    await act(async () => {
      archive.focus();

      fireEvent.keyDown(archive, {
        key: "Home",
      });

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );
    });

    expect(edit).toHaveFocus();
  });

  it("moves to the last item with End", async () => {
    render(<Menu items={items} />);

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    const archive = screen.getByRole("menuitem", { name: "Archive" });

    await act(async () => {
      edit.focus();

      fireEvent.keyDown(edit, {
        key: "End",
      });

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );
    });

    expect(archive).toHaveFocus();
  });

  it("loops focus from the last item to the first", async () => {
    render(<Menu items={items} />);

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    const archive = screen.getByRole("menuitem", { name: "Archive" });

    await act(async () => {
      archive.focus();

      fireEvent.keyDown(archive, {
        key: "ArrowDown",
      });

      await new Promise((resolve) => requestAnimationFrame(resolve));

      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(edit).toHaveFocus();
  });

  it("does not loop when loopFocus is false", async () => {
    render(<Menu items={items} loopFocus={false} />);

    const archive = screen.getByRole("menuitem", { name: "Archive" });

    await act(async () => {
      archive.focus();

      fireEvent.keyDown(archive, {
        key: "ArrowDown",
      });

      await new Promise((resolve) => requestAnimationFrame(resolve));

      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(archive).toHaveFocus();
  });

  it("calls item onSelect", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        items={[
          {
            id: "edit",
            label: "Edit",
            onSelect,
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("calls onItemSelect", () => {
    const onItemSelect = vi.fn();

    render(<Menu items={items} onItemSelect={onItemSelect} />);

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    );

    expect(onItemSelect).toHaveBeenCalledWith(items[0]);
  });

  it("selects an item with Enter", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        items={[
          {
            id: "edit",
            label: "Edit",
            onSelect,
          },
        ]}
      />,
    );

    const item = screen.getByRole("menuitem", { name: "Edit" });

    item.focus();

    fireEvent.keyDown(item, {
      key: "Enter",
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("selects an item with Space", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        items={[
          {
            id: "edit",
            label: "Edit",
            onSelect,
          },
        ]}
      />,
    );

    const item = screen.getByRole("menuitem", { name: "Edit" });

    item.focus();

    fireEvent.keyDown(item, {
      key: " ",
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("returns focus to the menu container with Escape", () => {
    render(<Menu items={items} />);

    const menu = screen.getByRole("menu");
    const edit = screen.getByRole("menuitem", { name: "Edit" });

    edit.focus();

    fireEvent.keyDown(edit, {
      key: "Escape",
    });

    expect(menu).toHaveFocus();
  });

  it("does not select disabled items", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        items={[
          {
            id: "edit",
            label: "Edit",
            disabled: true,
            onSelect,
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    );

    expect(onSelect).not.toHaveBeenCalled();
  });
});
