import type { AUIRegistryEntry, AUITemplateCategory } from "./types";

export const templateRegistry = [] as const satisfies readonly AUIRegistryEntry<
  "template",
  AUITemplateCategory
>[];
