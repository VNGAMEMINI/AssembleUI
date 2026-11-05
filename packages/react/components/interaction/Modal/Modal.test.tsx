import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  Modal,
} from "./Modal";

describe("Modal", () => {
  it("does not render content when closed", () => {
    render(
      <Modal open={false}>
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("renders Modal.Content when open", () => {
    render(
      <Modal open>
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Content"),
    ).toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Modal defaultOpen>
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange when the close button is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal
        open
        onOpenChange={onOpenChange}
      >
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close",
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("connects the title with aria-labelledby", () => {
    render(
      <Modal open>
        <Modal.Content title="Profile">
          Content
        </Modal.Content>
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

  it("connects the description with aria-describedby", () => {
    render(
      <Modal open>
        <Modal.Content
          title="Profile"
          description="Profile information"
        >
          Content
        </Modal.Content>
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

  it("does not set aria-describedby without a description", () => {
    render(
      <Modal open>
        <Modal.Content title="Profile">
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByRole("dialog"),
    ).not.toHaveAttribute("aria-describedby");
  });

  it("supports a custom close label", () => {
    render(
      <Modal open>
        <Modal.Content
          title="Test modal"
          closeLabel="Close dialog"
        >
          Content
        </Modal.Content>
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
        onOpenChange={onOpenChange}
      >
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
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
        closeOnEscape={false}
        onOpenChange={onOpenChange}
      >
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
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
        onOpenChange={onOpenChange}
      >
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
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
        closeOnBackdrop={false}
        onOpenChange={onOpenChange}
      >
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
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
      <Modal open>
        <Modal.Content
          title="Test modal"
          footer={
            <button type="button">
              Save
            </button>
          }
        >
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });

  it("renders through a document body portal", () => {
    render(
      <Modal open>
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");

    expect(
      dialog.parentElement?.parentElement,
    ).toBe(document.body);
  });

  it("locks body scrolling while open", () => {
    const { unmount } = render(
      <Modal open>
        <Modal.Content title="Test modal">
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("forwards a ref to the dialog element", () => {
    const ref = {
      current: null as HTMLDivElement | null,
    };

    render(
      <Modal open>
        <Modal.Content
          ref={ref}
          title="Test modal"
        >
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(ref.current).toBe(
      screen.getByRole("dialog"),
    );
  });

  it("forwards native attributes to the dialog", () => {
    render(
      <Modal open>
        <Modal.Content
          title="Test modal"
          data-testid="modal-dialog"
          aria-label="Profile dialog"
        >
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByTestId("modal-dialog"),
    ).toHaveAttribute(
      "aria-label",
      "Profile dialog",
    );
  });

  it("supports a custom class name on Modal.Content", () => {
    render(
      <Modal open>
        <Modal.Content
          title="Test modal"
          className="custom-modal"
        >
          Content
        </Modal.Content>
      </Modal>,
    );

    expect(
      screen.getByRole("dialog"),
    ).toHaveClass("aui-modal__dialog", "custom-modal");
  });

  it("renders independently controlled buttons outside Modal", () => {
    const onOpenChange = vi.fn();

    render(
      <>
        <button
          type="button"
          onClick={() => onOpenChange(true)}
        >
          Open Modal
        </button>

        <Modal
          open={false}
          onOpenChange={onOpenChange}
        >
          <Modal.Content title="Test modal">
            Content
          </Modal.Content>
        </Modal>
      </>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open Modal",
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
