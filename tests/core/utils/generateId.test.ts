import { afterEach, describe, expect, it } from "vitest";

import {
  generateId,
  resetGenerateId,
} from "../../../packages/react/core/utils/generateId/generateId";

describe("generateId", () => {
  afterEach(() => resetGenerateId());

  it("generates sequential ids with the default prefix", () => {
    expect(generateId()).toBe("aui-1");
    expect(generateId()).toBe("aui-2");
  });

  it("uses a custom prefix while keeping ids unique", () => {
    expect(generateId("field")).toBe("field-1");
    expect(generateId("field")).toBe("field-2");
  });

  it("resets the sequence", () => {
    generateId();
    resetGenerateId();

    expect(generateId("item")).toBe("item-1");
  });
});