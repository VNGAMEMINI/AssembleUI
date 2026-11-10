import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  if (originalMatchMedia) {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  } else {
    Reflect.deleteProperty(window, "matchMedia");
  }
  vi.restoreAllMocks();
});

describe("useMediaQuery", () => {
  it("returns false when matchMedia is unavailable", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);
  });

  it("reads the initial media query result", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("updates when the media query changes", () => {
    let listener: ((event: MediaQueryListEvent) => void) | undefined;

    const addEventListener = vi.fn(
      (_type: string, callback: (event: MediaQueryListEvent) => void) => {
        listener = callback;
      },
    );
    const removeEventListener = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener,
        removeEventListener,
      })),
    });

    const { result, unmount } = renderHook(() =>
      useMediaQuery("(min-width: 768px)"),
    );

    expect(result.current).toBe(false);

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
