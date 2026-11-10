import { Container } from "@vnallmini/react";

const sizes = ["sm", "md", "lg", "xl", "full"];

export function ContainerDemo() {
  return (
    <div className="demo-preview aui-container-demo" data-demo-full>
      {sizes.map((size) => (
        <Container key={size} size={size} className="aui-container--border">
          <p>Container: {size}</p>
        </Container>
      ))}
    </div>
  );
}
