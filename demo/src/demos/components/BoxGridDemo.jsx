import { BoxGrid, Card, Stat } from "@assemble-ui/react";

export function BoxGridDemo() {
  return (
    <div className="demo-preview" data-demo-full>
      <BoxGrid minWidth="220px" spacing="md">
        <Card>
          <strong>Getting Started</strong>
          <p>A simple content card inside a responsive grid.</p>
        </Card>

        <Card variant="outlined">
          <strong>Components</strong>
          <p>Organize reusable components into a flexible layout.</p>
        </Card>

        <Card elevated>
          <strong>Customization</strong>
          <p>Customize each item without changing the grid layout.</p>
        </Card>
      </BoxGrid>

      <BoxGrid columns={3} spacing="md">
        <Stat>
          <Stat.Label>Users</Stat.Label>
          <Stat.Value>2,480</Stat.Value>
          <Stat.Description>Total accounts</Stat.Description>
          <Stat.Change variant="positive">+12.5%</Stat.Change>
        </Stat>

        <Stat>
          <Stat.Label>Projects</Stat.Label>
          <Stat.Value>128</Stat.Value>
          <Stat.Description>Active projects</Stat.Description>
        </Stat>

        <Stat>
          <Stat.Label>Completion</Stat.Label>
          <Stat.Value>86%</Stat.Value>
          <Stat.Description>Completion rate</Stat.Description>
          <Stat.Change variant="neutral">No change</Stat.Change>
        </Stat>
      </BoxGrid>
    </div>
  );
}
