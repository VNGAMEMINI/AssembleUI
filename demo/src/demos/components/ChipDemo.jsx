import {
  Chip,
} from "@assemble-ui/react";

export function ChipDemo() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--aui-space-3)",
        flexWrap: "wrap",
      }}
    >
      <Chip>Neutral</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>

      <Chip
        removable
        onRemove={() => {}}
      >
        Removable
      </Chip>
    </div>
  );
}
