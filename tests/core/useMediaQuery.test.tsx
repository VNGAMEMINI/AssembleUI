import { describe, expect, it, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "../../packages/react/core/hooks/useMediaQuery/useMediaQuery";

describe("useMediaQuery Hook", () => {
  beforeEach(() => {
    // Reset matchMedia
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }) as any;
  });

  it("returns false initially for unmatching query", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));
    expect(result.current).toBe(false);
  });

  it("handles matching media query", () => {
    window.matchMedia = (query: string) =>
      ({
        matches: true,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }) as any;

    const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));
    expect(result.current).toBe(true);
  });
});
