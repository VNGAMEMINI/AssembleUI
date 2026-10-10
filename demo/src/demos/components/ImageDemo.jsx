import {
  Image,
} from "@assemble-ui/react";

const image =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23e5e7eb'/%3E%3Ctext x='320' y='190' text-anchor='middle' font-family='sans-serif' font-size='32' fill='%236b7280'%3EAssembleUI Image%3C/text%3E%3C/svg%3E";

export function ImageDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(2, minmax(0, 1fr))",
        gap: "var(--aui-space-4)",
      }}
    >
      <Image
        src={image}
        alt="AssembleUI example"
        fit="cover"
        radius="lg"
      />

      <Image
        src={image}
        alt="AssembleUI example"
        fit="contain"
        radius="md"
      />
    </div>
  );
}
