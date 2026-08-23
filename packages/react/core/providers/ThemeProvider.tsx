import {
  useState,
  type PropsWithChildren
} from "react";

import {
  ThemeContext
} from "../contexts";

import type {
  Theme
} from "../contexts";

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light"
}: ThemeProviderProps) {

  const [
    theme,
    setTheme
  ] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      <div
        data-aui-theme={theme}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
