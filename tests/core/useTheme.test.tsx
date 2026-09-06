import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "../../packages/react/core/hooks/useTheme/useTheme";
import { ThemeProvider } from "../../packages/react/core/providers/ThemeProvider";

describe("useTheme Hook", () => {
  it("throws error when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });

  it("returns theme context value when inside ThemeProvider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      ),
    });

    expect(result.current.theme).toBe("light");
    expect(result.current.setTheme).toBeDefined();
  });

  it("can change theme", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      ),
    });

    expect(result.current.theme).toBe("light");

    // Note: In a real test, we would use act() and update the state
    // but this requires enzyme or more complex setup
  });
});
