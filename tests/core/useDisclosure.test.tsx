import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDisclosure } from "../../packages/react/core/hooks/useDisclosure/useDisclosure";

describe("useDisclosure Hook", () => {
  it("returns initial state as false by default", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it("accepts defaultIsOpen prop", () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("opens disclosure with onOpen", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("closes disclosure with onClose", () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }));

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("toggles disclosure with onToggle", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
