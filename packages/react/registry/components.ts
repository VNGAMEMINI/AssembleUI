import type { AUIComponentCategory, AUIRegistryEntry } from "./types";

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
  {
    name: "Checkbox",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Radio",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Select",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Textarea",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Switch",
    layer: "component",
    category: "forms",
    status: "stable",
  },
  {
    name: "Badge",
    layer: "component",
    category: "data",
    status: "stable",
  },
  {
    name: "Avatar",
    layer: "component",
    category: "data",
    status: "stable",
  },
  {
    name: "Chip",
    layer: "component",
    category: "data",
    status: "stable",
  },
] as const satisfies readonly AUIRegistryEntry<
  "component",
  AUIComponentCategory
>[];
