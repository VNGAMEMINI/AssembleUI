import {
  Container,
} from "@assemble-ui/react";

export function ContainerDemo() {
  return (
    <div className="demo-preview">
      <Container size="sm">
        <div className="demo-box">
          Container Small
        </div>
      </Container>

      <Container size="md">
        <div className="demo-box">
          Container Medium
        </div>
      </Container>

      <Container size="lg">
        <div className="demo-box">
          Container Large
        </div>
      </Container>
    </div>
  );
}
