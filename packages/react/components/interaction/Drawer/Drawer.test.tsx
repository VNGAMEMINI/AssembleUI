import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("does not render when closed", () => {
    render(
      <Drawer open={false} title="Test drawer">
        Content
      </Drawer>,
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Drawer open title="Test drawer">
        Content
      </Drawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Drawer defaultOpen title="Test drawer">
        Content
      </Drawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        title="Test drawer"
        onOpenChange={onOpenChange}
      >
        Content
      </Drawer>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Close" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("connects title with aria-labelledby", () => {
    render(
      <Drawer open title="Navigation">
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");
    const title = screen.getByRole("heading", {
      name: "Navigation",
    });

    expect(dialog).toHaveAttribute(
      "aria-labelledby",
      title.id,
    );
  });

  it("connects description with aria-describedby", () => {
    render(
      <Drawer
        open
        title="Navigation"
        description="Navigation links"
      >
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");
    const description = screen.getByText(
      "Navigation links",
    );

    expect(dialog).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("renders a custom close label", () => {
    render(
      <Drawer
        open
        title="Test drawer"
        closeLabel="Close navigation"
      >
        Content
      </Drawer>,
    );

    expect(
      screen.getByRole("button", {
        name: "Close navigation",
      }),
    ).toBeInTheDocument();
  });

  it("closes when Escape is pressed", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        title="Test drawer"
        onOpenChange={onOpenChange}
      >
        Content
      </Drawer>,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close on Escape when disabled", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        title="Test drawer"
        closeOnEscape={false}
        onOpenChange={onOpenChange}
      >
        Content
      </Drawer>,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        title="Test drawer"
        onOpenChange={onOpenChange}
      >
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();

    fireEvent.mouseDown(backdrop!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when backdrop closing is disabled", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        title="Test drawer"
        closeOnBackdrop={false}
        onOpenChange={onOpenChange}
      >
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();

    fireEvent.mouseDown(backdrop!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders footer content", () => {
    render(
      <Drawer
        open
        title="Test drawer"
        footer={<button type="button">Save</button>}
      >
        Content
      </Drawer>,
    );

    expect(
      screen.getByRole("button", { name: "Save" }),
    ).toBeInTheDocument();
  });

  it("renders through a document body portal", () => {
    render(
      <Drawer open title="Test drawer">
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");

    expect(dialog.parentElement?.parentElement).toBe(
      document.body,
    );
  });

  it("locks body scrolling while open", () => {
    const { unmount } = render(
      <Drawer open title="Test drawer">
        Content
      </Drawer>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("forwards the ref", () => {
    const ref = {
      current: null as HTMLDivElement | null,
    };

    render(
      <Drawer
        ref={ref}
        open
        title="Test drawer"
      >
        Content
      </Drawer>,
    );

    expect(ref.current).toBe(
      screen.getByRole("dialog"),
    );
  });

  it.each(["left", "right", "top", "bottom"] as const)(
    "supports the %s side",
    (side) => {
      render(
        <Drawer
          open
          title="Test drawer"
          side={side}
        >
          Content
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toHaveAttribute(
        "data-side",
        side,
      );
    },
  );
});
