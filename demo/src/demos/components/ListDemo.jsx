import {
  List,
} from "@assemble-ui/react";

export function ListDemo() {
  return (
    <div className="demo-preview">
      <List divided>
        <List.Item>Dashboard</List.Item>
        <List.Item>Projects</List.Item>
        <List.Item>Settings</List.Item>
        <List.Item>Account</List.Item>
      </List>

      <List
        ordered
        marker="decimal"
      >
        <List.Item>Create a project</List.Item>
        <List.Item>Configure settings</List.Item>
        <List.Item>Invite team members</List.Item>
      </List>

      <List
        marker="disc"
        density="compact"
      >
        <List.Item>React</List.Item>
        <List.Item>TypeScript</List.Item>
        <List.Item>Sass</List.Item>
      </List>
    </div>
  );
}
