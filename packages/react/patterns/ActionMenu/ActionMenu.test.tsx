import { createRef } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ActionMenu } from "./ActionMenu";

describe("ActionMenu", () => {
  it("renders link items", () => {
    render(
      <ActionMenu
        items={[
          {
            id: "home",
            type: "link",
            label: "Home",
            href: "/",
          },
          {
            id: "products",
            type: "link",
            label: "Products",
            href: "/products",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toHaveAttribute("href", "/");

    expect(
      screen.getByRole("link", {
        name: "Products",
      }),
    ).toHaveAttribute("href", "/products");
  });

  it("renders action items", () => {
    render(
      <ActionMenu
        items={[
          {
            id: "save",
            type: "action",
            label: "Save",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });

  it("calls action handlers", () => {
    const onClick = vi.fn();

    render(
      <ActionMenu
        items={[
          {
            id: "save",
            type: "action",
            label: "Save",
            onClick,
          },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports external links", () => {
    render(
      <ActionMenu
        items={[
          {
            id: "github",
            type: "link",
            label: "GitHub",
            href: "https://github.com",
            external: true,
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "GitHub",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com",
    );
  });

  it("supports custom className", () => {
    const { container } = render(
      <ActionMenu
        className="custom-menu"
        items={[
          {
            id: "home",
            type: "link",
            label: "Home",
            href: "/",
          },
        ]}
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-action-menu",
      "custom-menu",
    );
  });

  it("forwards native navigation attributes", () => {
    render(
      <ActionMenu
        aria-label="Main actions"
        data-testid="action-menu"
        items={[]}
      />,
    );

    expect(
      screen.getByTestId("action-menu"),
    ).toHaveAttribute(
      "aria-label",
      "Main actions",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <ActionMenu
        ref={ref}
        items={[]}
      />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLElement,
    );
  });

  it("renders an empty menu", () => {
    const { container } = render(
      <ActionMenu items={[]} />,
    );

    expect(
      container.querySelector(
        ".aui-action-menu__list",
      ),
    ).toBeInTheDocument();

    expect(
      container.querySelectorAll(
        ".aui-action-menu__item",
      ),
    ).toHaveLength(0);
  });

  it("uses stable identities for multiple items", () => {
    render(
      <ActionMenu
        items={[
          {
            id: "home",
            type: "link",
            label: "Home",
            href: "/",
          },
          {
            id: "save",
            type: "action",
            label: "Save",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });
});
