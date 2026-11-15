import { describe, expect, it, vi } from "vitest";
import type { Ref, RefCallback } from "react";
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
    const callback = vi.fn();

    mergeRefs<HTMLDivElement>(ref, callback)(null);

    expect(ref).toEqual({ current: null });
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("supports an empty list of refs", () => {
    expect(() => mergeRefs<HTMLDivElement>()(null)).not.toThrow();
  });

  it("calls callback cleanup when the merged ref detaches", () => {
    const element = document.createElement("div");
    const cleanup = vi.fn();
    const callback: RefCallback<HTMLDivElement> = vi.fn(
      () => cleanup,
    );

    const detach = mergeRefs(callback)(element);

    expect(callback).toHaveBeenCalledWith(element);
    expect(cleanup).not.toHaveBeenCalled();

    detach?.();

    expect(cleanup).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledOnce();
  });

  it("calls callback with null when it does not return cleanup", () => {
    const element = document.createElement("div");
    const callback = vi.fn();

    const detach = mergeRefs<HTMLDivElement>(callback)(element);

    detach?.();

    expect(callback).toHaveBeenNthCalledWith(1, element);
    expect(callback).toHaveBeenNthCalledWith(2, null);
  });

  it("cleans up multiple callback refs independently", () => {
    const element = document.createElement("div");
    const cleanup = vi.fn();

    const callbackWithCleanup: RefCallback<HTMLDivElement> = vi.fn(
      () => cleanup,
    );
    const callbackWithoutCleanup = vi.fn();

    const detach = mergeRefs(
      callbackWithCleanup,
      callbackWithoutCleanup,
    )(element);

    detach?.();

    expect(cleanup).toHaveBeenCalledOnce();
    expect(callbackWithCleanup).toHaveBeenCalledOnce();
    expect(callbackWithoutCleanup).toHaveBeenNthCalledWith(1, element);
    expect(callbackWithoutCleanup).toHaveBeenNthCalledWith(2, null);
  });

  it("clears object refs when the merged ref detaches", () => {
    const element = document.createElement("div");
    const ref: Ref<HTMLDivElement> = { current: null };

    const detach = mergeRefs(ref)(element);

    expect(ref.current).toBe(element);

    detach?.();

    expect(ref.current).toBeNull();
  });

  it("cleans up object and callback refs together", () => {
    const element = document.createElement("div");
    const objectRef: Ref<HTMLDivElement> = { current: null };
    const callback = vi.fn();

    const detach = mergeRefs(objectRef, callback)(element);

    detach?.();

    expect(objectRef.current).toBeNull();
    expect(callback).toHaveBeenNthCalledWith(1, element);
    expect(callback).toHaveBeenNthCalledWith(2, null);
  });

  it("does not run cleanup more than once", () => {
    const element = document.createElement("div");
    const cleanup = vi.fn();
    const callback: RefCallback<HTMLDivElement> = vi.fn(
      () => cleanup,
    );

    const detach = mergeRefs(callback)(element);

    detach?.();
    detach?.();

    expect(cleanup).toHaveBeenCalledOnce();
  });

  it("supports null instances after an attached instance", () => {
    const element = document.createElement("div");
    const callback = vi.fn();

    const mergedRef = mergeRefs<HTMLDivElement>(callback);

    mergedRef(element);
    mergedRef(null);

    expect(callback).toHaveBeenNthCalledWith(1, element);
    expect(callback).toHaveBeenNthCalledWith(2, null);
  });
});
