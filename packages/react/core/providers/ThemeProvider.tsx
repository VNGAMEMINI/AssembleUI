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

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-aui-theme", theme);

    return () => {
      root.removeAttribute("data-aui-theme");
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
