import {
  Badge,
} from "@vnallmini/react";

export function BadgeDemo() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--aui-token-space-3)",
        flexWrap: "wrap",
      }}
    >
      <Badge>Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}
