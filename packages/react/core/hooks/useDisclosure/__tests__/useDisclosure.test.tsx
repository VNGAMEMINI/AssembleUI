import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDisclosure } from "../useDisclosure";

describe("useDisclosure", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it("supports defaultIsOpen", () => {
    const { result } = renderHook(() =>
      useDisclosure({
        defaultIsOpen: true,
      }),
    );

    expect(result.current.isOpen).toBe(true);
  });

  it("opens and closes uncontrolled state", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("toggles uncontrolled state", () => {
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

  it("supports controlled state", () => {
    const { result, rerender } = renderHook(
      ({ open }) =>
        useDisclosure({
          open,
        }),
      {
        initialProps: {
          open: false,
        },
      },
    );

    expect(result.current.isOpen).toBe(false);

    rerender({
      open: true,
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("does not mutate controlled state internally", () => {
    const { result } = renderHook(() =>
      useDisclosure({
        open: false,
      }),
    );

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    const { result } = renderHook(() =>
      useDisclosure({
        onOpenChange,
      }),
    );

    act(() => {
      result.current.onOpen();
    });

    expect(onOpenChange).toHaveBeenCalledWith(true);

    act(() => {
      result.current.onClose();
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
