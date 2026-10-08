import {
  Avatar,
} from "@assemble-ui/react";

export function AvatarDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--aui-space-4)",
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
