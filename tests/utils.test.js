import { describe, expect, it } from "vitest";

import {
  classNames,
  generateId,
  mergeRefs
} from "../packages/react/core/utils/index.ts";

describe("core utilities", () => {
  it("joins truthy class names", () => {
    expect(classNames("button", false, "active", null)).toBe("button active");
  });

  it("merges callback and object refs", () => {
    const objectRef = { current: null };
    let callbackValue = null;

    mergeRefs(objectRef, (value) => {
      callbackValue = value;
    })("element");

    expect(objectRef.current).toBe("element");
    expect(callbackValue).toBe("element");
  });

  it("generates unique IDs with the supplied prefix", () => {
    const first = generateId("test");
    const second = generateId("test");

    expect(first).toMatch(/^test-\d+$/);
    expect(second).not.toBe(first);
  });
});
