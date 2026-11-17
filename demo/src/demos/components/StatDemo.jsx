import { Stat } from "@assemble-ui/react";

export function StatDemo() {
  return (
    <div className="demo-preview aui-stat-demo">
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value>$12,480</Stat.Value>
        <Stat.Description>This month</Stat.Description>
        <Stat.Change variant="positive">
          +12.5%
        </Stat.Change>
      </Stat>

      <Stat>
        <Stat.Label>Users</Stat.Label>
        <Stat.Value>1,284</Stat.Value>
        <Stat.Description>Active users</Stat.Description>
        <Stat.Change>
          No change
        </Stat.Change>
      </Stat>

      <Stat>
        <Stat.Label>Orders</Stat.Label>
        <Stat.Value>342</Stat.Value>
        <Stat.Description>This month</Stat.Description>
        <Stat.Change variant="negative">
          -4.2%
        </Stat.Change>
      </Stat>
    </div>
  );
}
