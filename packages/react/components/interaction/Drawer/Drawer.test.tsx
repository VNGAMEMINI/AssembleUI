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
  Drawer,
} from "./Drawer";

describe("Drawer", () => {
  it("does not render while closed by default", () => {
    render(
      <Drawer>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when defaultOpen is true", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    render(
      <Drawer open>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("notifies when the drawer should close", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer open onOpenChange={onOpenChange}>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer open onOpenChange={onOpenChange}>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("can disable closing on Escape", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        onOpenChange={onOpenChange}
        closeOnEscape={false}
      >
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked", () => {
    const onOpenChange = vi.fn();

    const { container } = render(
      <Drawer open onOpenChange={onOpenChange}>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    fireEvent.mouseDown(
      container.ownerDocument.querySelector(".aui-drawer")!,
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("can disable backdrop closing", () => {
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open
        onOpenChange={onOpenChange}
        closeOnBackdrop={false}
      >
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    fireEvent.mouseDown(
      document.querySelector(".aui-drawer")!,
    );

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders the dialog title and description", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content
          title="Workspace"
          description="Workspace details"
        >
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.getByRole("heading", {
      name: "Workspace",
    })).toBeInTheDocument();

    expect(screen.getByText("Workspace details")).toBeInTheDocument();
  });

  it("supports placement", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content
          title="Workspace"
          placement="left"
        >
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(document.querySelector(".aui-drawer"))
      .toHaveClass("aui-drawer--left");
  });

  it("applies style to the drawer panel", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content
          title="Workspace"
          style={{ width: "30rem" }}
        >
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(document.querySelector(".aui-drawer__panel"))
      .toHaveStyle({ width: "480px" });

    expect(document.querySelector(".aui-drawer__body"))
      .not.toHaveStyle({ width: "480px" });
  });

  it("renders a grid inside Drawer.Content", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content
          title="Workspace"
          columns={2}
          gap="24px"
          data-testid="content"
        >
          <Drawer.Item>Item A</Drawer.Item>
          <Drawer.Item>Item B</Drawer.Item>
        </Drawer.Content>
      </Drawer>,
    );

    const body = document.querySelector(".aui-drawer__body");

    expect(body).toHaveStyle({
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "24px",
    });
  });

  it("supports custom grid columns", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content
          title="Workspace"
          columns="1fr 2fr"
        >
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(document.querySelector(".aui-drawer__body"))
      .toHaveStyle({
        gridTemplateColumns: "1fr 2fr",
      });
  });

  it("renders Drawer.Item with its class", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content title="Workspace">
          <Drawer.Item data-testid="item">
            Content
          </Drawer.Item>
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.getByTestId("item"))
      .toHaveClass("aui-drawer__item");
  });

  it("supports native attributes and className on Drawer.Item", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content title="Workspace">
          <Drawer.Item
            data-testid="item"
            className="custom-item"
            aria-label="Profile"
          >
            Content
          </Drawer.Item>
        </Drawer.Content>
      </Drawer>,
    );

    expect(screen.getByTestId("item"))
      .toHaveClass("custom-item");

    expect(screen.getByTestId("item"))
      .toHaveAttribute("aria-label", "Profile");
  });

  it("forwards a ref to Drawer.Item", () => {
    const ref = {
      current: null as HTMLDivElement | null,
    };

    render(
      <Drawer defaultOpen>
        <Drawer.Content title="Workspace">
          <Drawer.Item ref={ref} data-testid="item">
            Content
          </Drawer.Item>
        </Drawer.Content>
      </Drawer>,
    );

    expect(ref.current).toBe(screen.getByTestId("item"));
  });

  it("renders through a portal", () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content title="Workspace">
          Content
        </Drawer.Content>
      </Drawer>,
    );

    expect(
      document.body.querySelector(".aui-drawer"),
    ).toBeInTheDocument();
  });
});
