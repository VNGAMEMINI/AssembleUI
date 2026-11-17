import { useState } from "react";
import { Tree } from "@assemble-ui/react";

const data = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "Button.tsx" },
          { id: "input", label: "Input.tsx" },
        ],
      },
      {
        id: "patterns",
        label: "patterns",
        children: [
          { id: "user-card", label: "UserCard.tsx" },
        ],
      },
    ],
  },
  {
    id: "docs",
    label: "docs",
    children: [
      { id: "introduction", label: "Introduction.md" },
      { id: "architecture", label: "Architecture.md" },
    ],
  },
];

export function TreeDemo() {
  const [selectedId, setSelectedId] = useState();

  return (
    <div className="demo-preview">
      <Tree
        data={data}
        defaultExpandedIds={["src", "components"]}
        selectedId={selectedId}
        onSelect={(node) => setSelectedId(node.id)}
      />

      {selectedId ? (
        <p>
          Đã chọn: <strong>{selectedId}</strong>
        </p>
      ) : (
        <p>Chưa chọn node.</p>
      )}
    </div>
  );
}
