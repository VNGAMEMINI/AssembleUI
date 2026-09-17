import { describe, expect, it } from "vitest";

import * as Root from "@assemble-ui/react";
import * as Components from "@assemble-ui/react/components";

import {
  componentRegistry,
  patternRegistry,
  templateRegistry,
} from "../../packages/react/registry";

import {
  rootComponentNames,
  getRootComponent,
  getLayerComponent,
} from "../contracts/component-contract";

describe("Registry", () => {
  it("contains all current components", () => {
    expect(componentRegistry).toEqual([
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
    ]);
  });

  it("contains only component entries", () => {
    for (const entry of componentRegistry) {
      expect(entry.layer).toBe("component");
    }
  });

  it("contains all current patterns", () => {
    expect(patternRegistry).toEqual([
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
    ]);
  });

  it("does not contain templates before they exist", () => {
    expect(templateRegistry).toHaveLength(0);
  });

  it("does not contain duplicate component names", () => {
    const names = componentRegistry.map((entry) => entry.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("has every component available in the root API", () => {
    for (const entry of componentRegistry) {
      expect(
        Root[entry.name as keyof typeof Root],
        `${entry.name} is missing from root API`,
      ).toBeDefined();
    }
  });

  it("has every component available in the Components API", () => {
    for (const entry of componentRegistry) {
      expect(
        Components[entry.name as keyof typeof Components],
        `${entry.name} is missing from Components API`,
      ).toBeDefined();
    }
  });

  it("contains every current public component", () => {
    const registryNames = new Set(componentRegistry.map((entry) => entry.name));

    for (const name of rootComponentNames) {
      expect(
        registryNames.has(name),
        `${name} is missing from component registry`,
      ).toBe(true);
    }
  });

  it("maps Registry components to the same root and layer implementation", () => {
    for (const entry of componentRegistry) {
      const rootComponent = Root[entry.name as keyof typeof Root];

      const layerComponent = Components[entry.name as keyof typeof Components];

      expect(
        layerComponent,
        `${entry.name} has different root/layer implementations`,
      ).toBe(rootComponent);
    }
  });
});
