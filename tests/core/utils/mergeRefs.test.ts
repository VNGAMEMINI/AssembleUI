import { describe, expect, it, vi } from "vitest";

import { mergeRefs } from "../../../packages/react/core/utils/mergeRefs/mergeRefs";

describe("mergeRefs", () => {
  it("assigns the instance to object refs", () => {
    const first = { current: null as HTMLDivElement | null };
    const second = { current: null as HTMLDivElement | null };
    const element = document.createElement("div");

    mergeRefs(first, second)(element);

    expect(first.current).toBe(element);
    expect(second.current).toBe(element);
  });

  it("calls callback refs with the instance and null", () => {
    const callback = vi.fn();
    const element = document.createElement("div");
    const assignRef = mergeRefs<HTMLDivElement>(callback);

    assignRef(element);
    assignRef(null);

    expect(callback).toHaveBeenNthCalledWith(1, element);
    expect(callback).toHaveBeenNthCalledWith(2, null);
  });

  it("supports mixing callback and object refs", () => {
    const callback = vi.fn();
    const objectRef = { current: null as HTMLDivElement | null };
    const element = document.createElement("div");

    mergeRefs<HTMLDivElement>(callback, objectRef)(element);

    expect(callback).toHaveBeenCalledWith(element);
    expect(objectRef.current).toBe(element);
  });

  it("supports an empty ref list", () => {
    expect(() => mergeRefs<HTMLDivElement>()(null)).not.toThrow();
  });
});