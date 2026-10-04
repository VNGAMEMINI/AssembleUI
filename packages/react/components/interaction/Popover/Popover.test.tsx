import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders closed by default", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>,
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("opens when the trigger is clicked", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("closes when the trigger is clicked again", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>,
    );

    const trigger = screen.getByRole("button", {
      name: "Open",
    });

    fireEvent.click(trigger);

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Popover
        defaultOpen
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const { rerender } = render(
      <Popover
        open={false}
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();

    rerender(
      <Popover
        open
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    render(
      <Popover
        onOpenChange={onOpenChange}
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(
      true,
    );
  });

  it("closes on Escape", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("does not close on Escape when disabled", () => {
    render(
      <Popover
        closeOnEscape={false}
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("closes when clicking outside", () => {
    render(
      <>
        <Popover trigger={<button>Open</button>}>
          <p>Popover content</p>
        </Popover>

        <button>Outside</button>
      </>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    fireEvent.pointerDown(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("does not close on outside click when disabled", () => {
    render(
      <Popover
        closeOnOutsideClick={false}
        trigger={<button>Open</button>}
      >
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open",
      }),
    );

    fireEvent.pointerDown(document.body);

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("sets accessibility attributes on the trigger", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>,
    );

    const trigger = screen.getByRole("button", {
      name: "Open",
    });

    expect(
      trigger,
    ).toHaveAttribute(
      "aria-haspopup",
      "dialog",
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

  it.each([
    "top",
    "right",
    "bottom",
    "left",
  ] as const)(
    "supports %s placement",
    (placement) => {
      render(
        <Popover
          placement={placement}
          trigger={<button>Open</button>}
        >
          <p>Popover content</p>
        </Popover>,
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "Open",
        }),
      );

      expect(
        screen.getByRole("dialog"),
      ).toHaveAttribute(
        "data-placement",
        placement,
      );
    },
  );
});
