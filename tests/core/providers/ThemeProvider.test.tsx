import { StrictMode, act, createElement, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { useTheme } from "../../../packages/react/core/hooks";
import { ThemeProvider } from "../../../packages/react/core/providers/ThemeProvider";

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

  it("supports local scope without changing the document theme", () => {
    document.documentElement.setAttribute("data-aui-theme", "light");

    const { container, root } = render(
      createElement(
        ThemeProvider,
        { defaultTheme: "dark", scope: "local" },
        createElement("span"),
      ),
    );

    expect(document.documentElement.dataset.auiTheme).toBe("light");
    expect(container.firstElementChild?.getAttribute("data-aui-theme")).toBe(
      "dark",
    );
    expect(container.innerHTML).toContain("<span></span>");

    act(() => root.unmount());
    expect(document.documentElement.dataset.auiTheme).toBe("light");
  });

  it("updates only the local theme wrapper", () => {
    document.documentElement.setAttribute("data-aui-theme", "light");

    let updateTheme:
      | ((theme: "light" | "dark" | "custom") => void)
      | undefined;

    function Consumer() {
      const { setTheme } = useTheme();
      updateTheme = setTheme;
      return null;
    }

    const { container, root } = render(
      createElement(
        ThemeProvider,
        { defaultTheme: "dark", scope: "local" },
        createElement(Consumer),
      ),
    );

    act(() => updateTheme?.("custom"));

    expect(container.firstElementChild?.getAttribute("data-aui-theme")).toBe(
      "custom",
    );
    expect(document.documentElement.dataset.auiTheme).toBe("light");

    act(() => root.unmount());
  });

  it("supports nested local themes without changing the document theme", () => {
    document.documentElement.setAttribute("data-aui-theme", "light");

    const { container, root } = render(
      createElement(
        ThemeProvider,
        { defaultTheme: "dark", scope: "local" },
        createElement(
          ThemeProvider,
          { defaultTheme: "custom", scope: "local" },
          createElement("span"),
        ),
      ),
    );

    const outer = container.firstElementChild;
    const inner = outer?.firstElementChild;

    expect(outer?.getAttribute("data-aui-theme")).toBe("dark");
    expect(inner?.getAttribute("data-aui-theme")).toBe("custom");
    expect(document.documentElement.dataset.auiTheme).toBe("light");

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

  it("restores the previous theme attribute when unmounted", () => {
    document.documentElement.setAttribute("data-aui-theme", "custom");

    const { root } = render(
      createElement(ThemeProvider, { defaultTheme: "dark" }),
    );

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "dark",
    );

    act(() => root.unmount());

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "custom",
    );
  });

  it("restores the original theme after multiple theme changes", () => {
    document.documentElement.setAttribute("data-aui-theme", "custom");

    let updateTheme:
      | ((theme: "light" | "dark" | "custom") => void)
      | undefined;

    function Consumer() {
      const { setTheme } = useTheme();
      updateTheme = setTheme;
      return null;
    }

    const { root } = render(
      createElement(
        ThemeProvider,
        { defaultTheme: "light" },
        createElement(Consumer),
      ),
    );

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "light",
    );

    act(() => updateTheme?.("dark"));
    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "dark",
    );

    act(() => updateTheme?.("light"));
    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "light",
    );

    act(() => root.unmount());

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "custom",
    );
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

  it("restores the active theme when one of multiple React roots unmounts", () => {
    const first = render(
      createElement(ThemeProvider, { defaultTheme: "dark" }),
    );
    const second = render(
      createElement(ThemeProvider, { defaultTheme: "light" }),
    );

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe("light");

    act(() => second.root.unmount());

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe("dark");

    act(() => first.root.unmount());
  });

  it("restores the original theme when mounted inside StrictMode", () => {
    document.documentElement.setAttribute("data-aui-theme", "custom");

    const { root } = render(
      createElement(
        StrictMode,
        null,
        createElement(ThemeProvider, { defaultTheme: "dark" }),
      ),
    );

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe("dark");

    act(() => root.unmount());

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe("custom");
  });

  it("preserves the outer theme when a nested provider unmounts", () => {
    function NestedTheme({ showNested }: { showNested: boolean }) {
      return createElement(
        ThemeProvider,
        { defaultTheme: "dark" },
        showNested
          ? createElement(
              ThemeProvider,
              { defaultTheme: "custom" },
              createElement("span"),
            )
          : createElement("span"),
      );
    }

    const { root } = render(
      createElement(NestedTheme, { showNested: true }),
    );

    act(() => {
      root.render(createElement(NestedTheme, { showNested: false }));
    });

    expect(document.documentElement.getAttribute("data-aui-theme")).toBe(
      "dark",
    );

    act(() => root.unmount());
  });

});
