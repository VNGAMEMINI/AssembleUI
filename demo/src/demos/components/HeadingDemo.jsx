import { Heading } from "@assemble-ui/react";

export function HeadingDemo() {
  return (
    <div className="demo-preview">
      <Heading level={1}>
        Heading level 1
      </Heading>

      <Heading level={2} size="lg">
        Heading level 2
      </Heading>

      <Heading level={3} size="md">
        Heading level 3
      </Heading>

      <Heading level={4} size="sm">
        Heading level 4
      </Heading>
    </div>
  );
}
