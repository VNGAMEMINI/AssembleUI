import type { AUIRegistryEntry, AUIPatternCategory } from "./types";

export const patternRegistry = [
  {
    name: "FormField",
    layer: "pattern",
    category: "forms",
    status: "stable",
  },
  {
    name: "UserCard",
    layer: "pattern",
    category: "data",
    status: "stable",
  },
] as const satisfies readonly AUIRegistryEntry<
  "pattern",
  AUIPatternCategory
>[];
