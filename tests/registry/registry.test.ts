import { describe, expect, it } from "vitest";

import {
  componentRegistry,
  patternRegistry,
  templateRegistry,
} from "../../packages/react/registry";

describe("Registry", () => {
  it("contains the registered components", () => {
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
    ]);
  });

  it("contains only component entries", () => {
    for (const entry of componentRegistry) {
      expect(entry.layer).toBe("component");
    }
  });

  it("does not contain patterns before they exist", () => {
    expect(patternRegistry).toHaveLength(0);
  });

  it("does not contain templates before they exist", () => {
    expect(templateRegistry).toHaveLength(0);
  });

  it("does not contain duplicate component names", () => {
    const names = componentRegistry.map((entry) => entry.name);

    expect(new Set(names).size).toBe(names.length);
  });
});
