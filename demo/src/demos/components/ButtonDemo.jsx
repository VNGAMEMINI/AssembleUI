import { Button } from "@assemble-ui/react";

export function ButtonDemo() {
  return (
    <div className="demo-preview">
      <div>
        <Button variant="primary" size="sm">
          Primary Small
        </Button>
        <Button variant="primary" size="md">
          Primary Medium
        </Button>
        <Button variant="primary" size="lg">
          Primary Large
        </Button>
      </div>

      <div>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}
