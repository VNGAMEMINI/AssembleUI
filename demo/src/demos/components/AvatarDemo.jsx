import {
  Avatar,
} from "@vnallmini/react";

export function AvatarDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--aui-token-space-4)",
        flexWrap: "wrap",
      }}
    >
      <Avatar size="sm">S</Avatar>
      <Avatar size="md">A</Avatar>
      <Avatar size="lg">UI</Avatar>

      <Avatar
        size="lg"
        shape="square"
      >
        A
      </Avatar>
    </div>
  );
}
