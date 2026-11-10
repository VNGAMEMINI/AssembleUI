import { describe, expect, it } from "vitest";

import { classNames } from "../../../packages/react/core/utils/classNames/classNames";

describe("classNames", () => {
  it("joins strings and numbers", () => {
    expect(classNames("button", 2, "active")).toBe("button 2 active");
  });

  it("flattens nested arrays", () => {
    expect(classNames(["button", ["active", ["large"]]])).toBe(
      "button active large",
    );
  });

  it("ignores booleans and nullish values", () => {
    expect(classNames("button", false, null, undefined, true, "active")).toBe(
      "button active",
    );
  });

  it("returns an empty string when no class values are provided", () => {
    expect(classNames()).toBe("");
  });
});