import { act, createElement, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { useTheme } from "../../hooks";
import { ThemeProvider } from "../ThemeProvider";

function render(children: ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  act(() => {
    root.render(children);
  });

  return {
    container,
    root,
  };
}

describe("ThemeProvider", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-aui-theme");
    document.body.innerHTML = "";
  });

  it("provides the default theme", () => {
    let receivedTheme: string | undefined;

    function Consumer() {
      const { theme } = useTheme();
      receivedTheme = theme;
      return null;
    }

    const { root } = render(
      createElement(ThemeProvider, null, createElement(Consumer)),
    );

    expect(receivedTheme).toBe("light");

    act(() => root.unmount());
  });

  it("supports a custom default theme", () => {
    let receivedTheme: string | undefined;

    function Consumer() {
      const { theme } = useTheme();
      receivedTheme = theme;
      return null;
    }

    const { root } = render(
      createElement(
        ThemeProvider,
        { defaultTheme: "dark" },
        createElement(Consumer),
      ),
    );

    expect(receivedTheme).toBe("dark");

    act(() => root.unmount());
  });

  it("updates the theme through context and DOM", () => {
    let updateTheme:
      | ((theme: "light" | "dark" | "custom") => void)
      | undefined;

    function Consumer() {
      const { setTheme } = useTheme();
      updateTheme = setTheme;
      return null;
    }

    const { root } = render(
      createElement(ThemeProvider, null, createElement(Consumer)),
    );

    expect(document.documentElement.dataset.auiTheme).toBe("light");

    act(() => {
      updateTheme?.("dark");
    });

    expect(document.documentElement.dataset.auiTheme).toBe("dark");

    act(() => root.unmount());
  });

  it("applies the default theme to the document root", () => {
    const { root } = render(
      createElement(ThemeProvider, { defaultTheme: "dark" }),
    );

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "dark",
    );

    act(() => root.unmount());
  });

  it("does not add a wrapper element", () => {
    const { container, root } = render(
      createElement(ThemeProvider, null, createElement("span")),
    );

    expect(container.innerHTML).toBe("<span></span>");

    act(() => root.unmount());
  });

  it("removes the theme attribute when unmounted", () => {
    const { root } = render(
      createElement(ThemeProvider, { defaultTheme: "dark" }),
    );

    expect(document.documentElement.dataset.auiTheme).toBe("dark");

    act(() => root.unmount());

    expect(document.documentElement.hasAttribute("data-aui-theme")).toBe(false);
  });
});
