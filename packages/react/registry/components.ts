import type { AUIRegistryEntry } from "./types";

export const componentRegistry = [
  {
    name: "Button",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Input",
    layer: "component",
    category: "forms",
    status: "stable",
  },
] as const satisfies readonly AUIRegistryEntry<"component">[];
