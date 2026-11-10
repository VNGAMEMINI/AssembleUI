import { Status } from "@vnallmini/react";

export function StatusDemo() {
  return (
    <div className="demo-preview">
      <Status variant="default">Default</Status>
      <Status variant="success">Active</Status>
      <Status variant="warning">Pending</Status>
      <Status variant="danger">Failed</Status>
      <Status variant="info">Processing</Status>
    </div>
  );
}
