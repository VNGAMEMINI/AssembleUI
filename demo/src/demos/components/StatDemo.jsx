import {
  Stat,
} from "@assemble-ui/react";

export function StatDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(3, minmax(0, 1fr))",
        gap: "var(--aui-space-6)",
        width: "100%",
      }}
    >
      <Stat
        label="Revenue"
        value="$12,480"
        description="This month"
        trend="positive"
      />

      <Stat
        label="Users"
        value="1,284"
        description="Active users"
        trend="neutral"
      />

      <Stat
        label="Orders"
        value="342"
        description="This month"
        trend="negative"
      />
    </div>
  );
}
