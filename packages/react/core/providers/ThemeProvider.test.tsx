import { useState, type PropsWithChildren } from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "../hooks/useTheme/useTheme";

const themeAttribute = "data-aui-theme";

beforeEach(() => {
  document.documentElement.removeAttribute(themeAttribute);
});

afterEach(() => {
  document.documentElement.removeAttribute(themeAttribute);
});

describe("ThemeProvider", () => {
  it("applies the global theme to document.documentElement", () => {
    document.documentElement.setAttribute(themeAttribute, "custom");

    const { unmount } = render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("dark");

    unmount();

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("custom");
  });

  it("updates the global theme when setTheme is called", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider defaultTheme="light">
        {children}
      </ThemeProvider>
    );

    const { result, unmount } = renderHook(() => useTheme(), { wrapper });

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("light");

    act(() => result.current.setTheme("dark"));

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("dark");

    unmount();
  });

  it("does not modify the document theme in local scope", () => {
    document.documentElement.setAttribute(themeAttribute, "custom");

    const { container, unmount } = render(
      <ThemeProvider scope="local" defaultTheme="dark">
        <div>Local content</div>
      </ThemeProvider>,
    );

    expect(
      container.querySelector(`[${themeAttribute}="dark"]`),
    ).not.toBeNull();

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("custom");

    unmount();
  });

  it("gives a nested global provider precedence over its parent", () => {
    function NestedThemeHarness() {
      const [showChild, setShowChild] = useState(true);

      return (
        <ThemeProvider defaultTheme="dark">
          <button onClick={() => setShowChild(false)}>
            Unmount nested theme
          </button>

          {showChild && (
            <ThemeProvider defaultTheme="light">
              <div>Nested content</div>
            </ThemeProvider>
          )}
        </ThemeProvider>
      );
    }

    const { unmount } = render(<NestedThemeHarness />);

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("light");

    fireEvent.click(
      screen.getByRole("button", { name: "Unmount nested theme" }),
    );

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("dark");

    unmount();
  });

  it("removes the global theme attribute when no original value existed", () => {
    const { unmount } = render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.getAttribute(themeAttribute),
    ).toBe("dark");

    unmount();

    expect(
      document.documentElement.hasAttribute(themeAttribute),
    ).toBe(false);
  });
});
