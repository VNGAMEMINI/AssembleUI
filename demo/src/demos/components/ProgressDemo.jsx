import { Progress } from "@assemble-ui/react";

export function ProgressDemo() {
  return (
    <div className="demo-preview">
      <Progress
        value={25}
        max={100}
        size="sm"
        variant="primary"
      />

      <Progress
        value={50}
        max={100}
        size="md"
        variant="success"
      />

      <Progress
        value={75}
        max={100}
        size="lg"
        variant="warning"
      />

      <Progress
        value={90}
        max={100}
        size="md"
        variant="danger"
      />
    </div>
  );
}
