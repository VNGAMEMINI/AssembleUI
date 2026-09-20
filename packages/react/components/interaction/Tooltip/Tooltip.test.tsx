import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("is closed by default", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on mouse enter", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    fireEvent.mouseEnter(trigger);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Help");
  });

  it("closes on mouse leave", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on focus", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    fireEvent.focus(trigger);

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("closes on blur", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.blur(trigger);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Tooltip
        content="Help"
        defaultOpen
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("sets aria-describedby while open", () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    expect(trigger).not.toHaveAttribute("aria-describedby");

    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByRole("tooltip");
    const describedBy = trigger.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(tooltip).toHaveAttribute("id", describedBy);
  });

  it("supports controlled open state", () => {
    render(
      <Tooltip
        content="Help"
        open
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip
        content="Help"
        onOpenChange={onOpenChange}
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole("button"));

    expect(onOpenChange).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(screen.getByRole("button"));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies placement", () => {
    render(
      <Tooltip
        content="Help"
        placement="right"
        defaultOpen
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toHaveClass(
      "aui-tooltip__content--right",
    );
  });

  it("preserves existing trigger handlers", () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(
      <Tooltip content="Help">
        <button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          Trigger
        </button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button");

    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    fireEvent.focus(trigger);
    fireEvent.blur(trigger);

    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseLeave).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });
});
