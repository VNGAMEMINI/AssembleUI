import type {
  AUIAnyRegistryEntry,
  AUIComponentCategory,
  AUIRegistryEntry,
  AUIRegistryLayer,
  AUIRegistryStatus,
  AUIPatternCategory,
  AUITemplateCategory,
} from "./types";

const componentCategories: readonly AUIComponentCategory[] = [
  "data",
  "feedback",
  "forms",
  "layout",
  "navigation",
];

const patternCategories: readonly AUIPatternCategory[] = [
  "data",
  "feedback",
  "forms",
  "navigation",
];

const templateCategories: readonly AUITemplateCategory[] = [
  "application",
  "authentication",
  "content",
];

const statuses: readonly AUIRegistryStatus[] = [
  "experimental",
  "stable",
  "deprecated",
];

function isValidLayer(value: unknown): value is AUIRegistryLayer {
  return value === "component" || value === "pattern" || value === "template";
}

function isValidStatus(value: unknown): value is AUIRegistryStatus {
  return statuses.includes(value as AUIRegistryStatus);
}

function isValidCategory(layer: AUIRegistryLayer, category: unknown): boolean {
  switch (layer) {
    case "component":
      return componentCategories.includes(category as AUIComponentCategory);

    case "pattern":
      return patternCategories.includes(category as AUIPatternCategory);

    case "template":
      return templateCategories.includes(category as AUITemplateCategory);
  }
}

function validateRegistryEntry(entry: AUIAnyRegistryEntry): void {
  if (!entry.name.trim()) {
    throw new Error("Registry entry name cannot be empty");
  }

  if (!isValidLayer(entry.layer)) {
    throw new Error(`Invalid registry layer: ${String(entry.layer)}`);
  }

  if (!isValidCategory(entry.layer, entry.category)) {
    throw new Error(
      `Invalid registry category "${String(entry.category)}" for layer "${entry.layer}"`,
    );
  }

  if (!isValidStatus(entry.status)) {
    throw new Error(`Invalid registry status: ${String(entry.status)}`);
  }
}

function validateRegistry(entries: readonly AUIAnyRegistryEntry[]): void {
  const names = new Set<string>();

  for (const entry of entries) {
    validateRegistryEntry(entry);
    const name = entry.name.trim();

    if (names.has(name)) {
      throw new Error(`Duplicate registry entry name: ${name}`);
    }

    names.add(name);
  }
}

export { validateRegistry, validateRegistryEntry };
