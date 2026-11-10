import { describe, expect, it, vi } from "vitest";
import type { Ref } from "react";
import { mergeRefs } from "./mergeRefs";

describe("mergeRefs", () => {
  it("assigns an element to an object ref", () => {
    const ref: Ref<HTMLDivElement> = { current: null };
    const element = document.createElement("div");

    mergeRefs(ref)(element);

    expect(ref).toEqual({ current: element });
  });

  it("calls callback refs", () => {
    const callback = vi.fn();
    const element = document.createElement("div");

    mergeRefs<HTMLDivElement>(callback)(element);

    expect(callback).toHaveBeenCalledWith(element);
  });

  it("updates multiple refs", () => {
    const objectRef: Ref<HTMLDivElement> = { current: null };
    const callback = vi.fn();
    const element = document.createElement("div");

    mergeRefs<HTMLDivElement>(objectRef, callback)(element);

    expect(objectRef).toEqual({ current: element });
    expect(callback).toHaveBeenCalledWith(element);
  });

  it("supports null instances", () => {
    const ref: Ref<HTMLDivElement> = {
      current: document.createElement("div"),
    };

    mergeRefs(ref)(null);

    expect(ref).toEqual({ current: null });
  });

  it("supports an empty list of refs", () => {
    expect(() => mergeRefs<HTMLDivElement>()(null)).not.toThrow();
  });
});
