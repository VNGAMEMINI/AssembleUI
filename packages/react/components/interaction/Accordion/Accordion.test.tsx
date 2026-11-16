import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createRef } from "react";
import type { KeyboardEvent } from "react";

import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("renders composed items", () => {
    render(
      <Accordion>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toBeInTheDocument();
  });

  it("keeps items closed by default", () => {
    render(
      <Accordion>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "false");

    expect(
      screen.queryByText("General content"),
    ).not.toBeInTheDocument();
  });

  it("opens an item when its trigger is clicked", () => {
    render(
      <Accordion>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "General" }),
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(screen.getByText("General content")).toBeInTheDocument();
  });

  it("closes an open item when clicked again", () => {
    render(
      <Accordion defaultOpenIds={["general"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "General" });

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("General content")).not.toBeInTheDocument();
  });

  it("opens the item specified by defaultOpenIds", () => {
    render(
      <Accordion defaultOpenIds={["account"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(screen.getByText("Account content")).toBeInTheDocument();
  });

  it("allows only one open item by default", () => {
    render(
      <Accordion defaultOpenIds={["general", "account"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("allows multiple items to remain open when multiple is enabled", () => {
    render(
      <Accordion multiple defaultOpenIds={["general", "account"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the previously open item in single mode", () => {
    render(
      <Accordion defaultOpenIds={["general"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Account" }),
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "false");

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("does not open a disabled item", () => {
    render(
      <Accordion>
        <Accordion.Item id="disabled" title="Disabled" disabled>
          Disabled content
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "Disabled" });

    expect(trigger).toBeDisabled();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Disabled content")).not.toBeInTheDocument();
  });

  it("does not open a disabled item from defaultOpenIds", () => {
    render(
      <Accordion defaultOpenIds={["disabled"]}>
        <Accordion.Item id="disabled" title="Disabled" disabled>
          Disabled content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "Disabled" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onOpenChange when an item is toggled", () => {
    const onOpenChange = vi.fn();

    render(
      <Accordion onOpenChange={onOpenChange}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "General" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(["general"]);
  });

  it("supports controlled openIds", () => {
    const onOpenChange = vi.fn();

    render(
      <Accordion openIds={["general"]} onOpenChange={onOpenChange}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Account" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(["account"]);

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("supports multiple controlled openIds", () => {
    render(
      <Accordion multiple openIds={["general", "account"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
        <Accordion.Item id="account" title="Account">
          Account content
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "General" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByRole("button", { name: "Account" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("supports ArrowDown navigation", () => {
    render(
      <Accordion>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="two" title="Two">Two content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });

    one.focus();
    fireEvent.keyDown(one, { key: "ArrowDown" });

    expect(two).toHaveFocus();
  });

  it("supports ArrowUp navigation", () => {
    render(
      <Accordion>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="two" title="Two">Two content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });

    two.focus();
    fireEvent.keyDown(two, { key: "ArrowUp" });

    expect(one).toHaveFocus();
  });

  it("skips disabled items during keyboard navigation", () => {
    render(
      <Accordion>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="disabled" title="Disabled" disabled>
          Disabled content
        </Accordion.Item>
        <Accordion.Item id="three" title="Three">Three content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const three = screen.getByRole("button", { name: "Three" });

    one.focus();
    fireEvent.keyDown(one, { key: "ArrowDown" });

    expect(three).toHaveFocus();
  });

  it("supports Home and End navigation", () => {
    render(
      <Accordion>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="two" title="Two">Two content</Accordion.Item>
        <Accordion.Item id="three" title="Three">Three content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });
    const three = screen.getByRole("button", { name: "Three" });

    two.focus();
    fireEvent.keyDown(two, { key: "Home" });
    expect(one).toHaveFocus();

    fireEvent.keyDown(one, { key: "End" });
    expect(three).toHaveFocus();
  });

  it("wraps keyboard navigation at both ends", () => {
    render(
      <Accordion>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="two" title="Two">Two content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });

    two.focus();
    fireEvent.keyDown(two, { key: "ArrowDown" });
    expect(one).toHaveFocus();

    fireEvent.keyDown(one, { key: "ArrowUp" });
    expect(two).toHaveFocus();
  });

  it("does not navigate when the consumer prevents the key event", () => {
    const onKeyDown = vi.fn((event: KeyboardEvent<HTMLDivElement>) => event.preventDefault());

    render(
      <Accordion onKeyDown={onKeyDown}>
        <Accordion.Item id="one" title="One">One content</Accordion.Item>
        <Accordion.Item id="two" title="Two">Two content</Accordion.Item>
      </Accordion>,
    );

    const one = screen.getByRole("button", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });

    one.focus();
    fireEvent.keyDown(one, { key: "ArrowDown" });

    expect(onKeyDown).toHaveBeenCalled();
    expect(one).toHaveFocus();
    expect(two).not.toHaveFocus();
  });

  it("keeps nested Accordion keyboard navigation scoped to the nearest root", () => {
    render(
      <Accordion>
        <Accordion.Item id="parent" title="Parent">
          <Accordion>
            <Accordion.Item id="child-one" title="Child one">
              Child one content
            </Accordion.Item>
            <Accordion.Item id="child-two" title="Child two">
              Child two content
            </Accordion.Item>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item id="sibling" title="Sibling">
          Sibling content
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Parent" }));

    const childOne = screen.getByRole("button", { name: "Child one" });
    const childTwo = screen.getByRole("button", { name: "Child two" });

    childOne.focus();
    fireEvent.keyDown(childOne, { key: "ArrowDown" });

    expect(childTwo).toHaveFocus();
  });

  it("provides accessible trigger and panel relationships", () => {
    render(
      <Accordion defaultOpenIds={["general"]}>
        <Accordion.Item id="general" title="General">
          General content
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "General" });
    const panel = screen.getByRole("region");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("supports React nodes as title and content", () => {
    render(
      <Accordion defaultOpenIds={["custom"]}>
        <Accordion.Item
          id="custom"
          title={<span><strong>Custom</strong> title</span>}
        >
          <strong>Rich content</strong>
        </Accordion.Item>
      </Accordion>,
    );

    expect(
      screen.getByRole("button", { name: "Custom title" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Rich content")).toBeInTheDocument();
  });

  it("forwards the root ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Accordion ref={ref}>
        <Accordion.Item id="one" title="One">
          One content
        </Accordion.Item>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards the item ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <Accordion>
        <Accordion.Item id="one" title="One" ref={ref}>
          One content
        </Accordion.Item>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  it("supports root and item className", () => {
    const { container } = render(
      <Accordion className="custom-root">
        <Accordion.Item
          id="one"
          title="One"
          className="custom-item"
        >
          One content
        </Accordion.Item>
      </Accordion>,
    );

    expect(container.querySelector(".aui-accordion"))
      .toHaveClass("custom-root");

    expect(container.querySelector(".aui-accordion__item"))
      .toHaveClass("custom-item");
  });

  it("supports native HTML attributes on the root and items", () => {
    render(
      <Accordion data-testid="accordion-root">
        <Accordion.Item
          id="one"
          title="One"
          data-testid="accordion-item"
        >
          One content
        </Accordion.Item>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-root")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-item")).toBeInTheDocument();
  });

  it("does not create duplicate DOM ids when separate accordions reuse item ids", () => {
    render(
      <>
        <Accordion>
          <Accordion.Item id="overview" title="First overview">
            First content
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item id="overview" title="Second overview">
            Second content
          </Accordion.Item>
        </Accordion>
      </>,
    );

    const itemElements = document.querySelectorAll(
      ".aui-accordion__item",
    );

    expect(itemElements).toHaveLength(2);
    expect(itemElements[0]).not.toHaveAttribute("id");
    expect(itemElements[1]).not.toHaveAttribute("id");
  });
});
