import type { AUIRegistryEntry, AUIPatternCategory } from "./types";

export const patternRegistry = [] as const satisfies readonly AUIRegistryEntry<
  "pattern",
  AUIPatternCategory
>[];
