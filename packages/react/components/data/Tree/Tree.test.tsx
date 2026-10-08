import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tree } from "./Tree";
import type { TreeNode } from "./Tree.types";

const data: TreeNode[] = [
  {
    id: "root",
    label: "Root",
    children: [
      {
        id: "child-1",
        label: "Child 1",
      },
      {
        id: "folder",
        label: "Folder",
        children: [
          {
            id: "nested",
            label: "Nested",
          },
        ],
      },
    ],
  },
];

describe("Tree", () => {
  it("renders tree nodes", () => {
    render(<Tree data={data} />);

    expect(
      screen.getByRole("tree"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("treeitem", {
        name: /root/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Child 1",
      }),
    ).not.toBeInTheDocument();
  });

  it("supports defaultExpandedIds", () => {
    render(
      <Tree
        data={data}
        defaultExpandedIds={["root"]}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Child 1",
      }),
    ).toBeInTheDocument();
  });

  it("expands and collapses nodes", () => {
    render(<Tree data={data} />);

    const expandButton = screen.getByRole(
      "button",
      {
        name: "Expand Root",
      },
    );

    fireEvent.click(expandButton);

    expect(
      screen.getByRole("button", {
        name: "Child 1",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Collapse Root",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Collapse Root",
      }),
    );

    expect(
      screen.queryByRole("button", {
        name: "Child 1",
      }),
    ).not.toBeInTheDocument();
  });

  it("calls onExpandedChange", () => {
    const onExpandedChange = vi.fn();

    render(
      <Tree
        data={data}
        onExpandedChange={onExpandedChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Expand Root",
      }),
    );

    expect(onExpandedChange).toHaveBeenCalledWith([
      "root",
    ]);
  });

  it("supports controlled expandedIds", () => {
    const onExpandedChange = vi.fn();

    const { rerender } = render(
      <Tree
        data={data}
        expandedIds={[]}
        onExpandedChange={onExpandedChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Expand Root",
      }),
    );

    expect(onExpandedChange).toHaveBeenCalledWith([
      "root",
    ]);

    expect(
      screen.queryByRole("button", {
        name: "Child 1",
      }),
    ).not.toBeInTheDocument();

    rerender(
      <Tree
        data={data}
        expandedIds={["root"]}
        onExpandedChange={onExpandedChange}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Child 1",
      }),
    ).toBeInTheDocument();
  });

  it("calls onSelect", () => {
    const onSelect = vi.fn();

    render(
      <Tree
        data={data}
        defaultExpandedIds={["root"]}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Child 1",
      }),
    );

    expect(onSelect).toHaveBeenCalledWith(
      data[0].children![0],
    );
  });

  it("supports selectedId", () => {
    render(
      <Tree
        data={data}
        defaultExpandedIds={["root"]}
        selectedId="child-1"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Child 1",
      }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("supports disabled nodes", () => {
    const disabledData: TreeNode[] = [
      {
        id: "disabled",
        label: "Disabled",
        disabled: true,
      },
    ];

    const onSelect = vi.fn();

    render(
      <Tree
        data={disabledData}
        onSelect={onSelect}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Disabled",
    });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onSelect).not.toHaveBeenCalled();
  });
});
