import {
  Table,
} from "@assemble-ui/react";

export function TableDemo() {
  return (
    <Table
      variant="striped"
      bordered
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Project Alpha</td>
          <td>Active</td>
          <td>$12,480</td>
        </tr>

        <tr>
          <td>Project Beta</td>
          <td>Pending</td>
          <td>$8,240</td>
        </tr>

        <tr>
          <td>Project Gamma</td>
          <td>Completed</td>
          <td>$19,620</td>
        </tr>
      </tbody>
    </Table>
  );
}
