import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it("opens and closes in uncontrolled mode", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.onOpen());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);
  });

  it("toggles the current state", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.onToggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onToggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("supports defaultIsOpen", () => {
    const { result } = renderHook(() =>
      useDisclosure({ defaultIsOpen: true }),
    );

    expect(result.current.isOpen).toBe(true);
  });

  it("notifies changes in controlled mode without changing internal state", () => {
    const onOpenChange = vi.fn();

    const { result } = renderHook(() =>
      useDisclosure({ open: false, onOpenChange }),
    );

    act(() => result.current.onOpen());

    expect(result.current.isOpen).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
