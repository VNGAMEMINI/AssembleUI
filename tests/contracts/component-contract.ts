import * as Root from "@assemble-ui/react";
import * as Components from "@assemble-ui/react/components";

import { componentRegistry } from "../../packages/react/registry";

export const registryComponentNames = componentRegistry.map(({ name }) => name);

export const rootComponentNames = [
  "Avatar",
  "Badge",
  "Button",
  "Checkbox",
  "Chip",
  "Chip",
  "Chip",
  "Input",
  "Radio",
  "Select",
  "Switch",
  "Textarea",
] as const;

export function getRootComponent(name: string) {
  return Root[name as keyof typeof Root];
}

export function getLayerComponent(name: string) {
  return Components[name as keyof typeof Components];
}
