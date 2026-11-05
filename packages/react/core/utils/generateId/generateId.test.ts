import { beforeEach, describe, expect, it } from "vitest";
import { generateId, resetGenerateId } from "./generateId";

describe("generateId", () => {
  beforeEach(() => {
    resetGenerateId();
  });

  it("generates an ID with the default prefix", () => {
    expect(generateId()).toBe("aui-1");
  });

  it("supports custom prefixes", () => {
    expect(generateId("field")).toBe("field-1");
    expect(generateId("field")).toBe("field-2");
  });

  it("generates sequential IDs", () => {
    expect(generateId()).toBe("aui-1");
    expect(generateId()).toBe("aui-2");
    expect(generateId()).toBe("aui-3");
  });

  it("resets the ID counter", () => {
    generateId();
    generateId();

    resetGenerateId();

    expect(generateId()).toBe("aui-1");
  });
});
