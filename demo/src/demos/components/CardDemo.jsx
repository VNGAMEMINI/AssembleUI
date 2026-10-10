import {
  Card,
} from "@assemble-ui/react";

export function CardDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(2, minmax(0, 1fr))",
        gap: "var(--aui-space-4)",
      }}
    >
      <Card>
        <strong>Default Card</strong>
        <p>Reusable content container.</p>
      </Card>

      <Card
        variant="outlined"
        elevated
      >
        <strong>Outlined Card</strong>
        <p>Outlined and elevated.</p>
      </Card>
    </div>
  );
}
