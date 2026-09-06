import { describe, expect, it, beforeEach } from "vitest";
import { classNames } from "../../packages/react/core/utils/classNames/classNames";
import { mergeRefs } from "../../packages/react/core/utils/mergeRefs/mergeRefs";
import {
  generateId,
  resetGenerateId,
} from "../../packages/react/core/utils/generateId/generateId";

describe("classNames utility", () => {
  it("joins truthy class names", () => {
    expect(classNames("button", false, "active", null)).toBe("button active");
  });

  it("filters out falsy values", () => {
    expect(classNames("a", 0, "b", "", "c", undefined, "d", null)).toBe(
      "a b c d",
    );
  });

  it("handles empty input", () => {
    expect(classNames()).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(classNames("class", 1, "name", 2)).toBe("class 1 name 2");
  });

  it("flattens nested arrays", () => {
    expect(classNames(["a", "b"], ["c", "d"])).toBe("a b c d");
  });

  it("combines complex nested structures", () => {
    expect(classNames("base", ["variant", false, "active"], null)).toBe(
      "base variant active",
    );
  });
});

describe("mergeRefs utility", () => {
  it("merges object refs", () => {
    const ref1 = { current: null };
    const ref2 = { current: null };

    mergeRefs(ref1, ref2)("element");

    expect(ref1.current).toBe("element");
    expect(ref2.current).toBe("element");
  });

  it("merges callback refs", () => {
    let value1 = null;
    let value2 = null;

    mergeRefs(
      (v) => {
        value1 = v;
      },
      (v) => {
        value2 = v;
      },
    )("element");

    expect(value1).toBe("element");
    expect(value2).toBe("element");
  });

  it("merges mixed ref types", () => {
    const objectRef = { current: null };
    let callbackValue = null;

    mergeRefs(objectRef, (value) => {
      callbackValue = value;
    })("element");

    expect(objectRef.current).toBe("element");
    expect(callbackValue).toBe("element");
  });

  it("handles null refs", () => {
    expect(() => {
      mergeRefs(null, null)(null);
    }).not.toThrow();
  });
});

describe("generateId utility", () => {
  beforeEach(() => {
    resetGenerateId();
  });

  it("generates unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("generates IDs with prefix", () => {
    const id = generateId("button");
    expect(id).toMatch(/^button-\d+$/);
  });

  it("generates IDs with default prefix", () => {
    const id = generateId();
    expect(id).toMatch(/^aui-\d+$/);
  });

  it("increments ID counter", () => {
    const id1 = generateId("test");
    const id2 = generateId("test");
    const num1 = parseInt(id1.split("-")[1]);
    const num2 = parseInt(id2.split("-")[1]);
    expect(num2).toBeGreaterThan(num1);
  });

  it("resets ID counter", () => {
    generateId();
    generateId();
    resetGenerateId();
    const id = generateId();
    expect(id).toMatch(/^aui-1$/);
  });
});
