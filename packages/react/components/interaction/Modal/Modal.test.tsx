import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal open={false} title="Test modal">
        Content
      </Modal>,
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Modal open title="Test modal">
        Content
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Modal defaultOpen title="Test modal">
        Content
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onOpenChange when closed", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal
        open
        title="Test modal"
        onOpenChange={onOpenChange}
      >
        Content
      </Modal>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Close" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("connects title with aria-labelledby", () => {
    render(
      <Modal open title="Profile">
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const title = screen.getByRole("heading", {
      name: "Profile",
    });

    expect(dialog).toHaveAttribute(
      "aria-labelledby",
      title.id,
    );
  });

  it("connects description with aria-describedby", () => {
    render(
      <Modal
        open
        title="Profile"
        description="Profile information"
      >
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const description = screen.getByText(
      "Profile information",
    );

    expect(dialog).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("renders a custom close label", () => {
    render(
      <Modal
        open
        title="Test modal"
        closeLabel="Close dialog"
      >
        Content
      </Modal>,
    );

    expect(
      screen.getByRole("button", {
        name: "Close dialog",
      }),
    ).toBeInTheDocument();
  });

  it("closes when Escape is pressed", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal
        open
        title="Test modal"
        onOpenChange={onOpenChange}
      >
        Content
      </Modal>,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close on Escape when disabled", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal
        open
        title="Test modal"
        closeOnEscape={false}
        onOpenChange={onOpenChange}
      >
        Content
      </Modal>,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal
        open
        title="Test modal"
        onOpenChange={onOpenChange}
      >
        Content
      </Modal>,
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
      <Modal
        open
        title="Test modal"
        closeOnBackdrop={false}
        onOpenChange={onOpenChange}
      >
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();

    fireEvent.mouseDown(backdrop!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders footer content", () => {
    render(
      <Modal
        open
        title="Test modal"
        footer={<button type="button">Save</button>}
      >
        Content
      </Modal>,
    );

    expect(
      screen.getByRole("button", { name: "Save" }),
    ).toBeInTheDocument();
  });

  it("renders through a document body portal", () => {
    render(
      <Modal open title="Test modal">
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");

    expect(dialog.parentElement?.parentElement).toBe(
      document.body,
    );
  });

  it("locks body scrolling while open", () => {
    const { unmount } = render(
      <Modal open title="Test modal">
        Content
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("forwards the ref", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <Modal
        ref={ref}
        open
        title="Test modal"
      >
        Content
      </Modal>,
    );

    expect(ref.current).toBe(
      screen.getByRole("dialog"),
    );
  });
});
