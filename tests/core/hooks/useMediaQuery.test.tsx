import { renderHook, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "../../../packages/react/core/hooks/useMediaQuery/useMediaQuery";

const originalMatchMedia = window.matchMedia;

function setMatchMedia(value: typeof window.matchMedia | undefined) {
  if (value) {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value,
    });
    return;
  }

  Reflect.deleteProperty(window, "matchMedia");
}

function createMediaQueryList(matches: boolean) {
  let listener: ((event: MediaQueryListEvent) => void) | undefined;

  const mediaQueryList = {
    matches,
    addEventListener: vi.fn((_type: string, callback: (event: MediaQueryListEvent) => void) => {
      listener = callback;
    }),
    removeEventListener: vi.fn((_type: string, callback: (event: MediaQueryListEvent) => void) => {
      if (listener === callback) listener = undefined;
    }),
  } as unknown as MediaQueryList;

  return {
    mediaQueryList,
    emit(nextMatches: boolean) {
      listener?.({ matches: nextMatches } as MediaQueryListEvent);
    },
  };
}

describe("useMediaQuery", () => {
  afterEach(() => {
    if (originalMatchMedia) {
      setMatchMedia(originalMatchMedia);
    } else {
      setMatchMedia(undefined);
    }
    vi.restoreAllMocks();
  });

  it("returns false when matchMedia is unavailable", () => {
    setMatchMedia(undefined);

    const { result } = renderHook(() => useMediaQuery("(min-width: 800px)"));

    expect(result.current).toBe(false);
  });

  it("returns the current match and listens for changes", () => {
    const media = createMediaQueryList(false);
    const matchMedia = vi.fn(() => media.mediaQueryList);
    setMatchMedia(matchMedia);

    const { result, unmount } = renderHook(() =>
      useMediaQuery("(min-width: 800px)"),
    );

    expect(matchMedia).toHaveBeenCalledWith("(min-width: 800px)");
    expect(result.current).toBe(false);

    act(() => media.emit(true));
    expect(result.current).toBe(true);

    unmount();
    expect(media.mediaQueryList.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("updates the listener when the query changes", () => {
    const firstMedia = createMediaQueryList(false);
    const secondMedia = createMediaQueryList(true);
    const matchMedia = vi.fn((query: string) =>
      query === "first" ? firstMedia.mediaQueryList : secondMedia.mediaQueryList,
    );
    setMatchMedia(matchMedia);

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: "first" } },
    );

    rerender({ query: "second" });

    expect(result.current).toBe(true);
    expect(firstMedia.mediaQueryList.removeEventListener).toHaveBeenCalled();
    expect(secondMedia.mediaQueryList.addEventListener).toHaveBeenCalled();
  });
});