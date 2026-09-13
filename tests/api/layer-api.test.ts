import { describe, expect, it } from "vitest";

import {
  registryComponentNames,
  rootComponentNames,
  getRootComponent,
  getLayerComponent,
} from "../contracts/component-contract";

describe("Components Layer API", () => {
  it("exports every registered component", () => {
    for (const name of registryComponentNames) {
      expect(
        getLayerComponent(name),
        `${name} is missing from components API`,
      ).toBeDefined();
    }
  });

  it("exports the complete current component API", () => {
    for (const name of rootComponentNames) {
      expect(
        getLayerComponent(name),
        `${name} is missing from components API`,
      ).toBeDefined();
    }
  });

  it("uses the same implementation as the root API", () => {
    for (const name of rootComponentNames) {
      expect(
        getLayerComponent(name),
        `${name} has different root/layer implementations`,
      ).toBe(getRootComponent(name));
    }
  });
});
