import { createRef } from "react";
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

  it("calls the consumer onKeyDown handler", () => {
    const onKeyDown = vi.fn();

    render(<Menu items={items} onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole("menu"), {
      key: "ArrowDown",
    });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].key).toBe("ArrowDown");
  });

  it("respects preventDefault from the consumer onKeyDown handler", () => {
    const onKeyDown = vi.fn((event) => event.preventDefault());

    render(<Menu items={items} onKeyDown={onKeyDown} />);

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    edit.focus();

    fireEvent.keyDown(edit, {
      key: "ArrowDown",
    });

    expect(edit).toHaveFocus();
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("Menu with trigger", () => {
  const popupItems = [
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];

  it("renders closed by default", () => {
    render(
      <Menu
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens and closes when the trigger is clicked", () => {
    render(
      <Menu
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });

    fireEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Menu
        defaultOpen
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const { rerender } = render(
      <Menu
        open={false}
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    rerender(
      <Menu
        open
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    render(
      <Menu
        onOpenChange={onOpenChange}
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Actions" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes on Escape and restores trigger focus", () => {
    render(
      <Menu
        defaultOpen
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("respects preventDefault for popup Escape", () => {
  const onKeyDown = vi.fn(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
    },
  );

  render(
    <Menu
      defaultOpen
      onKeyDown={onKeyDown}
      trigger={<button>Actions</button>}
      items={popupItems}
    />,
  );

  fireEvent.keyDown(screen.getByRole("menu"), {
    key: "Escape",
  });

  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("menu")).toBeInTheDocument();
});

  it("does not close on Escape when closeOnEscape is false", () => {
    render(
      <Menu
        defaultOpen
        closeOnEscape={false}
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes when clicking outside", () => {
    render(
      <>
        <Menu
          defaultOpen
          trigger={<button>Actions</button>}
          items={popupItems}
        />
        <button>Outside</button>
      </>,
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not close on outside click when disabled", () => {
    render(
      <>
        <Menu
          defaultOpen
          closeOnOutsideClick={false}
          trigger={<button>Actions</button>}
          items={popupItems}
        />
        <button>Outside</button>
      </>,
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("sets accessibility attributes on the trigger", () => {
    render(
      <Menu
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });

    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls");
  });

  it("calls item onSelect and closes after selection", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        defaultOpen
        trigger={<button>Actions</button>}
        items={[{ id: "edit", label: "Edit", onSelect }]}
      />,
    );

    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not select disabled items or close the menu", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        defaultOpen
        trigger={<button>Actions</button>}
        items={[{ id: "delete", label: "Delete", disabled: true, onSelect }]}
      />,
    );

    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));

    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("supports popup placement", () => {
    render(
      <Menu
        defaultOpen
        placement="top"
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    expect(screen.getByRole("menu")).toHaveAttribute("data-placement", "top");
  });

  it("forwards ref and preserves the menu root DOM contract", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Menu
        ref={ref}
        defaultOpen
        title="Menu root"
        data-state="custom"
        className="custom-class"
        style={{ color: "red" }}
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    const menu = screen.getByTitle("Menu root");

    expect(ref.current).toBe(menu);
    expect(menu).toHaveAttribute("data-state", "custom");
    expect(menu).toHaveClass("aui-menu", "aui-menu--popup", "custom-class");
    expect(menu).toHaveStyle({ color: "red" });
  });

  it("opens and focuses the first item with ArrowDown on the trigger", async () => {
    render(
      <Menu
        trigger={<button>Actions</button>}
        items={popupItems}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });

    await act(async () => {
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });
});
