import {
  Container,
} from "@assemble-ui/react";

export function ContainerDemo() {
  return (
    <div className="demo-preview">
      <Container size="md">
        <div className="demo-result">
          Container tự động được phát hiện.
        </div>
      </Container>
    </div>
  );
}
