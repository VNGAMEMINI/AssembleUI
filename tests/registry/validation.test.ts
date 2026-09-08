import { describe, expect, it } from "vitest";

import {
  validateRegistry,
  validateRegistryEntry,
} from "../../packages/react/registry";

describe("Registry validation", () => {
  it("accepts a valid component entry", () => {
    expect(() =>
      validateRegistryEntry({
        name: "Button",
        layer: "component",
        category: "forms",
        status: "stable",
      }),
    ).not.toThrow();
  });

  it("rejects an empty name", () => {
    expect(() =>
      validateRegistryEntry({
        name: "",
        layer: "component",
        category: "forms",
        status: "stable",
      }),
    ).toThrow();
  });

  it("rejects an invalid category", () => {
    expect(() =>
      validateRegistryEntry({
        name: "Button",
        layer: "component",
        category: "authentication",
        status: "stable",
      } as never),
    ).toThrow();
  });

  it("rejects an invalid status", () => {
    expect(() =>
      validateRegistryEntry({
        name: "Button",
        layer: "component",
        category: "forms",
        status: "invalid",
      } as never),
    ).toThrow();
  });

  it("rejects duplicate names", () => {
    expect(() =>
      validateRegistry([
        {
          name: "Button",
          layer: "component",
          category: "forms",
          status: "stable",
        },
        {
          name: "Button",
          layer: "component",
          category: "forms",
          status: "stable",
        },
      ]),
    ).toThrow("Duplicate registry entry name");
  });

  it("accepts an empty registry", () => {
    expect(() => validateRegistry([])).not.toThrow();
  });
});

it("rejects duplicate names across different layers", () => {
  expect(() =>
    validateRegistry([
      {
        name: "Account",
        layer: "component",
        category: "forms",
        status: "stable",
      },
      {
        name: "Account",
        layer: "pattern",
        category: "forms",
        status: "stable",
      },
    ]),
  ).toThrow("Duplicate registry entry name");
});

it("treats names as case-sensitive", () => {
  expect(() =>
    validateRegistry([
      {
        name: "Button",
        layer: "component",
        category: "forms",
        status: "stable",
      },
      {
        name: "button",
        layer: "component",
        category: "forms",
        status: "stable",
      },
    ]),
  ).not.toThrow();
});

it("rejects names that differ only by surrounding whitespace", () => {
  expect(() =>
    validateRegistry([
      {
        name: "Button",
        layer: "component",
        category: "forms",
        status: "stable",
      },
      {
        name: " Button ",
        layer: "component",
        category: "forms",
        status: "stable",
      },
    ]),
  ).toThrow("Duplicate registry entry name");
});
