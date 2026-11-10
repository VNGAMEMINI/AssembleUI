import type { PropsWithChildren } from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../providers";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });

  it("reads the theme from ThemeProvider", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider scope="local" defaultTheme="dark">
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");
  });

  it("exposes setTheme", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider scope="local" defaultTheme="light">
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => result.current.setTheme("dark"));

    expect(result.current.theme).toBe("dark");
  });
});
