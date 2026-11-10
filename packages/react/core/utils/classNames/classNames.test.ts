import { describe, expect, it } from "vitest";
import { classNames } from "./classNames";

describe("classNames", () => {
  it("joins string values", () => {
    expect(classNames("button", "primary")).toBe("button primary");
  });

  it("supports numeric values", () => {
    expect(classNames("grid", 2, 4)).toBe("grid 2 4");
  });

  it("ignores boolean and nullish values", () => {
    expect(
      classNames("button", false, null, undefined, true),
    ).toBe("button");
  });

  it("flattens nested arrays", () => {
    expect(
      classNames("button", ["primary", ["large", false]], "active"),
    ).toBe("button primary large active");
  });

  it("returns an empty string without values", () => {
    expect(classNames()).toBe("");
  });
});
