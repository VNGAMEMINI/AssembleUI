import { describe, expect, it } from "vitest";
import { createElement } from "react";

import {
  registryComponentNames,
  rootComponentNames,
  getRootComponent,
} from "../contracts/component-contract";

describe("Public API", () => {
  it("exports every registered component", () => {
    for (const name of registryComponentNames) {
      expect(
        getRootComponent(name),
        `${name} is missing from root API`,
      ).toBeDefined();
    }
  });

  it("exports the complete current component API", () => {
    for (const name of rootComponentNames) {
      expect(
        getRootComponent(name),
        `${name} is missing from root API`,
      ).toBeDefined();
    }
  });

  it("creates React elements from every registered component", () => {
    for (const name of registryComponentNames) {
      const component = getRootComponent(name);

      expect(
        component,
        `${name} is missing from root API`,
      ).toBeDefined();

      expect(createElement(component as never)).toBeDefined();
    }
  });
});
