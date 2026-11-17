import { Button } from "@assemble-ui/react";

export function ButtonDemo() {
  return (
    <div className="demo-preview">
      <section>
        <p>Color variants</p>

        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section>
        <p>Sizes</p>

        <div>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section>
        <p>States</p>

        <div>
          <Button>Enabled</Button>
          <Button disabled>Disabled</Button>
          <Button variant="success" disabled>
            Disabled success
          </Button>
        </div>
      </section>
    </div>
  );
}
