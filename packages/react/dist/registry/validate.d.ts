import type { AUIAnyRegistryEntry } from "./types";
declare function validateRegistryEntry(entry: AUIAnyRegistryEntry): void;
declare function validateRegistry(entries: readonly AUIAnyRegistryEntry[]): void;
export { validateRegistry, validateRegistryEntry };
