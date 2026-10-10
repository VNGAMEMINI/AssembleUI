import { Button, Heading, Text } from "@assemble-ui/react";
import "@assemble-ui/react/styles";

export default function App() {
  return (
    <main>
      <Heading>AssembleUI Buyer Test</Heading>
      <Text>Testing the published package.</Text>
      <Button onClick={() => alert("Button works!")}>
        Test Button
      </Button>
    </main>
  );
}
