import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type PropsWithChildren,
} from "react";

import { ThemeContext } from "../contexts";
import type { Theme } from "../contexts";

export type ThemeScope = "global" | "local";

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
  scope?: ThemeScope;
}

interface ThemeEntry {
  id: string;
  theme: Theme;
  depth: number;
  order: number;
}

const ThemeDepthContext = createContext(0);

const entries = new Map<string, ThemeEntry>();
let originalTheme: string | null = null;
let hasOriginalTheme = false;
let nextOrder = 0;

function applyTheme() {
  const root = document.documentElement;

  const activeEntries = [...entries.values()].sort(
    (a, b) => a.depth - b.depth || a.order - b.order,
  );

  const activeTheme = activeEntries.at(-1);

  if (activeTheme) {
    root.setAttribute("data-aui-theme", activeTheme.theme);
    return;
  }

  if (hasOriginalTheme) {
    if (originalTheme === null) {
      root.removeAttribute("data-aui-theme");
    } else {
      root.setAttribute("data-aui-theme", originalTheme);
    }
  }

  originalTheme = null;
  hasOriginalTheme = false;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  scope = "global",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const parentDepth = useContext(ThemeDepthContext);
  const depth = parentDepth + 1;
  const id = useId();

  useEffect(() => {
    if (scope !== "global") {
      return;
    }

    if (entries.size === 0) {
      originalTheme = document.documentElement.getAttribute("data-aui-theme");
      hasOriginalTheme = true;
    }

    entries.set(id, {
      id,
      theme,
      depth,
      order: ++nextOrder,
    });

    applyTheme();

    return () => {
      entries.delete(id);
      applyTheme();
    };
  }, [id, depth, scope]);

  useEffect(() => {
    if (scope !== "global") {
      return;
    }

    const entry = entries.get(id);

    if (entry) {
      entry.theme = theme;
      applyTheme();
    }
  }, [id, theme, scope]);

  const content = (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeDepthContext.Provider value={depth}>
        {children}
      </ThemeDepthContext.Provider>
    </ThemeContext.Provider>
  );

  if (scope === "local") {
    return <div data-aui-theme={theme}>{content}</div>;
  }

  return content;
}
