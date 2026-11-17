import { Table } from "@assemble-ui/react";

export function TableDemo() {
  return (
    <Table
      title="Project overview"
      density="comfortable"
      hoverable
    >
      <Table.Row>
        <Table.Head>Project</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Value</Table.Head>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Project Alpha</Table.Cell>
        <Table.Cell>Active</Table.Cell>
        <Table.Cell>$12,480</Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Project Beta</Table.Cell>
        <Table.Cell>Pending</Table.Cell>
        <Table.Cell>$8,240</Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Project Gamma</Table.Cell>
        <Table.Cell>Completed</Table.Cell>
        <Table.Cell>$19,620</Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell colSpan={2}>Total</Table.Cell>
        <Table.Cell>$40,340</Table.Cell>
      </Table.Row>
    </Table>
  );
}
