import { useEffect, useState, type PropsWithChildren } from "react";

import { ThemeContext } from "../contexts";
import type { Theme } from "../contexts";

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Capture the document's original theme once and restore it on unmount.
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-aui-theme");

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-aui-theme");
      } else {
        root.setAttribute("data-aui-theme", previousTheme);
      }
    };
  }, []);

  // Theme changes must not trigger restoration of the original attribute.
  useEffect(() => {
    document.documentElement.setAttribute("data-aui-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
