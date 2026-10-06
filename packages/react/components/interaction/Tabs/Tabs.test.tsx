import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./Tabs";

const items = [
  {
    id: "overview",
    label: "Overview",
    content: "Overview content",
  },
  {
    id: "activity",
    label: "Activity",
    content: "Activity content",
  },
  {
    id: "settings",
    label: "Settings",
    content: "Settings content",
  },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs items={items} />);

    expect(
      screen.getByRole("tab", {
        name: "Overview",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("tab", {
        name: "Settings",
      }),
    ).toBeInTheDocument();
  });

  it("activates the first enabled tab by default", () => {
    render(<Tabs items={items} />);

    expect(
      screen.getByRole("tab", {
        name: "Overview",
      }),
    ).toHaveAttribute(
      "aria-selected",
      "true",
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Overview content",
    );
  });

  it("supports defaultValue", () => {
    render(
      <Tabs
        items={items}
        defaultValue="activity"
      />,
    );

    expect(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    ).toHaveAttribute(
      "aria-selected",
      "true",
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Activity content",
    );
  });

  it("changes the active tab when clicked", () => {
    render(<Tabs items={items} />);

    fireEvent.click(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    );

    expect(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    ).toHaveAttribute(
      "aria-selected",
      "true",
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Activity content",
    );
  });

  it("calls onValueChange when the value changes", () => {
    const onValueChange =
      vi.fn();

    render(
      <Tabs
        items={items}
        onValueChange={
          onValueChange
        }
      />,
    );

    fireEvent.click(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith(
      "activity",
    );
  });

  it("supports controlled value", () => {
    const onValueChange =
      vi.fn();

    const { rerender } = render(
      <Tabs
        items={items}
        value="overview"
        onValueChange={
          onValueChange
        }
      />,
    );

    expect(
      screen.getByRole("tab", {
        name: "Overview",
      }),
    ).toHaveAttribute(
      "aria-selected",
      "true",
    );

    fireEvent.click(
      screen.getByRole("tab", {
        name: "Activity",
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith(
      "activity",
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Overview content",
    );

    rerender(
      <Tabs
        items={items}
        value="activity"
        onValueChange={
          onValueChange
        }
      />,
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Activity content",
    );
  });

  it("ignores disabled tabs", () => {
    render(
      <Tabs
        items={[
          items[0],
          {
            ...items[1],
            disabled: true,
          },
          items[2],
        ]}
      />,
    );

    const activityTab =
      screen.getByRole("tab", {
        name: "Activity",
      });

    expect(activityTab).toBeDisabled();

    fireEvent.click(activityTab);

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Overview content",
    );
  });

  it("moves to the next tab with ArrowRight", async () => {
    render(<Tabs items={items} />);

    const overview =
      screen.getByRole("tab", {
        name: "Overview",
      });

    overview.focus();

    fireEvent.keyDown(
      screen.getByRole("tablist"),
      {
        key: "ArrowRight",
      },
    );

    await waitFor(() => {
      expect(
        screen.getByRole("tab", {
          name: "Activity",
        }),
      ).toHaveFocus();
    });

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent(
      "Activity content",
    );
  });

  it("moves to the previous tab with ArrowLeft", async () => {
    render(
      <Tabs
        items={items}
        defaultValue="activity"
      />,
    );

    const activity =
      screen.getByRole("tab", {
        name: "Activity",
      });

    activity.focus();

    fireEvent.keyDown(
      screen.getByRole("tablist"),
      {
        key: "ArrowLeft",
      },
    );

    await waitFor(() => {
      expect(
        screen.getByRole("tab", {
          name: "Overview",
        }),
      ).toHaveFocus();
    });
  });

  it("moves to the first tab with Home", async () => {
    render(
      <Tabs
        items={items}
        defaultValue="settings"
      />,
    );

    screen
      .getByRole("tab", {
        name: "Settings",
      })
      .focus();

    fireEvent.keyDown(
      screen.getByRole("tablist"),
      {
        key: "Home",
      },
    );

    await waitFor(() => {
      expect(
        screen.getByRole("tab", {
          name: "Overview",
        }),
      ).toHaveFocus();
    });
  });

  it("moves to the last tab with End", async () => {
    render(<Tabs items={items} />);

    screen
      .getByRole("tab", {
        name: "Overview",
      })
      .focus();

    fireEvent.keyDown(
      screen.getByRole("tablist"),
      {
        key: "End",
      },
    );

    await waitFor(() => {
      expect(
        screen.getByRole("tab", {
          name: "Settings",
        }),
      ).toHaveFocus();
    });
  });

  it("skips disabled tabs during keyboard navigation", async () => {
    render(
      <Tabs
        items={[
          items[0],
          {
            ...items[1],
            disabled: true,
          },
          items[2],
        ]}
      />,
    );

    screen
      .getByRole("tab", {
        name: "Overview",
      })
      .focus();

    fireEvent.keyDown(
      screen.getByRole("tablist"),
      {
        key: "ArrowRight",
      },
    );

    await waitFor(() => {
      expect(
        screen.getByRole("tab", {
          name: "Settings",
        }),
      ).toHaveFocus();
    });
  });

  it("exposes correct tab and panel relationships", () => {
    render(<Tabs items={items} />);

    const tab =
      screen.getByRole("tab", {
        name: "Overview",
      });

    const panel =
      screen.getByRole("tabpanel");

    expect(tab).toHaveAttribute(
      "aria-controls",
      panel.id,
    );

    expect(panel).toHaveAttribute(
      "aria-labelledby",
      tab.id,
    );
  });

  it("forwards the ref", () => {
    const ref =
      { current: null } as React.RefObject<HTMLDivElement | null>;

    render(
      <Tabs
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
      <Tabs
        items={items}
        className="custom-tabs"
      />,
    );

    expect(
      screen.getByRole("tablist")
        .parentElement,
    ).toHaveClass(
      "aui-tabs",
      "custom-tabs",
    );
  });
});
