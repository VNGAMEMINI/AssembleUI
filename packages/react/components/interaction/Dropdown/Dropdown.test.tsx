import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("renders closed by default", () => {
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();
  });

  it("opens when the trigger is clicked", () => {
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Actions",
      }),
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    ).toBeInTheDocument();
  });

  it("closes when the trigger is clicked again", () => {
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    const trigger = screen.getByRole(
      "button",
      {
        name: "Actions",
      },
    );

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Dropdown
        defaultOpen
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const { rerender } = render(
      <Dropdown
        open={false}
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();

    rerender(
      <Dropdown
        open
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    render(
      <Dropdown
        onOpenChange={onOpenChange}
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Actions",
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(
      true,
    );
  });

  it("closes on Escape", () => {
    render(
      <Dropdown
        defaultOpen
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();
  });

  it("does not close on Escape when disabled", () => {
    render(
      <Dropdown
        defaultOpen
        closeOnEscape={false}
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();
  });

  it("closes when clicking outside", () => {
    render(
      <>
        <Dropdown
          defaultOpen
          trigger={<button>Actions</button>}
          items={[
            {
              id: "edit",
              label: "Edit",
            },
          ]}
        />

        <button>Outside</button>
      </>,
    );

    fireEvent.pointerDown(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();
  });

  it("does not close on outside click when disabled", () => {
    render(
      <>
        <Dropdown
          defaultOpen
          closeOnOutsideClick={false}
          trigger={<button>Actions</button>}
          items={[
            {
              id: "edit",
              label: "Edit",
            },
          ]}
        />

        <button>Outside</button>
      </>,
    );

    fireEvent.pointerDown(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();
  });

  it("sets accessibility attributes on the trigger", () => {
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    const trigger = screen.getByRole(
      "button",
      {
        name: "Actions",
      },
    );

    expect(
      trigger,
    ).toHaveAttribute(
      "aria-haspopup",
      "menu",
    );

    expect(
      trigger,
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    fireEvent.click(trigger);

    expect(
      trigger,
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    expect(
      trigger,
    ).toHaveAttribute(
      "aria-controls",
    );
  });

  it("calls an item's onSelect", () => {
    const onSelect = vi.fn();

    render(
      <Dropdown
        defaultOpen
        trigger={<button>Actions</button>}
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

  it("closes after selecting an item", () => {
    render(
      <Dropdown
        defaultOpen
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: "Edit",
      }),
    );

    expect(
      screen.queryByRole("menu"),
    ).not.toBeInTheDocument();
  });

  it("does not select a disabled item", () => {
    const onSelect = vi.fn();

    render(
      <Dropdown
        defaultOpen
        trigger={<button>Actions</button>}
        items={[
          {
            id: "delete",
            label: "Delete",
            disabled: true,
            onSelect,
          },
        ]}
      />,
    );

    const item = screen.getByRole(
      "menuitem",
      {
        name: "Delete",
      },
    );

    expect(item).toBeDisabled();

    fireEvent.click(item);

    expect(onSelect).not.toHaveBeenCalled();

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();
  });

  it("supports placement", () => {
    const { rerender } = render(
      <Dropdown
        defaultOpen
        placement="top"
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("menu"),
    ).toHaveAttribute(
      "data-placement",
      "top",
    );

    rerender(
      <Dropdown
        defaultOpen
        placement="right"
        trigger={<button>Actions</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("menu"),
    ).toHaveAttribute(
      "data-placement",
      "right",
    );
  });
});
