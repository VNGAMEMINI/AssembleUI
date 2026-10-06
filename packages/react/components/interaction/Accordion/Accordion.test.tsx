import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { Accordion } from "./Accordion";

const items = [
  {
    id: "general",
    title: "General",
    content: "General content",
  },
  {
    id: "account",
    title: "Account",
    content: "Account content",
  },
  {
    id: "advanced",
    title: "Advanced",
    content: "Advanced content",
    disabled: true,
  },
];

describe("Accordion", () => {
  it("renders all item titles", () => {
    render(<Accordion items={items} />);

    expect(
      screen.getByRole("button", {
        name: "General",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Account",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Advanced",
      }),
    ).toBeInTheDocument();
  });

  it("keeps all items closed by default", () => {
    render(<Accordion items={items} />);

    expect(
      screen.getByRole("button", {
        name: "General",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    expect(
      screen.getByRole("button", {
        name: "Account",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    expect(
      screen.queryByText("General content"),
    ).not.toBeInTheDocument();
  });

  it("opens an item when clicked", () => {
    render(<Accordion items={items} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "General",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    expect(
      screen.getByText("General content"),
    ).toBeInTheDocument();
  });

  it("closes an open item when clicked again", () => {
    render(<Accordion items={items} />);

    const trigger =
      screen.getByRole("button", {
        name: "General",
      });

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    expect(
      screen.queryByText("General content"),
    ).not.toBeInTheDocument();
  });

  it("supports defaultOpenIds", () => {
    render(
      <Accordion
        items={items}
        defaultOpenIds={[
          "account",
        ]}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Account",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    expect(
      screen.getByText("Account content"),
    ).toBeInTheDocument();
  });

  it("allows only one item when multiple is false", () => {
    render(<Accordion items={items} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Account",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "General",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    expect(
      screen.getByRole("button", {
        name: "Account",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("allows multiple items when multiple is true", () => {
    render(
      <Accordion
        items={items}
        multiple
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Account",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "General",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    expect(
      screen.getByRole("button", {
        name: "Account",
      }),
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("ignores disabled items", () => {
    const onOpenChange =
      vi.fn();

    render(
      <Accordion
        items={items}
        onOpenChange={
          onOpenChange
        }
      />,
    );

    const disabledTrigger =
      screen.getByRole("button", {
        name: "Advanced",
      });

    expect(disabledTrigger).toBeDisabled();

    fireEvent.click(
      disabledTrigger,
    );

    expect(
      onOpenChange,
    ).not.toHaveBeenCalled();

    expect(
      disabledTrigger,
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("calls onOpenChange", () => {
    const onOpenChange =
      vi.fn();

    render(
      <Accordion
        items={items}
        onOpenChange={
          onOpenChange
        }
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    expect(
      onOpenChange,
    ).toHaveBeenCalledWith([
      "general",
    ]);
  });

  it("supports controlled openIds", () => {
    const onOpenChange =
      vi.fn();

    render(
      <Accordion
        items={items}
        openIds={["general"]}
        onOpenChange={
          onOpenChange
        }
      />,
    );

    expect(
      screen.getByText("General content"),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    expect(
      onOpenChange,
    ).toHaveBeenCalledWith([]);
  });

  it("does not update controlled state internally", () => {
    const onOpenChange =
      vi.fn();

    render(
      <Accordion
        items={items}
        openIds={[]}
        onOpenChange={
          onOpenChange
        }
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "General",
      }),
    );

    expect(
      screen.queryByText(
        "General content",
      ),
    ).not.toBeInTheDocument();

    expect(
      onOpenChange,
    ).toHaveBeenCalledWith([
      "general",
    ]);
  });

  it("supports ArrowDown navigation", async () => {
    render(<Accordion items={items} />);

    const general =
      screen.getByRole("button", {
        name: "General",
      });

    const account =
      screen.getByRole("button", {
        name: "Account",
      });

    general.focus();

    fireEvent.keyDown(general, {
      key: "ArrowDown",
    });

    await waitFor(() => {
      expect(account).toHaveFocus();
    });
  });

  it("supports ArrowUp navigation", async () => {
    render(<Accordion items={items} />);

    const general =
      screen.getByRole("button", {
        name: "General",
      });

    const account =
      screen.getByRole("button", {
        name: "Account",
      });

    account.focus();

    fireEvent.keyDown(account, {
      key: "ArrowUp",
    });

    await waitFor(() => {
      expect(general).toHaveFocus();
    });
  });

  it("skips disabled items during navigation", async () => {
    render(<Accordion items={items} />);

    const account =
      screen.getByRole("button", {
        name: "Account",
      });

    account.focus();

    fireEvent.keyDown(account, {
      key: "ArrowDown",
    });

    await waitFor(() => {
      expect(account).toHaveFocus();
    });
  });

  it("supports Home navigation", async () => {
    render(<Accordion items={items} />);

    const general =
      screen.getByRole("button", {
        name: "General",
      });

    const account =
      screen.getByRole("button", {
        name: "Account",
      });

    account.focus();

    fireEvent.keyDown(account, {
      key: "Home",
    });

    await waitFor(() => {
      expect(general).toHaveFocus();
    });
  });

  it("supports End navigation", async () => {
    render(<Accordion items={items} />);

    const account =
      screen.getByRole("button", {
        name: "Account",
      });

    const general =
      screen.getByRole("button", {
        name: "General",
      });

    general.focus();

    fireEvent.keyDown(general, {
      key: "End",
    });

    await waitFor(() => {
      expect(account).toHaveFocus();
    });
  });

  it("exposes correct ARIA relationships", () => {
    render(
      <Accordion
        items={items}
        defaultOpenIds={[
          "general",
        ]}
      />,
    );

    const trigger =
      screen.getByRole("button", {
        name: "General",
      });

    const panel =
      screen.getByRole("region", {
        name: "General",
      });

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
      panel.id,
    );

    expect(
      panel,
    ).toHaveAttribute(
      "aria-labelledby",
      trigger.id,
    );
  });

  it("forwards the ref", () => {
    const ref =
      { current: null } as unknown as React.RefObject<HTMLDivElement>;

    render(
      <Accordion
        ref={ref}
        items={items}
      />,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLDivElement,
    );
  });

  it("applies custom className", () => {
    render(
      <Accordion
        items={items}
        className="custom-accordion"
      />,
    );

    expect(
      document.querySelector(
        ".aui-accordion.custom-accordion",
      ),
    ).toBeInTheDocument();
  });
});
